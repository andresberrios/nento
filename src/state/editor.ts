import { computed, inject, InjectionKey, provide, reactive } from "vue";
import demo from "@/assets/demo";
import { ComponentDefinition, TemplateNode, walk } from "@/lib/template";
import { setupMover } from "@/lib/nodeMover";

export interface EditorState {
  selected: TemplateNode | null;
  hovered: TemplateNode | null;
  treeViewFocused: boolean;
  component: ComponentDefinition;
}

export function setupUtil(state: EditorState) {
  const nodes = computed(() => {
    const list: Array<{ node: TemplateNode; parent?: TemplateNode }> = [];
    walk(state.component, (node, parent) => {
      list.push({
        node,
        parent
      });
    });
    return list;
  });

  function findNodeEntry(node: TemplateNode) {
    return nodes.value.find(e => e.node === node);
  }

  function findNodeParent(node: TemplateNode) {
    return findNodeEntry(node)?.parent;
  }

  function findNodeSiblings(node: TemplateNode) {
    const parent = findNodeParent(node);
    return parent !== undefined &&
      "children" in parent &&
      parent.children !== undefined
      ? parent.children
      : state.component.template;
  }

  const selectedParent = computed(() => {
    const entry = state.selected && findNodeEntry(state.selected);
    return entry?.parent;
  });

  function selectNode(node: TemplateNode) {
    state.selected = node;
  }

  function selectPreviousNode() {
    if (state.selected) {
      const index = nodes.value.findIndex(e => e.node === state.selected);
      if (index > 0) {
        state.selected = nodes.value[index - 1].node;
      }
    }
  }

  function selectNextNode() {
    if (state.selected) {
      const index = nodes.value.findIndex(e => e.node === state.selected);
      if (index < nodes.value.length - 1) {
        state.selected = nodes.value[index + 1].node;
      }
    }
  }

  function hoverNode(node: TemplateNode) {
    state.hovered = node;
  }

  function findBinding(id: string) {
    return state.component.bindings.find(b => b.id === id);
  }

  return {
    nodes,
    findNodeEntry,
    findNodeParent,
    findNodeSiblings,
    selectedParent,
    selectNode,
    selectPreviousNode,
    selectNextNode,
    hoverNode,
    findBinding
  };
}

export const createEditor = () => {
  const state: EditorState = reactive({
    selected: null,
    hovered: null,
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
      state.hovered = null;
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
