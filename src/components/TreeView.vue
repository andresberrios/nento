<template>
  <h2 class="text-gray-400 mb-5">Tree View</h2>
  <div>
    <TreeViewNode
      v-for="(node, index) in state.root.template"
      :key="index"
      :node="node"
    />
  </div>
</template>

<script lang="ts">
import { injectEditor } from "@/state/editor";
import { defineComponent } from "vue";
import TreeViewNode from "./TreeViewNode.vue";

export default defineComponent({
  name: "TreeView",
  components: { TreeViewNode },
  setup() {
    return injectEditor();
  }
});
</script>
