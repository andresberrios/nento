<template>
  {{ typeof node === "string" ? node : undefined
  }}<component
    v-if="typeof node !== 'string'"
    :is="node.tag"
    v-bind="node.attrs"
    class="selectable"
    :class="node.classes"
    @click.self="$emit('selected', node)"
  >
    <DomNode
      v-for="(child, index) in node.children"
      :key="index"
      :node="child"
      @selected="$emit('selected', $event)"
    />
  </component>
</template>

<script lang="ts">
import { TemplateNode } from "@/lib/template";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DomNode",
  props: {
    node: { required: true, type: [Object as () => TemplateNode, String] }
  },
  emits: ["selected"]
});
</script>

<style lang="scss" scoped>
.selectable {
  &:hover {
    outline: 1px yellow dashed;
  }
}
</style>
