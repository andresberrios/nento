<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "n-button"
});
</script>

<style lang="scss" scoped>
.button {
  @apply bg-gray-700;
  @apply border-2;
  @apply border-black;
  @apply px-2;
  @apply py-1;
  &:focus {
    @apply outline-none;
    @apply ring-2;
    @apply ring-gray-500;
  }
  &:hover {
    @apply bg-gray-600;
  }
  &:active {
    @apply bg-gray-800;
  }
}
</style>
