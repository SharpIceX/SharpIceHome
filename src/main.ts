import './styles/main.less';
import App from './app.vue';
import router from './router';
import { createApp } from 'vue';
import Clarity from '@microsoft/clarity';
import 'overlayscrollbars/overlayscrollbars.css';
import { loadFont, loadImage } from './utils/load';
import { OverlayScrollbars } from 'overlayscrollbars';

// 滚动条样式
requestIdleCallback(() => {
	OverlayScrollbars(document.body, {
		scrollbars: {
			autoHideDelay: 400,
			autoHide: 'scroll',
			autoHideSuspend: true,
			theme: 'os-theme-nord',
		},
	});
});

// 页面加载完成后移除预加载样式
window.addEventListener('load', () => {
	requestIdleCallback(() => {
		const styles = document.querySelectorAll('head style[data-pre-fix]');
		styles.forEach(style => style.remove());
	});
});

// 初始化 Clarity
requestIdleCallback(() => {
	Clarity.init('p2oa48b662');
	Clarity.consent(false);
});

// 等待所有资源
Promise.all([
	loadFont('LXGW WenKai'), // 字体
	loadImage('/background.webp'), // 背景图片
	loadImage('/favicon.webp'), // 头像
])
	.catch(error => {
		console.error('资源加载出错：', error);
	})
	.finally(() => {
		const app = createApp(App);
		app.use(router);
		app.mount('#app');
	});
