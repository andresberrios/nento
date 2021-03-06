import { inject, InjectionKey, provide, reactive } from "vue";
import demo from "@/assets/demo";
import { Binding, ComponentDefinition, TemplateNode } from "@/lib/template";
import { setupUtil } from "@/state/util";
import { setupMover as setupNodeManager } from "@/state/mover";
import { setupBindingManager } from "@/state/bindingManager";

export interface EditorState {
  selected: TemplateNode | Binding | null;
  highlighted: TemplateNode | null;
  treeViewFocused: boolean;
  component: ComponentDefinition;
}

export const setupEditor = () => {
  const state: EditorState = reactive({
    selected: null,
    highlighted: null,
    treeViewFocused: false,
    component: demo
  });

  const util = setupUtil(state);
  const nodeManager = setupNodeManager(state, util);
  const bindingManager = setupBindingManager(state);

  return {
    state,
    util,
    nodeManager,
    bindingManager,
    save() {
      window.localStorage.setItem("component", JSON.stringify(state.component));
    },
    load() {
      const rawData = window.localStorage.getItem("component");
      if (rawData) {
        state.component = JSON.parse(rawData);
      } else {
        state.component = { template: [], bindings: [] };
      }
      state.selected = null;
      state.highlighted = null;
    }
  };
};

export type Editor = ReturnType<typeof setupEditor>;
export const editorSymbol: InjectionKey<Editor> = Symbol("editor");

export function provideEditor() {
  const instance = setupEditor();
  provide(editorSymbol, instance);
  return instance;
}

export function injectEditor() {
  const instance = inject(editorSymbol);
  if (instance === undefined) {
    throw new Error("Missing provided Editor instance");
  }
  return instance;
}
