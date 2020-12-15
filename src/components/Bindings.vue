<template>
  <div v-for="binding in state.root.bindings" :key="binding.id">
    {{ binding.id }} - {{ binding.spec }}
  </div>
</template>

<script lang="ts">
import { injectEditor } from "@/state/editor";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Bindings",
  setup() {
    return injectEditor();
  }
});
</script>
