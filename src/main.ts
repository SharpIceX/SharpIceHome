import './styles/main.less';
import loadjs from 'loadjs';
import App from './app.vue';
import router from './router';
import { createApp } from 'vue';
import Clarity from '@microsoft/clarity';
import FontFaceObserver from 'fontfaceobserver';

// 异步加载 Clarity
Promise.resolve().then(() => {
	Clarity.init('p2oa48b662');
	Clarity.consent(false);
});

const app = createApp(App);
app.use(router);

Promise.all([
	// 等待字体加载
	new FontFaceObserver('LXGW WenKai').load('这是一个测试文本，Hi!', 2000).catch(() => {
		console.error('Font "LXGW WenKai" loading failed');
	}),

	// 等待图像加载
	loadjs(['/favicon.webp', '/background.webp'], {
		async: true,
		numRetries: 2,
		error: (depsNotFound: string[]) => {
			console.error('Failed to load images:', depsNotFound.join(', '));
		},
	}),
]).finally(() => {
	app.mount('#app');
});
