import './styles/main.less';
import loadjs from 'loadjs';
import { createApp } from 'vue';
import App from './vue/app.vue';
import FontFaceObserver from 'fontfaceobserver';

const app = createApp(App);

Promise.all([
	// 等待字体加载
	new FontFaceObserver('LXGW WenKai').load('这是一个测试文本，Hi!', 3000).catch(() => {
		console.error('Font "LXGW WenKai" loading failed');
	}),

	// 等待图像加载
	loadjs(['/favicon.webp', '/background.webp'], {
		async: true,
		numRetries: 3,
		error: (depsNotFound: string[]) => {
			console.error('Failed to load images:', depsNotFound.join(', '));
		},
	}),
]).finally(() => {
	app.mount('#app');
});
