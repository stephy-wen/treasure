import { createApp } from "vue";
import { createPinia } from "pinia"; // 引入 Pinia
import "normalize.css";
import router from "./router";
import i18n from "./i18n/i18n";
import App from "./App.vue";

// 引入Element
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 引入 Bootstrap 的 CSS
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
window.bootstrap = bootstrap;
import "./style.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import {
  faPowerOff,
  faCircleUser,
  faCrosshairs,
  faRocket,
  faChartSimple,
  faCircleInfo,
  faCircleQuestion,
  faMagnifyingGlass,
  faXmark,
  faArrowLeft,
  faAngleDown,
  faCog,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPowerOff,
  faCircleUser,
  faCrosshairs,
  faRocket,
  faChartSimple,
  faCircleInfo,
  faCircleQuestion,
  faMagnifyingGlass,
  faXmark,
  faArrowLeft,
  faAngleDown,
  faCog,
  faCopy
);
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pinia = createPinia();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(ElementPlus)
  .mount("#app");
