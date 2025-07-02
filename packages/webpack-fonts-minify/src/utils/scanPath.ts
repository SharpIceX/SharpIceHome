import { glob } from 'glob';
import path from 'node:path';
import webpack from 'webpack';

const scanExtWhitelist = [
	'html', // 普通 HTML 文件
	'js', // JavaScript 文件
	'ts', // TypeScript 文件
	'css', // CSS 文件
	'less', // Less 文件
	'vue', // Vue 文件
];

export default async (scanPaths: string[] | string, logger: webpack.Compilation['logger']): Promise<string[]> => {
	const paths = new Set<string>();

	if (Array.isArray(scanPaths)) {
		// 如果是数组，遍历每个路径进行扫描
		const allFiles = await Promise.all(
			scanPaths.map(scanPath => glob('**/*', { cwd: scanPath, nodir: true, absolute: true })),
		);
		allFiles.flat().forEach(file => paths.add(file));
	} else if (typeof scanPaths === 'string') {
		// 如果是单个路径，直接扫描该路径
		const files = await glob('**/*', { nodir: true, cwd: scanPaths, absolute: true });
		files.forEach(file => paths.add(file));
	} else {
		logger.error('Invalid scanPaths type. Expected string or string array.');
		return [];
	}

	// 过滤不在白名单中的文件扩展名
	for (const file of paths) {
		const ext = path.extname(file).slice(1).toLowerCase();
		if (!scanExtWhitelist.includes(ext)) {
			paths.delete(file);
		}
	}

	return Array.from(paths);
};
