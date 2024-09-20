import {createApp} from 'vue';
import './style.css';
import App from './App.vue';
import {router} from "./router";
import {createPinia} from "pinia";
import 'animate.css';
import Toast, {PluginOptions} from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions: PluginOptions = {
  timeout: 2000,
  closeButton: false
};
const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router).use(Toast, toastOptions);
app.directive('focus', {
  mounted: (el) => el.focus()
});
app.mount('#app');
