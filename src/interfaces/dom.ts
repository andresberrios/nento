export interface DomAttributes {
  [key: string]: string;
}

export interface DomElementNode {
  tag: string;
  attrs?: DomAttributes;
  classes?: string[];
  children?: DomNode[];
}

export type DomTextNode = string;

export type DomNode = DomElementNode | DomTextNode;

export interface RootNode {
  children: DomNode[];
}
