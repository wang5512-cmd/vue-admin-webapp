import Vue from 'vue'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from './App.vue'
import router from './router'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
