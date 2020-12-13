<template>
  <div></div>
</template>

<script lang="ts">
import { injectEditor } from "@/state/editor";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TreeView",
  setup() {
    const editor = injectEditor();
    return {
      editor,
      selected: computed(() => editor.state.selected)
    };
  }
});
</script>
