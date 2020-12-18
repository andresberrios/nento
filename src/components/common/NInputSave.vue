<template>
  <div class="input-save">
    <input
      type="text"
      class="font-mono px-2 bg-transparent focus:outline-none flex-grow"
      v-model="state.candidate"
      @blur="onBlur"
    />
    <n-button class="ml-0" @click="onSave" ref="button">
      Save
    </n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watchEffect } from "vue";
import NButton from "./NButton.vue";

export default defineComponent({
  name: "n-input-save",
  props: { modelValue: String },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const state = reactive({ candidate: props.modelValue });
    const button = ref<typeof NButton | null>(null);
    watchEffect(() => {
      state.candidate = props.modelValue;
    });
    async function onSave() {
      ctx.emit("update:modelValue", state.candidate);
      button.value?.$el.blur();
    }
    function onBlur() {
      setTimeout(() => {
        state.candidate = props.modelValue;
      }, 200);
    }

    return {
      state,
      button,
      onSave,
      onBlur
    };
  }
});
</script>

<style lang="scss" scoped>
.input-save {
  @apply flex;
  button {
    display: none;
    @apply py-0;
    @apply border-0;
  }
  &:focus-within {
    @apply ring-2;
    @apply ring-black;
    @apply bg-gray-500;
    input {
      @apply border-r-2;
      @apply border-black;
    }
    button {
      display: unset;
    }
  }
}
</style>
