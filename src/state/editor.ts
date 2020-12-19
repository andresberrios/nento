import { inject, InjectionKey, provide, reactive } from "vue";
import demo from "@/assets/demo";
import { ComponentDefinition, TemplateNode } from "@/lib/template";
import { setupMover } from "@/state/mover";
import { setupUtil } from "@/state/util";

export interface EditorState {
  selected: TemplateNode | null;
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
  const mover = setupMover(state, util);

  return {
    state,
    ...util,
    ...mover,
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
