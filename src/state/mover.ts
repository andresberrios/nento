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

  function insertNode(
    nodeOrType: TemplateNode | "element" | "text",
    parent: TemplateNode | null = state.selected
  ) {
    const node =
      typeof nodeOrType !== "string" && "type" in nodeOrType
        ? nodeOrType
        : generateNewNode(nodeOrType);
    if (parent?.type === "element") {
      if (parent.children === undefined) {
        parent.children = [node];
      } else {
        parent.children.unshift(node);
      }
    } else if (parent !== null) {
      const grandParent = util.findNodeParent(parent);
      if (grandParent) {
        insertNode(node, grandParent);
      } else {
        state.component.template.unshift(node);
      }
    } else {
      state.component.template.unshift(node);
    }
    state.selected = node;
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
    insertNode
  };
}
