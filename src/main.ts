import './styles/main.less';
import App from './app.vue';
import router from './router';
import { createApp } from 'vue';
import Clarity from '@microsoft/clarity';
import FontFaceObserver from 'fontfaceobserver';

const loadImage = (src: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.src = src;
		img.onload = () => resolve();
		img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
	});
};

// 加载 Clarity
queueMicrotask(() => {
	Clarity.init('p2oa48b662');
	Clarity.consent(false);
});

const app = createApp(App);
app.use(router);

Promise.all([
	// 等待字体加载
	new FontFaceObserver('LXGW WenKai').load('你好Hi!', 1000).catch(err => {
		console.error('Font "LXGW WenKai" loading failed:', err);
	}),

	// 等待图像加载
	Promise.all([loadImage('/favicon.webp'), loadImage('/background.webp')]).catch(failedSrc => {
		console.error('Failed to load images:', failedSrc);
	}),
]).finally(() => {
	app.mount('#app');
});
