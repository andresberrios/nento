<template>
  <div>
    <Editor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "@/components/Editor.vue";

export default defineComponent({
  name: "Home",
  components: {
    Editor
  }
});
</script>
