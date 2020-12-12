<template>
  <div class="flex">
    <div class="w-3/4">
      <div>
        <DomNode
          v-for="(child, index) in editor.root.template"
          :key="index"
          :node="child"
          @selected="onSelected"
        />
      </div>
    </div>
    <div class="fixed right-0 w-1/4 h-screen bg-gray-700 text-gray-300 p-4">
      <div class="mb-3">
        <button class="border-2 border-black px-2 py-1 mr-1" @click="save">
          Save
        </button>
        <button class="border-2 border-black px-2 py-1" @click="load">
          Load
        </button>
      </div>

      <span class="text-gray-400">Selected:</span>
      <pre class="font-bold">{{
        editor.selected && (editor.selected.tag || "Node with no tag")
      }}</pre>
      <!-- <pre class="text-gray-400">{{ editor.selected || "none" }}</pre> -->

      <div v-if="editor.selected !== null" class="mt-3">
        <span class="text-gray-400">Classes:</span>
        <input
          type="text"
          class="block font-mono mt-1 w-full p-1 bg-gray-500 focus:outline-none border-2 border-black focus:border-gray-400"
          :value="(editor.selected.classes || []).join(' ')"
          @input="editor.selected.classes = $event.target.value.split(' ')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TemplateNode, ComponentDefinition } from "@/lib/template";
import { defineComponent, reactive } from "vue";
import DomNodeComponent from "./DomNode.vue";

export default defineComponent({
  name: "Editor",
  components: { DomNode: DomNodeComponent },
  setup() {
    const editor: {
      selected: TemplateNode | null;
      root: ComponentDefinition;
    } = reactive({
      selected: null,
      root: {
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
      }
    });
    return {
      editor,
      onSelected(node: TemplateNode) {
        editor.selected = node;
      },
      save() {
        window.localStorage.setItem("component", JSON.stringify(editor.root));
      },
      load() {
        const rawData = window.localStorage.getItem("component");
        if (rawData) {
          editor.root = JSON.parse(rawData);
        } else {
          editor.root = { template: [], bindings: [] };
        }
      }
    };
  }
});
</script>
