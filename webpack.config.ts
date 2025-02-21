import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { VueLoaderPlugin } from 'vue-loader';
import localPostcssOptions from './postcss.config';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { WebpackConfiguration } from 'webpack-dev-server';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';
import type svgToVueLoaderOptions from 'svg-to-vue-loader/options';
import { EsbuildPlugin, type LoaderOptions } from 'esbuild-loader';

export default (env: Record<string, unknown>) => {
	const isDevelopmentMode = env.WEBPACK_SERVE?.toString() === 'true';

	const esbuildOption: LoaderOptions = {
		format: 'esm',
		charset: 'utf8',
		target: 'ES2020',
		logLevel: 'info', // 设置了这个才有日志输出
		platform: 'browser',
		treeShaking: true,
		legalComments: 'eof', // 法律文本注释写入文件末尾
	};

	return {
		entry: path.resolve('./src/main.ts'),
		output: {
			clean: true,
			path: path.resolve('./dist'),
			filename: 'js/[name].js',
			library: {
				type: 'umd2',
			},
		},
		cache: {
			type: 'filesystem',
		},
		devServer: {
			hot: true,
			port: 8600,
			open: false,
			host: '127.0.0.1',
			historyApiFallback: true,
			static: [path.resolve('./public')],
			client: {
				overlay: false,
			},
		},
		resolve: {
			extensions: ['.ts', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: {
									filter: (url: string): boolean => {
										if (url.startsWith('/')) {
											return false;
										}

										return true;
									},
								},
								importLoaders: 1,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
					],
				},
				{
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: {
									filter: (url: string): boolean => {
										if (url.startsWith('/')) {
											return false;
										}

										return true;
									},
								},
								importLoaders: 2,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
						'less-loader',
					],
				},
				{
					test: /\.ts$/,
					loader: 'esbuild-loader',
					exclude: /node_modules/,
					options: {
						loader: 'ts',
						...esbuildOption,
					},
				},
				{
					test: /\.js$/,
					loader: 'esbuild-loader',
					exclude: /node_modules/,
					options: {
						loader: 'js',
						...esbuildOption,
					},
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
				},
				{
					test: /\.svg$/,
					use: [
						'vue-loader',
						{
							loader: 'svg-to-vue-loader',
							options: {
								defaultSize: 20,
								enableSvgo: true,
								removeAllFill: true,
								useFillCurrentColor: true,
								svgoConfig: {
									multipass: true,
								},
							} satisfies svgToVueLoaderOptions,
						},
					],
				},
				{
					test: /\.webp$/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/images/[contenthash][ext]',
					},
				},
			],
		},
		plugins: [
			new VueLoaderPlugin(),
			new WebpackBar({
				color: '#72C9FF',
				name: 'SharpIce Home',
				profile: isDevelopmentMode ? false : true,
			}),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('./public'),
						to: path.resolve('./dist'),
					},
				],
			}),
			new HtmlWebpackPlugin({
				scriptLoading: 'module',
				template: path.resolve('./template/index.html'),
			}),
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
			env.analyze ? new BundleAnalyzerPlugin() : undefined,
		],
		optimization: {
			usedExports: true,
			sideEffects: true,
			avoidEntryIife: true,
			providedExports: true,
			removeEmptyChunks: true,
			flagIncludedChunks: true,
			removeAvailableModules: true,
			minimize: isDevelopmentMode ? false : true,
			minimizer: [
				new EsbuildPlugin({
					...esbuildOption,
					minify: true,
					minifySyntax: true,
					minifyWhitespace: true,
					minifyIdentifiers: true,
					drop: ['console', 'debugger'],
				}),
				new HtmlMinimizerPlugin({
					minimizerOptions: {
						caseSensitive: false,
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						minifyCSS: true,
						minifyJS: true,
						removeComments: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
					},
				}),

				new CssMinimizerPlugin({
					minimizerOptions: {
						preset: [
							'default',
							{
								discardDuplicates: true,
								mergeRules: true,
								mergeMedia: true,
								level: {
									1: {
										specialComments: 'none',
									},
									2: {
										removeUnused: true,
									},
								},
							},
						],
					},
				}),
			],
			splitChunks: {
				chunks: 'all',
				minSize: 10000,
				maxSize: 250000,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all',
					},
					common: {
						name: 'common',
						minChunks: 2,
						chunks: 'all',
						priority: 10,
					},
				},
			},
		},
		stats: isDevelopmentMode ? 'minimal' : 'normal',
		devtool: isDevelopmentMode ? 'eval-cheap-module-source-map' : false,
	} satisfies WebpackConfiguration;
};
