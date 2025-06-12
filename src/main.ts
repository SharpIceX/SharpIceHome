import './styles/main.less';
import App from './app.vue';
import router from './router';
import { createApp } from 'vue';
import Clarity from '@microsoft/clarity';

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

Promise.all([loadImage('/favicon.webp'), loadImage('/background.webp')])
	.catch(failedSrc => {
		console.error('Failed to load images:', failedSrc);
	})
	.finally(() => {
		app.mount('#app');
	});
