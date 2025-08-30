/**
 * 等待图片资源加载完成（无需返回元素）
 * @param url 图片 URL
 * @param timeoutMs 超时时间，默认 1500ms
 * @returns Promise<void>
 */
export async function waitImage(url: string, timeoutMs = 1500): Promise<void> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		let settled = false;
		const finish = () => {
			if (!settled) {
				settled = true;
				resolve();
			}
		};
		const timeoutId = setTimeout(finish, timeoutMs);

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
		img.addEventListener('error', () => {
			clearTimeout(timeoutId);
			if (!settled) {
				settled = true;
				reject(new Error(`图片加载失败：${url}`));
			}
		});
		img.src = url;
	});
}
