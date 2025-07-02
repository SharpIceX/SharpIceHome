import processorsJS from './js';
import processorsTS from './ts';
import processorCss from './css';
import processorLess from './less';
import { parse as parseSFC } from '@vue/compiler-sfc';
import { baseParse, NodeTypes } from '@vue/compiler-dom';
import { type FileProcessor, addCharsToSet } from '../scanFile';

const processor: FileProcessor = async (source, textCharts) => {
	const sfc = parseSFC(source);

	// Template 部分
	{
		const template = sfc.descriptor.template?.content;

		if (template) {
			const ast = baseParse(template);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			function extractText(node: any) {
				if (node.type === NodeTypes.TEXT) {
					// 文本节点
					addCharsToSet(node.content, textCharts);
				} else if (node.children) {
					// 递归处理子节点
					node.children.forEach((child: never) => extractText(child));
				}
			}

			// 处理模板中的文本内容
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			ast.children.forEach((node: any) => {
				if (node.type === NodeTypes.TEXT) {
					// 文本节点
					addCharsToSet(node.content, textCharts);
				} else if (node.children) {
					// 递归处理子节点
					extractText(node);
				}
			});
		}
	}

	// Script 部分
	{
		const script = sfc.descriptor.script;

		if (script?.content) {
			if (script.lang === undefined || script.lang === 'js') {
				// 处理 JavaScript
				processorsJS(script.content, textCharts);
			} else if (script.lang === 'ts') {
				// 处理 TypeScript
				await processorsTS(script.content, textCharts);
			} else {
				throw new Error(`Unsupported script language: ${script.lang}`);
			}
		}
	}

	// Style 部分
	{
		const styles = sfc.descriptor.styles;

		if (styles.length > 0) {
			for (const style of styles) {
				if (style.lang === undefined || style.lang === 'css') {
					// 处理 CSS
					await processorCss(style.content, textCharts);
				} else if (style.lang === 'less') {
					// 处理 LESS
					await processorLess(style.content, textCharts);
				} else {
					throw new Error(`Unsupported style language: ${style.lang}`);
				}
			}
		}
	}
};

export default processor;
