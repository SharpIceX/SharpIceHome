import "../less/main.less";
import { createApp } from "vue";
import App from "../vue/app.vue";
import "@fontsource/noto-serif-sc";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faNewspaper, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
	faGithub,
	faBilibili,
	faZhihu,
} from "@fortawesome/free-brands-svg-icons";

library.add(faNewspaper, faEnvelope, faGithub, faBilibili, faZhihu);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon); // Font awesome图标库
app.mount("#app");
