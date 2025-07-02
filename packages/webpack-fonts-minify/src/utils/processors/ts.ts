import ts from 'typescript';
import { type FileProcessor, addCharsToSet } from '../scanFile';

const processor: FileProcessor = async (source, textCharts) => {
	const ast = ts.createSourceFile('temp.ts', source, ts.ScriptTarget.Latest, true);

	const walk = (node: ts.Node): void => {
		if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
			addCharsToSet(node.text, textCharts);
		}

		ts.forEachChild(node, walk);
	};

	walk(ast);
};

export default processor;
