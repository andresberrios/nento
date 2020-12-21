<template>
  <span
    v-if="node.type === 'text'"
    :class="classes"
    @click.self="selectNode(node)"
    @mouseover.self="highlightNode(node)"
    @mouseout.self="highlightNode(null)"
    >{{ node.content }}</span
  >
  <span
    v-else-if="node.type === 'binding'"
    :class="classes"
    @click.self="selectNode(node)"
    @mouseover.self="highlightNode(node)"
    @mouseout.self="highlightNode(null)"
    >&#123;&#123; Binding: {{ node.bindingId }} &#125;&#125;</span
  >
  <component
    v-else-if="node.type === 'element'"
    :is="node.tag"
    v-bind="node.attrs"
    :class="classes"
    @click.self="selectNode(node)"
    @mouseover.self="highlightNode(node)"
    @mouseout.self="highlightNode(null)"
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
        result.highlighted = props.node === editor.state.highlighted;
        return result;
      }),
      selectNode: editor.util.selectNode,
      highlightNode: editor.util.highlightNode
    };
  }
});
</script>

<style lang="scss" scoped>
.highlighted {
  outline: 2px yellow dashed;
}
.selected {
  outline: 2px red solid;
}
</style>
