import { App } from "vue";
import NButton from "./NButton.vue";

export function loadComponents(app: App) {
  app.component("n-button", NButton);
}
