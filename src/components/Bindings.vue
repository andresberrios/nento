<template>
  <div>
    Bindings panel
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
