import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import { lazyPlugin } from "./directives";
import "element-plus/theme-chalk/src/index.scss";
import "echarts";

const app = createApp(App);
app.use(lazyPlugin);
app.use(pinia);
app.use(router);
app.mount("#app");
