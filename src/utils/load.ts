/**
 * 等待图片资源加载完成（无需返回元素）
 * @param url 图片 URL
 * @param timeoutMs 超时时间，默认 1500ms
 * @returns Promise<void>
 */
export async function waitImage(url: string, timeoutMs = 2000): Promise<void> {
	return new Promise((resolve, reject) => {
		const img = new Image();

		// 防止多次调用回调
		let settled = false;

		// 完成处理
		const finish = () => {
			if (!settled) {
				settled = true;
				resolve();
			}
		};

		// 超时处理
		const timeoutId = setTimeout(() => {
			if (!settled) {
				settled = true;
				reject(new Error(`图片加载超时：${url}`));
			}
		}, timeoutMs);

		// 加载处理
		img.addEventListener('load', () => {
			clearTimeout(timeoutId);
			if (typeof img.decode === 'function') {
				img.decode()
					.catch(() => {
						/* 忽略解码失败 */
					})
					.finally(finish);
			} else {
				finish();
			}
		});

		// 错误处理
		img.addEventListener('error', () => {
			clearTimeout(timeoutId);
			if (!settled) {
				settled = true;
				reject(new Error(`图片加载失败：${url}`));
			}
		});

		// 图片源
		img.src = url;
	});
}
