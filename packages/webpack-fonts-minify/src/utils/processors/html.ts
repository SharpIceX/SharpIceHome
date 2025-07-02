import { JSDOM } from 'jsdom';
import { type FileProcessor, addCharsToSet } from '../scanFile';

const processor: FileProcessor = async (source, textCharts) => {
	const dom = new JSDOM(source);
	const document = dom.window.document;

	// 删除所有 style 和 script 标签
	document.querySelectorAll('style, script').forEach(el => el.remove());

	if (document.body?.textContent) {
		addCharsToSet(document.body.textContent, textCharts);
	}
};

export default processor;
