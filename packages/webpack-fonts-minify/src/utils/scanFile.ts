import path from 'node:path';
import webpack from 'webpack';
import fs from 'node:fs/promises';
import processorsJS from './processors/js';
import processorsTS from './processors/ts';
import processorsCss from './processors/css';
import processorsVue from './processors/vue';
import processorsHtml from './processors/html';
import processorsLess from './processors/less';

export type FileProcessor = (source: string, textCharts: Set<string>) => Promise<void>;

/**
 * 将文本中的字符添加到 Set 中
 * @param text 要添加的文本
 * @param set 要添加字符的 Set
 */
export const addCharsToSet = (text: string, set: Set<string>): void => {
	if (!text) return;
	const chars = [...text.trim()];
	for (const ch of chars) {
		set.add(ch);
	}
};

// 文件类型处理器
const processors: Record<string, FileProcessor> = {
	html: processorsHtml,
	vue: processorsVue,
	css: processorsCss,
	less: processorsLess,
	js: processorsJS,
	ts: processorsTS,
};

export default async (filesPath: string[], logger: webpack.Compilation['logger']): Promise<string> => {
	const textCharts: Set<string> = new Set<string>();

	await Promise.all(
		filesPath.map(async filePath => {
			const ext = path.extname(filePath).slice(1).toLowerCase();
			const processor = processors[ext];

			if (!processor) {
				logger.warn(`No processor found for file type: ${ext}`);
				return;
			}

			try {
				const source = await fs.readFile(filePath, 'utf-8');
				await processor(source, textCharts);
			} catch (error) {
				logger.error(
					`Error processing file ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
		}),
	);

	return Array.from(textCharts).join('');
};
