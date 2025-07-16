export async function loadImage(url: string, timeoutMs = 1500): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const timeoutId = setTimeout(() => {
			// 加载超时也不报错，直接返回成功
			resolve(img);
		}, timeoutMs);

		img.onload = () => {
			clearTimeout(timeoutId);
			img.decode?.().finally(() => resolve(img));
		};

		img.onerror = () => {
			clearTimeout(timeoutId);
			reject(new Error(`图片加载失败：${url}`));
		};

		img.src = url;
	});
}

export async function loadFont(fontName: string, timeoutMs = 1500): Promise<void> {
	if (!document.fonts?.load) {
		// 浏览器不支持 FontFace API，直接认为加载成功
		return;
	}

	// 字体加载 Promise
	const fontLoadPromise = document.fonts.load(`1em ${fontName}`).then(loadedFonts => {
		if (loadedFonts.length === 0) {
			return Promise.reject(new Error(`字体加载失败：${fontName}`));
		}
	});

	// 超时 Promise
	const timeoutPromise = new Promise<void>((_, reject) => {
		setTimeout(() => {
			reject(new Error(`字体加载超时：${fontName}`));
		}, timeoutMs);
	});

	// 返回先完成的 Promise（加载完成或超时）
	return Promise.race([fontLoadPromise, timeoutPromise]);
}
