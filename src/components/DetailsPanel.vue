<template>
  <div v-if="selected !== null">
    <div class="border-b-2 border-black pb-3">
      <div>
        <span class="text-gray-400">Selected:</span>
        <br />
        <span v-if="selected.type === 'text'" class="font-mono font-bold">
          Text node
        </span>
        <n-input-save
          v-else-if="selected.type === 'element'"
          class="mt-1"
          :modelValue="selected.tag"
          @update:modelValue="selected.tag = $event"
        />
      </div>
      <div class="mt-3">
        <span class="text-gray-400">Parent:</span>
        <TreeViewNode
          v-if="editor.selectedParent.value"
          :node="editor.selectedParent.value"
          :show-children="false"
        />
        <pre v-else class="text-gray-500 py-1 ml-2">None</pre>
      </div>
      <div class="mt-3">
        <n-button @click="editor.deleteNode(selected)">Delete</n-button>
        <n-button
          :disabled="!editor.canMoveUp(selected)"
          @click="editor.moveUp(selected)"
        >
          Up
        </n-button>
        <n-button
          :disabled="!editor.canMoveDown(selected)"
          @click="editor.moveDown(selected)"
        >
          Down
        </n-button>
        <n-button
          :disabled="!editor.canMoveIn(selected)"
          @click="editor.moveIn(selected)"
        >
          In
        </n-button>
        <n-button
          :disabled="!editor.canMoveOut(selected)"
          @click="editor.moveOut(selected)"
        >
          Out
        </n-button>
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
import NInputSave from "./common/NInputSave.vue";
import TreeViewNode from "./TreeViewNode.vue";

export default defineComponent({
  name: "DetailsPanel",
  components: { TreeViewNode, NInputSave },
  setup() {
    const editor = injectEditor();
    return {
      editor,
      selected: computed(() => editor.state.selected)
    };
  }
});
</script>
