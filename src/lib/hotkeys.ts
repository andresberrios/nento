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
        } else if (event.key === "Delete" || event.key === "Backspace") {
          editor.deleteNode(editor.state.selected);
        }
      }
    }
  }

  return { keyDownHandler };
}
