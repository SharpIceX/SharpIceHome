import csstree from 'css-tree';
import { type FileProcessor, addCharsToSet } from '../scanFile';

const processor: FileProcessor = async (source, textChars) => {
	const ast = csstree.parse(source);

	csstree.walk(ast, {
		visit: 'Declaration',
		enter(node: csstree.Declaration) {
			// 检查是否为 content 属性，确保 value 是字符串
			if (node.property === 'content' && node.value.type === 'Value') {
				const first = node.value.children.first;
				// 确保 first 是字符串类型
				if (first && first.type === 'String') {
					addCharsToSet(first.value, textChars);
				}
			}
		},
	});
};

export default processor;
