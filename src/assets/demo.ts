import { ComponentDefinition } from "@/lib/template";

export default {
  bindings: [],
  template: [
    {
      tag: "article",
      classes: ["bg-yellow-500", "h-screen", "p-10"],
      children: [
        {
          tag: "h1",
          classes: ["text-2xl", "mb-4"],
          children: ["Hello World!"]
        },
        {
          tag: "p",
          children: [
            "Paragraphs work too. ",
            { tag: "strong", children: ["Bold stuff."] }
          ]
        }
      ]
    },
    { tag: "footer", classes: ["bg-yellow-300", "h-32"] }
  ]
} as ComponentDefinition;
