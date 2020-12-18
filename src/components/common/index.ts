import { App } from "vue";
import NButton from "./NButton.vue";
import NInputSave from "./NInputSave.vue";

export function loadComponents(app: App) {
  app.component("n-button", NButton);
  app.component("n-input-save", NInputSave);
}
