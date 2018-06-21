<template>
  <el-tree class="material-tree show-shadow" :highlight-current="true" :check-on-click-node="true" :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
    <span class="el-tree-node__label" slot-scope="{ node, data }">
      <span :title="node.label">{{ node.label }}</span>
    </span>
  </el-tree>
</template>

<script>
export default {
  name: 'material-tree',
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      if (data.children === undefined || data.children.length === 0) {
        this.$emit('selected', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .material-tree {
    flex: auto;
    color: #333;
    background: #ffffff;
    overflow-y: auto;
  }
</style>
