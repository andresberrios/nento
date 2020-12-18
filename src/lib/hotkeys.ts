import { Editor } from "@/state/editor";

export function setupKeyDownHandlers(editor: Editor) {
  function keyDownHandler(event: KeyboardEvent) {
    if (event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      if (editor.state.selected) {
        if (event.key === "ArrowUp") {
          editor.moveUp(editor.state.selected);
        } else if (event.key === "ArrowDown") {
          editor.moveDown(editor.state.selected);
        } else if (event.key === "ArrowLeft") {
          editor.moveOut(editor.state.selected);
        } else if (event.key === "ArrowRight") {
          editor.moveIn(editor.state.selected);
        } else if (event.key === "Delete" || event.key === "Backspace") {
          editor.deleteNode(editor.state.selected);
        }
      }
    } else if (editor.state.selected && editor.state.treeViewFocused) {
      event.preventDefault();
      if (event.key === "ArrowUp") {
        editor.selectPreviousNode();
      } else if (event.key === "ArrowDown") {
        editor.selectNextNode();
      }
    }
  }

  return { keyDownHandler };
}
