import { TemplateNode } from "./template";
import { setupUtil } from "../state/editor";

export function setupMover(util: ReturnType<typeof setupUtil>) {
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

  return {
    moveDown,
    moveUp,
    moveOut,
    moveIn,
    canMoveDown,
    canMoveUp,
    canMoveOut,
    canMoveIn
  };
}
