import { computed, inject, InjectionKey, provide, reactive } from "vue";
import demo from "@/assets/demo";
import { ComponentDefinition, TemplateNode, walk } from "@/lib/template";

export const createEditor = () => {
  const state: {
    selected: TemplateNode | null;
    hovered: TemplateNode | null;
    root: ComponentDefinition;
  } = reactive({
    selected: null,
    hovered: null,
    root: demo
  });

  const nodes = computed(() => {
    const list: Array<{ node: TemplateNode; parent?: TemplateNode }> = [];
    walk(state.root, (node, parent) => {
      list.push({
        node,
        parent
      });
    });
    return list;
  });

  return {
    state, // Consider making readonly,
    nodes,
    selectedParent: computed(() => {
      const entry = nodes.value.find(e => e.node === state.selected);
      return entry?.parent;
    }),
    selectNode(node: TemplateNode) {
      state.selected = node;
    },
    hoverNode(node: TemplateNode) {
      state.hovered = node;
    },
    findBinding(id: string) {
      return state.root.bindings.find(b => b.id === id);
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
