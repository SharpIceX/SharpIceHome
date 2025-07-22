import './styles/main.less';
import router from './router';
import App from './app/app.vue';
import { createApp } from 'vue';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';
import { loadFont, loadImage } from './scripts/utils/load';

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
