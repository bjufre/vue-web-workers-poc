import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import User from "./components/User.vue";

Vue.config.productionTip = false;

Vue.component("User", User);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
