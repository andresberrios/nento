<template>
  <div>
    <span class="text-gray-400">Selected:</span>
    <pre class="font-bold">{{
      selected && (selected.tag || "Node with no tag")
    }}</pre>

    <div v-if="typeof selected === 'string'">
      <span class="text-gray-400">Parent:</span>
      <!-- Show the parent node using TreeViewNode to support hover and select -->
    </div>

    <div v-else-if="selected !== null" class="mt-3">
      <span class="text-gray-400">Classes:</span>
      <input
        type="text"
        class="block font-mono text-sm mt-1 w-full p-1 bg-gray-500 focus:outline-none border-2 border-black focus:border-gray-400"
        :value="(selected.classes || []).join(' ')"
        @input="selected.classes = $event.target.value.split(' ')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { injectEditor } from "@/state/editor";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "DetailsPanel",
  setup() {
    const editor = injectEditor();
    return {
      editor,
      selected: computed(() => editor.state.selected)
    };
  }
});
</script>
