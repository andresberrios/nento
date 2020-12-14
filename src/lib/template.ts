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

export interface CssClasses {
  [cssClass: string]: true | BindingRef;
}

export interface TemplateTextNode {
  type: "text";
  content: string;
}

export interface TemplateBindingNode {
  type: "binding";
  bindingId: string;
}

export interface TemplateElementNode {
  type: "element";
  tag: string;
  attrs?: TemplateElementAttributes;
  classes?: CssClasses;
  children?: TemplateNode[];
}

export type TemplateNode =
  | TemplateElementNode
  | TemplateTextNode
  | TemplateBindingNode;

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
  if ("children" in node && node.children?.length) {
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
