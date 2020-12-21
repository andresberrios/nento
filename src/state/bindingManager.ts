import { EditorState } from "./editor";
import { commerce, name } from "faker";

export function setupBindingManager(state: EditorState) {
  function generateId() {
    return `${commerce.productAdjective()}-${name.firstName()}`.toLowerCase();
  }

  function idExists(id: string) {
    return state.component.bindings.some(b => b.id === id);
  }

  function createBinding() {
    let id = generateId();
    while (idExists(id)) {
      id = generateId();
    }
    state.component.bindings.unshift({ id, spec: "New binding" });
  }

  function findBinding(id: string) {
    return state.component.bindings.find(b => b.id === id);
  }

  return {
    createBinding,
    findBinding
  };
}
