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

// 初始化 Clarity
requestIdleCallback(() => {
	Clarity.init('p2oa48b662');
	Clarity.consent(false);
});

const app = createApp(App);
app.use(router);

// 并行加载图片和挂载应用
Promise.allSettled([loadImage('/favicon.webp'), loadImage('/background.webp')]).finally(() => {
	app.mount('#app');
});

// 页面加载完成后移除预加载样式
window.addEventListener('load', () => {
	requestIdleCallback(() => {
		const styles = document.querySelectorAll('head style[data-pre-fix]');
		styles.forEach(style => style.remove());
	});
});
