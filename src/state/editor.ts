import { inject, InjectionKey, provide, reactive } from "vue";
import demo from "@/assets/demo";
import { ComponentDefinition, TemplateNode } from "@/lib/template";

export const createEditor = () => {
  const state: {
    selected: TemplateNode | null;
    root: ComponentDefinition;
  } = reactive({
    selected: null,
    root: demo
  });

  return {
    state, // Consider making readonly
    selectNode(node: TemplateNode) {
      state.selected = node;
    },
    save() {
      window.localStorage.setItem("component", JSON.stringify(state.root));
    },
    load() {
      const rawData = window.localStorage.getItem("component");
      if (rawData) {
        state.root = JSON.parse(rawData);
      } else {
        state.root = { template: [], bindings: [] };
      }
    }
  };
};

export type Editor = ReturnType<typeof createEditor>;

export const editorSymbol: InjectionKey<Editor> = Symbol("editor");

export function provideEditor() {
  const instance = createEditor();
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
