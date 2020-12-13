<template>
  <div>
    <span :class="{ 'text-gray-500': isText, 'font-mono': !isText }">
      {{ label }}
    </span>
    <div class="ml-4">
      <TreeViewNode
        v-for="(child, index) in node.children"
        :key="index"
        :node="child"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { TemplateNode } from "@/lib/template";
import { injectEditor } from "@/state/editor";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TreeViewNode",
  props: {
    node: { required: true, type: [Object as () => TemplateNode, String] }
  },
  setup(props) {
    const editor = injectEditor();
    return {
      editor,
      selected: computed(() => editor.state.selected),
      isText: computed(() => typeof props.node === "string"),
      label: computed(() => {
        if (typeof props.node === "string" || "bindingId" in props.node) {
          return props.node;
        } else {
          return props.node.tag;
        }
      })
    };
  }
});
</script>
