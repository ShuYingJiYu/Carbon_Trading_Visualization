import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from './router'
import pinia from './stores'
import { lazyPlugin } from './directives'
const app = createApp(App);
app.use(lazyPlugin)
app.use(pinia) 
app.use(router)
app.mount("#app")