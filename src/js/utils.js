export const waitForFont = (font, timeout = 3000) => {
	return new Promise((resolve, reject) => {
		const start = Date.now();

		// 插入测试元素
		const testElement = document.createElement('div');
		testElement.style.cssText = `
			font-family: ${font};
			position: absolute;
			visibility: hidden;
			font-size: 1px;
			line-height: 1;
		`;
		testElement.textContent = 'a';
		document.body.appendChild(testElement);

		const checkFont = () => {
			if (document.fonts.check(`1em ${font}`)) {
				document.body.removeChild(testElement);
				resolve(true);
			} else if (Date.now() - start > timeout) {
				document.body.removeChild(testElement);
				reject(new Error(`字体 "${font}" 在 ${timeout}ms 内未加载完成`));
			} else {
				requestAnimationFrame(checkFont);
			}
		};

		checkFont();
	});
};
