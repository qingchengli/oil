<template>
  <el-dialog :visible="visible" @close="closeMe()">
    <el-table :data="listData" border>
      <el-table-column :label="`${$t('message.qt_ingredient')}`" prop="name"></el-table-column>
      <el-table-column :label="`${$t('message.qt_content')}`" prop="value"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default ({
  name: 'analysis-form',
  props: {
    visible: Boolean,
    listData: Array
  },
  data () {
    return {
    }
  },
  methods: {
    closeMe () {
      this.$emit('close-form')
    }
  }
})
</script>
