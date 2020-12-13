<template>
  <div class="flex">
    <div class="w-1/5 h-screen overflow-y-scroll bg-gray-700 text-gray-300 p-4">
      <TreeView />
    </div>
    <div class="w-3/5 h-screen overflow-y-scroll">
      <div>
        <TemplateNode
          v-for="(child, index) in editor.state.root.template"
          :key="index"
          :node="child"
        />
      </div>
    </div>
    <div class="w-1/5 h-screen overflow-y-scroll bg-gray-700 text-gray-300 p-4">
      <div class="mb-3">
        <button
          class="border-2 border-black px-2 py-1 mr-1"
          @click="editor.save()"
        >
          Save
        </button>
        <button class="border-2 border-black px-2 py-1" @click="editor.load()">
          Load
        </button>
      </div>
      <DetailsPanel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideEditor } from "@/state/editor";
import TemplateNodeComponent from "./TemplateNode.vue";
import DetailsPanel from "./DetailsPanel.vue";
import TreeView from "./TreeView.vue";

export default defineComponent({
  name: "Editor",
  components: { TemplateNode: TemplateNodeComponent, DetailsPanel, TreeView },
  setup() {
    return {
      editor: provideEditor()
    };
  }
});
</script>
