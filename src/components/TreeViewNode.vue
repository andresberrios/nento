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
        hovered: isHovered,
        focused: isSelected && editor.state.treeViewFocused
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
    node: { required: true, type: Object as () => TemplateNode },
    showChildren: { type: Boolean, default: true }
  },
  setup(props) {
    const editor = injectEditor();
    return {
      editor,
      isSelected: computed(() => props.node === editor.state.selected),
      isHovered: computed(() => props.node === editor.state.hovered),
      isText: computed(() => props.node.type === "text"),
      label: computed(() => {
        if (props.node.type === "text") {
          if (!props.node.content) {
            return "No content";
          }
          const words = props.node.content.split(" ", 10);
          return words.length < 10
            ? props.node.content
            : words.slice(0, 10).join(" ") + "...";
        } else if (props.node.type === "binding") {
          return "Binding: " + props.node.bindingId;
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
.focused {
  @apply ring-2;
  @apply ring-gray-500;
}
</style>
