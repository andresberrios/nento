import { computed } from "vue";
import { TemplateNode, walk } from "@/lib/template";
import { EditorState } from "./editor";

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
    if (state.selected !== null && "type" in state.selected) {
      const entry = findNodeEntry(state.selected);
      return entry?.parent;
    }
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

  function highlightNode(node: TemplateNode) {
    state.highlighted = node;
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
    highlightNode,
    findBinding
  };
}
