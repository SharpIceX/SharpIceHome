import './styles/main.less';
import App from './app.vue';
import router from './router';
import { createApp } from 'vue';
import Clarity from '@microsoft/clarity';

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

const app = createApp(App);
app.use(router);
app.mount('#app');
