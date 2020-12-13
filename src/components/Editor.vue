<template>
  <div class="flex">
    <div class="w-3/4">
      <div>
        <DomNode
          v-for="(child, index) in editor.state.root.template"
          :key="index"
          :node="child"
        />
      </div>
    </div>
    <div class="fixed right-0 w-1/4 h-screen bg-gray-700 text-gray-300 p-4">
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
import DomNodeComponent from "./DomNode.vue";
import DetailsPanel from "./DetailsPanel.vue";
import { provideEditor } from "@/state/editor";

export default defineComponent({
  name: "Editor",
  components: { DomNode: DomNodeComponent, DetailsPanel },
  setup() {
    return {
      editor: provideEditor()
    };
  }
});
</script>
