import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadComponents } from "./components/common";

import "./assets/main.css";

const app = createApp(App);
loadComponents(app);

app
  .use(store)
  .use(router)
  .mount("#app");
