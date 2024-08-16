import { createApp } from "vue";
import "normalize.css";
import "./style.css";
import router from "./router";
import i18n from "./i18n/i18n";
import App from "./App.vue";

// 引入 Bootstrap 的 CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faPowerOff, faCircleUser, faCrosshairs, faRocket, faChartSimple, faCircleInfo, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
library.add(faPowerOff, faCircleUser, faCrosshairs, faRocket, faChartSimple, faCircleInfo, faCircleQuestion)
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(i18n).mount("#app");
