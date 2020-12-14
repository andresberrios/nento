import { ComponentDefinition } from "@/lib/template";

const data: ComponentDefinition = {
  bindings: [],
  template: [
    {
      type: "element",
      tag: "article",
      classes: { "bg-yellow-500": true, "h-screen": true, "p-10": true },
      children: [
        {
          type: "element",
          tag: "h1",
          classes: { "text-2xl": true, "mb-4": true },
          children: [
            {
              type: "text",
              content: "Hello World!"
            }
          ]
        },
        {
          type: "element",
          tag: "p",
          children: [
            {
              type: "text",
              content: "Paragraphs work too. "
            },
            {
              type: "element",
              tag: "strong",
              children: [{ type: "text", content: "Bold stuff." }]
            }
          ]
        }
      ]
    },
    {
      type: "element",
      tag: "footer",
      classes: { "bg-yellow-300": true, "h-32": true }
    }
  ]
};

export default data;
