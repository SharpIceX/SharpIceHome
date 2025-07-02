import postcss from 'postcss';
import lessParser from 'postcss-less';
import { type FileProcessor, addCharsToSet } from '../scanFile';

const processor: FileProcessor = async (source, textCharts) => {
	const result = await postcss().process(source, {
		from: undefined,
		syntax: lessParser,
	});

	// 遍历所有声明
	result.root.walkDecls('content', decl => {
		// 去除引号
		const contentValue = decl.value.replace(/['"]/g, '');
		addCharsToSet(contentValue, textCharts);
	});
};

export default processor;
