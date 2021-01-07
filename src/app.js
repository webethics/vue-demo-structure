import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import { store } from './_store';
import { router } from './_helpers';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './../../public/css/custom.css';
import Notifications from 'vue-notification';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCharts from 'vue-chartjs'
import VueNumberInput from '@chenfengyuan/vue-number-input';
import { DropDownButtonPlugin } from "@syncfusion/ej2-vue-splitbuttons";
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
Vue.use(DropDownButtonPlugin);
Vue.use(VueNumberInput);

require('./bootstrap')

window.Vue = Vue
Vue.use(VeeValidate);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Notifications);
Vue.use(VueCharts);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
