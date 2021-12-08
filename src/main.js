import Vue from "vue";
import VueRouter from "vue-router";
import BaseWidget from "./components/BaseWidget.vue";
import App from "./App.vue";
import "./plugins/axios";

/**
 * Bootstrap area
 */
import { BootstrapVue, IconsPlugin, TabsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(TabsPlugin);
/*Bootstrap end*/

// alerts
global.swal = require('sweetalert2');

/**
 * Styles
 */

import "./assets/sass/app.scss";

/**
 * Mixin
 */

import helper from "./mixins/helperMixin";
Vue.mixin(helper);

/**
 * Router
 */
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: BaseWidget,
    props: true,
  },
];

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
