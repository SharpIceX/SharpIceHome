import { parse } from 'acorn';
import * as walk from 'acorn-walk';
import { type FileProcessor, addCharsToSet } from '../scanFile';

const processor: FileProcessor = async (source, textCharts) => {
	const ast = parse(source, {
		ecmaVersion: 'latest',
		sourceType: 'module',
	});

	walk.simple(ast, {
		Literal(node) {
			// 处理字符串字面量
			if (typeof node.value === 'string') {
				addCharsToSet(node.value, textCharts);
			}
		},
		TemplateLiteral(node) {
			if (node.expressions.length === 0) {
				// 无插值，直接提取
				const value = node.quasis.map(q => q.value.cooked).join('');
				addCharsToSet(value, textCharts);
			}
		},
	});
};

export default processor;
