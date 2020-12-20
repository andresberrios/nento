<template>
  <div>
    <n-button @click="createNewBinding()">
      + Element
    </n-button>
  </div>
  <div class="mt-2">
    <div v-for="binding in bindings" :key="binding.id">
      {{ binding.id }} - {{ binding.spec }}
    </div>
  </div>
</template>

<script lang="ts">
import { injectEditor } from "@/state/editor";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Bindings",
  setup() {
    const editor = injectEditor();
    return {
      bindings: editor.state.component.bindings,
      createNewBinding() {
        editor.bindingManager.createBinding();
      }
    };
  }
});
</script>
