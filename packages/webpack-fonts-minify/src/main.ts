import path from 'node:path';
import webpack from 'webpack';
import scanPath from './utils/scanPath';
import scanFiles from './utils/scanFile';
import processFont from './utils/processFont';
import postProcessCSS from './utils/post/css';

/**
 * TODO: 目前存在这些问题没修复
 * TODO: 1. 无脑的直接从 css 里面将 ttf 替换成 woff2，会导致将非本地字体都替换了，需要做一些限制。
 */

interface MinimizerPluginOptions {
	scanPaths: string[] | string;
}

export default class MinimizerPlugin implements webpack.WebpackPluginInstance {
	options: MinimizerPluginOptions;
	private text!: string;

	constructor(options: MinimizerPluginOptions) {
		this.options = options;
	}

	apply(compiler: webpack.Compiler) {
		// 字体扫描
		compiler.hooks.beforeRun.tapPromise('@sharpice_home/webpack-fonts-minify:scan_path', async compiler => {
			const logger = compiler.getInfrastructureLogger('@sharpice_home/webpack-fonts-minify:scan_path');

			const filesToScan = await scanPath(this.options.scanPaths, logger); // 获取需要扫描的文件路径

			if (filesToScan.length === 0) {
				logger.warn('No files found to scan.');
			} else {
				this.text = await scanFiles(filesToScan, logger); // 扫描文件内容
			}
		});

		// 字体处理
		compiler.hooks.thisCompilation.tap('@sharpice_home/webpack-fonts-minify:process_fonts', compilation => {
			compilation.hooks.processAssets.tapPromise(
				{
					name: '@sharpice_home/webpack-fonts-minify',
					stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
				},
				async assets => {
					const logger = compiler.getInfrastructureLogger(
						'@sharpice_home/webpack-fonts-minify:process_fonts',
					);

					const fontFiles = Object.keys(assets).filter(file => file.endsWith('.ttf'));

					// 如果没有找到字体文件，直接返回
					if (fontFiles.length === 0) {
						logger.warn('No font files found to process.');
						return;
					}

					// 处理字体文件
					for (const file of fontFiles) {
						const asset = compilation.getAsset(file);

						if (!asset) {
							logger.warn(`Asset ${file} not found in compilation.`);
							continue;
						}

						// 获取源内容
						const source = asset.source.source() as Buffer;

						// 开始处理字体文件
						try {
							const output = await processFont(source, this.text);

							// 添加到编译结果中
							const outputFileName = path.join(
								path.dirname(file),
								`${path.basename(file, path.extname(file))}.woff2`,
							);
							compilation.emitAsset(outputFileName, new webpack.sources.RawSource(output));

							// 删除原始的 TTF 文件
							if (outputFileName !== file) {
								compilation.deleteAsset(file);
								logger.info(`Processed and replaced ${file} with ${outputFileName}`);
							}

							// 后处理 css
							Object.keys(assets)
								.filter(assetFile => assetFile.endsWith('.css'))
								.forEach(async assetFile => {
									const cssSource = compilation.getAsset(assetFile)?.source.source().toString();

									if (!cssSource) return; // 如果没有 CSS 内容，直接跳过

									if (cssSource.includes(file)) {
										const replaced = await postProcessCSS(cssSource);
										compilation.updateAsset(assetFile, new webpack.sources.RawSource(replaced));
									}
								});
						} catch (error: unknown) {
							logger.error(
								`Error processing font file ${file}: ${error instanceof Error ? error.message : String(error)}`,
							);
						}
					}
				},
			);
		});
	}
}
