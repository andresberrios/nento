import { Editor } from "@/state/editor";

export function setupKeyDownHandlers(editor: Editor) {
  function keyDownHandler(event: KeyboardEvent) {
    if (event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey) {
      if (
        editor.state.selected &&
        "type" in editor.state.selected &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")
      ) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          editor.nodeManager.moveUp(editor.state.selected);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          editor.nodeManager.moveDown(editor.state.selected);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          editor.nodeManager.moveOut(editor.state.selected);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          editor.nodeManager.moveIn(editor.state.selected);
        } else if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault();
          editor.nodeManager.deleteNode(editor.state.selected);
        }
      }
    } else if (editor.state.selected && editor.state.treeViewFocused) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        editor.util.selectPreviousNode();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        editor.util.selectNextNode();
      }
    }
  }

  return { keyDownHandler };
}
