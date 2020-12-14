<template>
  <span
    v-if="node.type === 'text'"
    :class="classes"
    @click.self="editor.selectNode(node)"
    @mouseover.self="editor.hoverNode(node)"
    @mouseout.self="editor.hoverNode(null)"
    >{{ node.content }}</span
  >
  <span
    v-else-if="node.type === 'binding'"
    :class="classes"
    @click.self="editor.selectNode(node)"
    @mouseover.self="editor.hoverNode(node)"
    @mouseout.self="editor.hoverNode(null)"
    >&#123;&#123; Binding: {{ node.bindingId }} &#125;&#125;</span
  >
  <component
    v-else-if="node.type === 'element'"
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
    node: { required: true, type: Object as () => TemplateNode }
  },
  setup(props) {
    const editor = injectEditor();
    return {
      editor,
      classes: computed(() => {
        const result: { [c: string]: boolean } = {};
        if ("classes" in props.node && props.node.classes !== undefined) {
          for (const [className, value] of Object.entries(props.node.classes)) {
            if (value !== true) {
              throw new Error("Not yet implemented!");
            }
            result[className] = true;
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
