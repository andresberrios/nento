import { TemplateNode } from "../lib/template";
import { EditorState } from "./editor";
import { setupUtil } from "./util";

export function setupMover(
  state: EditorState,
  util: ReturnType<typeof setupUtil>
) {
  function canMoveUp(node: TemplateNode) {
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    return index > 0;
  }

  function moveUp(node: TemplateNode) {
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    if (index > 0) {
      const previous = siblings[index - 1];
      siblings.splice(index - 1, 2, node, previous);
    }
  }

  function canMoveDown(node: TemplateNode) {
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    return index !== -1 && index < siblings.length - 1;
  }

  function moveDown(node: TemplateNode) {
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    if (index !== -1 && index < siblings.length - 1) {
      const next = siblings[index + 1];
      siblings.splice(index, 2, next, node);
    }
  }

  function canMoveOut(node: TemplateNode) {
    const parent = util.findNodeParent(node);
    return parent !== undefined;
  }

  function moveOut(node: TemplateNode) {
    const parent = util.findNodeParent(node);
    if (
      parent !== undefined &&
      "children" in parent &&
      parent.children !== undefined
    ) {
      parent.children = parent.children.filter(child => child !== node);
      const parentSiblings = util.findNodeSiblings(parent);
      const parentIndex = parentSiblings.indexOf(parent);
      parentSiblings.splice(parentIndex + 1, 0, node);
    }
  }

  function canMoveIn(node: TemplateNode) {
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    const previous = siblings[index - 1];
    // TODO Check if the element tag supports having this node as child
    return previous !== undefined && previous.type === "element";
  }

  function moveIn(node: TemplateNode) {
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    const previous = siblings[index - 1];
    // TODO Check if the element tag supports having this node as child
    if (previous !== undefined && previous.type === "element") {
      siblings.splice(index, 1);
      if (previous.children === undefined) {
        previous.children = [node];
      } else {
        previous.children.push(node);
      }
    }
  }

  function deleteNode(node: TemplateNode) {
    const parent = util.findNodeParent(node);
    const siblings = util.findNodeSiblings(node);
    const index = siblings.indexOf(node);
    siblings.splice(index, 1);
    state.selected = siblings[index] ?? siblings[index - 1] ?? parent ?? null;
  }

  function generateNewNode(type: "element" | "text") {
    const node: TemplateNode | null =
      type === "element"
        ? { type: "element", tag: "div" }
        : type === "text"
        ? { type: "text", content: "New text node" }
        : null;
    if (node === null) {
      throw new TypeError("Invalid node type");
    }
    return node;
  }

  function insertNode(node: TemplateNode, position = 0, parent?: TemplateNode) {
    if (!parent && state.selected && "type" in state.selected) {
      parent = state.selected;
    }
    if (!parent) {
      state.component.template.splice(position, 0, node);
    } else if (parent.type === "element") {
      parent.children = parent.children || [];
      parent.children.splice(position, 0, node);
    } else {
      while (parent && parent.type !== "element") {
        parent = util.findNodeParent(parent);
      }
      if (!parent) {
        state.component.template.splice(position, 0, node);
      } else {
        parent.children = parent.children || [];
        parent.children.splice(position, 0, node);
      }
    }
    state.selected = node;
  }

  function insertNewNode(type: "element" | "text") {
    const node = generateNewNode(type);
    insertNode(node);
  }

  return {
    moveDown,
    moveUp,
    moveOut,
    moveIn,
    canMoveDown,
    canMoveUp,
    canMoveOut,
    canMoveIn,
    deleteNode,
    insertNewNode
  };
}
