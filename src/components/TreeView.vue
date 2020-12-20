<template>
  <div>
    <n-button @click="insertNewNode('element')">
      + Element
    </n-button>
    <n-button @click="insertNewNode('text')">
      + Text
    </n-button>
  </div>
  <div
    tabindex="0"
    class="mt-2 focus:outline-none"
    @focus="state.treeViewFocused = true"
    @blur="state.treeViewFocused = false"
  >
    <TreeViewNode
      v-for="(node, index) in state.component.template"
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
