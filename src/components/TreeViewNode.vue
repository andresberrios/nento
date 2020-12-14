<template>
  <div>
    <div
      @click.self="editor.selectNode(node)"
      @mouseover.self="editor.hoverNode(node)"
      @mouseout.self="editor.hoverNode(null)"
      class="px-2 py-1 cursor-pointer"
      :class="{
        'text-gray-500': isText,
        'font-mono': !isText,
        selected: isSelected,
        hovered: isHovered
      }"
    >
      {{ label }}
    </div>
    <div class="ml-4" v-if="showChildren">
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
    node: { required: true, type: [Object as () => TemplateNode, String] },
    showChildren: { type: Boolean, default: true }
  },
  setup(props) {
    const editor = injectEditor();
    return {
      editor,
      isSelected: computed(() => props.node === editor.state.selected),
      isHovered: computed(() => props.node === editor.state.hovered),
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

<style lang="scss" scoped>
.hovered {
  background: transparentize($color: yellow, $amount: 0.95);
}
.selected {
  background: transparentize($color: red, $amount: 0.8);
}
</style>
