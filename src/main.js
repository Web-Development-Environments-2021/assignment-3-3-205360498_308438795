import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TablePlugin,
  FormCheckboxPlugin,
  IconsPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TablePlugin,
  FormCheckboxPlugin,
  IconsPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  // username: localStorage.username,
  username: "",
  isAssociationMember: false,
  userPastSearches: [],
  login(username,isAssociationMember,) {
    localStorage.setItem("username", username);
    localStorage.setItem("isAssociationMember", isAssociationMember);
    localStorage.setItem("userPastSearches", []);
    this.isAssociationMember = isAssociationMember;
    this.username = username;
    this.userPastSearches = [];
    console.log("login", this.username);
  },
  async logout() {
    try {
      const resOfLogout = await axios.post(
        "http://localhost:3000/Logout",
        {
        }
      );
      console.log("logout");
      localStorage.removeItem("username");
      localStorage.removeItem("isAssociationMember");
      localStorage.removeItem("userPastSearches");
      this.username = undefined;
      this.isAssociationMember = false;
      this.userPastSearches = [];
    } catch (err) {
      console.log(err);
    }
  }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
