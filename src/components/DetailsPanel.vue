<template>
  <div v-if="selected !== null">
    <div class="border-b-2 border-black pb-3">
      <div>
        <span class="text-gray-400">Selected:</span>
        <pre class="font-bold">{{ selected.tag || "Text node" }}</pre>
      </div>
      <div class="mt-3">
        <span class="text-gray-400">Parent:</span>
        <TreeViewNode
          :node="editor.selectedParent.value"
          :show-children="false"
        />
      </div>
      <div class="mt-3">
        <n-button>Delete</n-button>
        <n-button>Up</n-button>
        <n-button>Down</n-button>
        <n-button>Out</n-button>
        <n-button>In</n-button>
      </div>
    </div>

    <div v-if="selected.type === 'text'" class="mt-3">
      <span class="text-gray-400 mt-3">Content:</span>
      <textarea
        class="block text-sm mt-1 w-full p-1 bg-gray-500 focus:outline-none border-2 border-black focus:border-gray-400"
        v-model="selected.content"
      />
    </div>

    <div v-else-if="selected.type === 'element'" class="mt-3">
      <span class="text-gray-400">Classes:</span>
      <input
        type="text"
        class="block font-mono text-sm mt-1 w-full p-1 bg-gray-500 focus:outline-none border-2 border-black focus:border-gray-400"
        :value="Object.keys(selected.classes || {}).join(' ')"
        @input="
          selected.classes = Object.fromEntries(
            $event.target.value.split(' ').map(k => [k, true])
          )
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import { injectEditor } from "@/state/editor";
import { computed, defineComponent } from "vue";
import TreeViewNode from "./TreeViewNode.vue";

export default defineComponent({
  name: "DetailsPanel",
  components: { TreeViewNode },
  setup() {
    const editor = injectEditor();
    return {
      editor,
      selected: computed(() => editor.state.selected)
    };
  }
});
</script>
