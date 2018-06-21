<template>
    <el-table
      border
      stripe
      fit
      size="small"
      height="auto"
      :data="tableData"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :header-cell-style ="{background:'#3ac9d6',color:'#fff'}"
      style="width: 100%">
      <!-- <el-table-column
        type="selection"
        align="center"
        fixed="left"
        width="55">
      </el-table-column> -->
      <el-table-column
        v-for="(item,index) in columns"
        :key="index"
        :prop="item"
        align="center"
        :width="item.indexOf('time')!==-1 ? '148' : 'auto'"
        :label="item">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="140">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.$index, scope.row)" type="text" class="action-view-button" size="mini">查看</el-button>
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" class="action-edit-button" size="mini">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" class="action-delete-button" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'overview-table',
  props: {
    tableData: Array
  },
  data () {
    return {
      columns: ['tapno', 'taphole', 'starttime', 'slagtime', 'endtime', 'canceltime', 'temp', 'actweight', 'theroyweight', 'totalweight', 'torpedoweight', 'ironspeed', 'actslagwgt', 'theroyslagwgt', 'slagspeed', 'slagperc', 'dephth', 'holediameter', 'startsrc', 'slagsrc', 'endsrc', 'flag']
    }
  },
  methods: {
    handleEdit (index, row) {
      this.$emit('edit-row', index, row)
    },
    handleDelete (index, row) {
      this.$emit('delete-row', index, row)
    },
    handleView (index, row) {
      this.$emit('view-row', index, row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  mounted () {

  }
}
</script>
