<template>
  <div v-if="selected !== null">
    <div class="border-b-2 border-black pb-3">
      <div>
        <span class="text-gray-400 inline-block mb-1">Selected:</span>
        <div v-if="selected.type === 'text'" class="font-mono ml-2">
          Text node
        </div>
        <n-input-save
          v-else-if="selected.type === 'element'"
          :modelValue="selected.tag"
          @update:modelValue="selected.tag = $event"
        />
      </div>
      <div class="mt-3">
        <span class="text-gray-400">Parent:</span>
        <TreeViewNode
          v-if="selectedParent"
          :node="selectedParent"
          :show-children="false"
          @click="highlightNode(selectedParent)"
        />
        <pre v-else class="text-gray-500 py-1 ml-2">None</pre>
      </div>
      <div class="mt-3">
        <n-button @click="deleteNode(selected)">Delete</n-button>
        <n-button :disabled="!canMoveUp(selected)" @click="moveUp(selected)">
          Up
        </n-button>
        <n-button
          :disabled="!canMoveDown(selected)"
          @click="moveDown(selected)"
        >
          Down
        </n-button>
        <n-button :disabled="!canMoveIn(selected)" @click="moveIn(selected)">
          In
        </n-button>
        <n-button :disabled="!canMoveOut(selected)" @click="moveOut(selected)">
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
    const {
      moveUp,
      moveDown,
      moveIn,
      moveOut,
      canMoveUp,
      canMoveDown,
      canMoveIn,
      canMoveOut
    } = editor.nodeManager;
    return {
      moveUp,
      moveDown,
      moveIn,
      moveOut,
      canMoveUp,
      canMoveDown,
      canMoveIn,
      canMoveOut,
      selected: computed(() => editor.state.selected),
      selectedParent: editor.util.selectedParent,
      highlightNode: editor.util.highlightNode
    };
  }
});
</script>
