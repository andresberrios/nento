<template>
  <div class="flex">
    <div class="w-3/4">
      <div>
        <DomNode
          v-for="(child, index) in root.children"
          :key="index"
          :node="child"
          @selected="onSelected"
        />
      </div>
    </div>
    <div class="w-1/4 bg-gray-700 text-gray-300 p-4">
      Selected:
      <pre class="text-gray-400">{{ editor.selected || "none" }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { DomNode, RootNode } from "@/interfaces/dom";
import { defineComponent, reactive } from "vue";
import DomNodeComponent from "./DomNode.vue";

export default defineComponent({
  name: "Editor",
  components: { DomNode: DomNodeComponent },
  setup() {
    const editor: { selected: DomNode | null } = reactive({ selected: null });
    const root: RootNode = reactive({
      children: [
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
    });
    function onSelected(node: DomNode) {
      editor.selected = node;
    }
    return { root, editor, onSelected };
  }
});
</script>
