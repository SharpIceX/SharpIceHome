import '../less/main.less';
import { createApp } from 'vue';
import App from '../vue/app.vue';
import '@fontsource/lxgw-wenkai';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';

OverlayScrollbars(document.body, {
	scrollbars: {
		theme: 'os-theme-light',
		autoHide: 'scroll',
		autoHideDelay: 250,
	},
});

const app = createApp(App);
app.mount('#app');
