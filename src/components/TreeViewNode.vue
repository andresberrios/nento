<template>
  <div>
    <div
      @click.self="selectNode(node)"
      @mouseover.self="highlightNode(node)"
      @mouseout.self="highlightNode(null)"
      class="px-2 py-1 cursor-pointer"
      :class="{
        'text-gray-500': isText,
        'font-mono': !isText,
        selected: isSelected,
        highlighted: isHighlighted,
        focused: isSelected && treeViewFocused
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
      isSelected: computed(() => props.node === editor.state.selected),
      isHighlighted: computed(() => props.node === editor.state.highlighted),
      treeViewFocused: computed(() => editor.state.treeViewFocused),
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
      }),
      selectNode: editor.util.selectNode,
      highlightNode: editor.util.highlightNode
    };
  }
});
</script>

<style lang="scss" scoped>
.highlighted {
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
