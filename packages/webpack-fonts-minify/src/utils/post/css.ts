import postcss from 'postcss';
import csstree from 'css-tree';
import path from 'node:path/posix'; // NOTE: 必须使用 posix 路径来处理 URL，否者会出现不可预料的问题

const plugin: postcss.Plugin = {
	postcssPlugin: 'postcss-remove-font-format',

	AtRule(atRule) {
		if (atRule.name !== 'font-face') return;

		// 调用 CSS Tree 解析器来处理 @font-face 规则
		atRule.walkDecls('src', decl => {
			const ast = csstree.parse(decl.value, {
				context: 'value',
				parseValue: true,
			}) as csstree.Value;

			ast.children.forEach((node: csstree.CssNode) => {
				if (node.type === 'Url') {
					// 处理 URL 节点
					if (node.value) {
						const dir = path.dirname(node.value); // 获取目录部分
						const base = path.basename(node.value, '.ttf'); // 获取文件名部分（不带扩展名）
						node.value = path.join(dir, base + '.woff2'); // 替换为 woff2 格式
					}
				} else if (node.type === 'Function' && node.name === 'format') {
					// 处理 format 函数
					node.children.forEach((child: csstree.CssNode) => {
						if (child.type === 'String') {
							// 替换 format 函数中的字符串
							child.value = 'woff2';
						}
					});
				}
			});

			// 把 AST 转回字符串
			decl.value = csstree.generate(ast);
		});
	},
};

export default async (css: string): Promise<string> => {
	const result = await postcss([plugin]).process(css, {
		from: undefined,
	});

	return result.css;
};
