export interface Binding {
  id: string;
  spec: string;
}

export interface BindingRef {
  bindingId: string;
}

export interface TemplateElementAttributes {
  [key: string]: string | BindingRef;
}

export interface ConditionalCssClass {
  class: string;
  bindingId: string;
}

export type CssClasses = Array<string | ConditionalCssClass>;

export type TemplateTextNode = string | BindingRef;

export interface TemplateElementNode {
  tag: string;
  attrs?: TemplateElementAttributes;
  classes?: CssClasses;
  children?: TemplateNode[];
}

export type TemplateNode = TemplateElementNode | TemplateTextNode;

export interface ComponentDefinition {
  template: TemplateNode[];
  bindings: Binding[];
}

export class ComponentManager {
  constructor(public component: ComponentDefinition) {}

  findBinding(id: string) {
    return this.component.bindings.find(b => b.id === id);
  }
}
