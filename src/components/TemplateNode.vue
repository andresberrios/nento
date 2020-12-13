<template>
  <span
    v-if="typeof node === 'string'"
    :class="classes"
    @click.self="editor.selectNode(node)"
    @mouseover.self="editor.hoverNode(node)"
    @mouseout.self="editor.hoverNode(null)"
    >{{ node }}</span
  >
  <component
    v-else
    :is="node.tag"
    v-bind="node.attrs"
    :class="classes"
    @click.self="editor.selectNode(node)"
    @mouseover.self="editor.hoverNode(node)"
    @mouseout.self="editor.hoverNode(null)"
  >
    <TemplateNode
      v-for="(child, index) in node.children"
      :key="index"
      :node="child"
    />
  </component>
</template>

<script lang="ts">
import { TemplateNode } from "@/lib/template";
import { injectEditor } from "@/state/editor";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TemplateNode",
  props: {
    node: { required: true, type: [Object as () => TemplateNode, String] }
  },
  setup(props) {
    const editor = injectEditor();
    return {
      editor,
      classes: computed(() => {
        const result: { [c: string]: boolean } = {};
        if (
          typeof props.node !== "string" &&
          "classes" in props.node &&
          Array.isArray(props.node.classes)
        ) {
          for (const c of props.node.classes) {
            if (typeof c !== "string") {
              throw new Error("Not yet implemented!");
            }
            result[c] = true;
          }
        }
        result.selected = props.node === editor.state.selected;
        result.hovered = props.node === editor.state.hovered;
        return result;
      })
    };
  }
});
</script>

<style lang="scss" scoped>
.hovered {
  outline: 2px yellow dashed;
}
.selected {
  outline: 2px red solid;
}
</style>
