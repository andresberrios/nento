import { Editor } from "@/state/editor";

export function setupKeyDownHandlers(editor: Editor) {
  function keyDownHandler(event: KeyboardEvent) {
    if (event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey) {
      if (
        editor.state.selected &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")
      ) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          editor.moveUp(editor.state.selected);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          editor.moveDown(editor.state.selected);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          editor.moveOut(editor.state.selected);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          editor.moveIn(editor.state.selected);
        } else if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault();
          editor.deleteNode(editor.state.selected);
        }
      }
    } else if (editor.state.selected && editor.state.treeViewFocused) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        editor.selectPreviousNode();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        editor.selectNextNode();
      }
    }
  }

  return { keyDownHandler };
}
