import subsetFont from 'subset-font';

/**
 * 对字体文件进行子集提取，只保留指定字符，输出 woff2 格式
 * @param source 原始字体文件 Buffer
 * @param characters 需要保留的字符集合字符串
 * @returns 子集字体 Buffer
 */
export default async (source: Buffer, characters: string): Promise<Buffer> => {
	try {
		const subsetBuffer: Buffer = await subsetFont(source, characters, {
			targetFormat: 'woff2',
		});
		return subsetBuffer;
	} catch (err) {
		if (err instanceof Error) {
			err.message = `subset-font failed: ${err.message}`;
			throw err;
		}
		throw new Error(`subset-font failed: ${String(err)}`);
	}
};
