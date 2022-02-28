import "core-js/stable";
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import api from "./interceptors/axiosConfig--Notification.js";
import VueAxios from "vue-axios";
import router from "./router.js";
import printConsole from "./printConsole/printConsole.js"; // 避免 console 出來的資料被後續資料影響，所以直接把它顯示出來。

// Vuex
import store from "./store";

Vue.use(Vuex);
Vue.use(VueAxios, api);

// bootstrap-----------------------------------------------------------------------
import "./jquery-global.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// 自己的 CSS ---------------------------------------------------------------------
import "@/assets/Scss/BackEndLayout/BackEndLayout.scss";

// fontawesome---------------------------------------------------------------------
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js"; // 有進去裡面把 _default 物件的 autoReplaceSvg  屬性改為 false。

// vue-select 多選--------------------------------------------------------------------
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("VSelect", vSelect);

// Vee-Validate3--------------------------------------------------------------------
import {
  ValidationProvider as VP,
  extend,
  ValidationObserver as VO,
  localize,
} from "vee-validate";
import {
  required,
  integer,
  min_value,
  max_value,
  email,
  required_if,
  oneOf,
} from "vee-validate/dist/rules";
import TW from "vee-validate/dist/locale/zh_TW.json";

localize("zh_TW", TW);
extend("required", required);
extend("integer", integer);
extend("min_value", min_value);
extend("max_value", max_value);
extend("email", email);
extend("required_if", required_if);
extend("oneOf", oneOf);

Vue.component("VP", VP);
Vue.component("VO", VO);

// 日期選擇器-----------------------------------------------------------------------
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-tw";
Vue.component("DatePicker", DatePicker);

// Loading-----------------------------------------------------------------------
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);

// element ui-------------------------------------------------------------------
import {
  Pagination,
  Notification,
  Message,
  Table,
  TableColumn,
  Form,
  FormItem,
  Icon,
  Button,
} from "element-ui";
import lang from "element-ui/lib/locale/lang/zh-TW";
import "element-ui/lib/theme-chalk/index.css";
import ElementUI_locale from "element-ui/lib/locale";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Pagination);

ElementUI_locale.use(lang);
Vue.prototype.$notify = Notification; // 全預註冊這個元件，可避免重複 import 常用元件
Vue.prototype.$message = Message;

// vue-fragment-------------------------------------------------------------------
import { Plugin } from "vue-fragment";
Vue.use(Plugin); // 產生透明標籤

// ---------------------------------------------------------------------------------

new Vue({
  router,
  store,
  printConsole,
  VP,
  render: (h) => h(App),
}).$mount("#app");
