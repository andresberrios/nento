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

export function walkTree(
  node: TemplateNode,
  callback: (node: TemplateNode, parent?: TemplateNode) => void,
  parent?: TemplateNode
) {
  callback(node, parent);
  if (typeof node !== "string" && "children" in node && node.children?.length) {
    for (const child of node.children) {
      walkTree(child, callback, node);
    }
  }
}

export function walk(
  component: ComponentDefinition,
  callback: (node: TemplateNode, parent?: TemplateNode) => void
) {
  for (const node of component.template) {
    walkTree(node, callback);
  }
}
