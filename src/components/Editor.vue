<template>
  <div class="flex">
    <div
      class="w-1/5 h-screen overflow-y-scroll bg-gray-700 text-gray-300 p-4 border-r-2 border-black"
    >
      <div class="mb-3">
        <n-button class="mr-1" @click="editor.save()">
          Save
        </n-button>
        <n-button @click="editor.load()">
          Load
        </n-button>
      </div>
      <ul class="border-b-2 border-black mb-4">
        <li
          class="inline-block text-gray-400 p-2 mr-1 hover:bg-gray-600 cursor-pointer"
          :class="{ 'bg-gray-600': state.currentPrimaryTab === 'treeView' }"
          @click="state.currentPrimaryTab = 'treeView'"
        >
          Tree View
        </li>
        <li
          class="inline-block text-gray-400 p-2 mr-1 hover:bg-gray-600 cursor-pointer"
          :class="{ 'bg-gray-600': state.currentPrimaryTab === 'bindings' }"
          @click="state.currentPrimaryTab = 'bindings'"
        >
          Bindings
        </li>
      </ul>
      <TreeView v-if="state.currentPrimaryTab === 'treeView'" />
      <Bindings v-else-if="state.currentPrimaryTab === 'bindings'" />
    </div>
    <div
      class="w-1/5 h-screen overflow-y-scroll bg-gray-700 text-gray-300 p-4 border-r-2 border-black"
    >
      <DetailsPanel />
    </div>
    <div class="w-3/5 h-screen overflow-y-scroll">
      <div>
        <TemplateNode
          v-for="(child, index) in editor.state.component.template"
          :key="index"
          :node="child"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { provideEditor } from "@/state/editor";
import TemplateNodeComponent from "./TemplateNode.vue";
import DetailsPanel from "./DetailsPanel.vue";
import TreeView from "./TreeView.vue";
import Bindings from "./Bindings.vue";

export default defineComponent({
  name: "Editor",
  components: {
    TemplateNode: TemplateNodeComponent,
    DetailsPanel,
    TreeView,
    Bindings
  },
  setup() {
    const state = reactive({ currentPrimaryTab: "treeView" });
    return {
      editor: provideEditor(),
      state
    };
  }
});
</script>
