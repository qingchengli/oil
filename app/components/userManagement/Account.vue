<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_userManagement')}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <div class="action-row">
          <div class="action-buttons">
            <el-button size="small" type="primary" plain @click="openAddModal()">{{$t('message.qt_addInformation')}}</el-button>
          </div>
          <div class="filter-form-wrap">
            <el-form size="small" @submit.native.prevent :inline="true" :model="keyword" class="filter-form-inline">
              <el-form-item>
                <el-input v-model="filterForm.keyword" placeholder="搜索"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFilter">{{$t('message.qt_Inquire')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="table-wrap">
          <el-table
            :data="tableData"
            border
            :header-cell-style ="{background:'#3ac9d6',color:'#fff'}"
            style="width: 100%">
            <el-table-column
              prop="username"
              :label="$t('message.qt_userName')">
            </el-table-column>
            <el-table-column
              prop="roles"
              :label="$t('message.qt_userRole')">
            </el-table-column>
            <el-table-column
              prop="description"
              :label="$t('message.qt_note')">
            </el-table-column>
            <el-table-column
              fixed="right"
              :label="$t('message.qt_manipulate')"
              width="150">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button type="danger" size="mini"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="extra-action-row">
            <el-pagination
              @current-change="handleCurrentPageChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              background
              layout="total, prev, pager, next, jumper, slot"
              :total="total">
              <span class="total-page">{{`/ 共${totalPage}页`}}</span>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <add-form :visible="showAdd" @form-close="closeAddModal" @form-submit="getList"></add-form>
    <edit-form :visible="showEdit" :item="curItem" @form-close="closeEditModal" @form-submit="getList"></edit-form>
  </div>
</template>

<script>
import AddForm from './AccountAddForm.vue'
import EditForm from './AccountEditForm.vue'

export default {
  name: 'account-manage',
  components: {
    EditForm,
    AddForm
  },
  data () {
    return {
      filterForm: {
        type: '0',
        keyword: ''
      },
      tableData: [],
      total: 0,
      pageSize: 10,
      totalPage: 1,
      currentPage: 1,
      showAdd: false,
      showEdit: false,
      curIndex: null
    }
  },
  computed: {
    curItem () {
      return this.curIndex !== null ? this.tableData[this.curIndex] : {}
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleCurrentPageChange (val) {
      console.log(val)
    },
    openAddModal () {
      this.showAdd = true
    },
    closeAddModal () {
      this.showAdd = false
    },
    openEditModal (index, row) {
      this.curIndex = index
      this.showEdit = true
    },
    closeEditModal () {
      this.showEdit = false
    },
    submitFilter () {

    },
    getList () {
      this.loading = true
      this.$axios.get(`${process.env.API_HOST}converter/taphole/list?pageSize=5&pageNum=1`)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.$message(res.data.message)
            if (res.data.status) {
              this.tableData = res.data.data
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('请求错误')
          this.loading = false
        })
        .then(() => {
          this.loading = false
        })
    },
    deleteItem (index, row) {
      this.$axios.delete(`${process.env.API_HOST}converter/taphole/delete/${row.id}`)
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: '提示信息',
              message: `${res.data.message}`
            })
            if (res.data.status) {
              this.tableData.splice(index, 1)
            }
          }
        })
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  flex: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  .page-title {
    flex: none;
    border-bottom: 1px solid #999;
    h2 {
      padding: 0 40px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
    }
  }
  .page-content {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    .page-shadow-content {
      flex: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .action-row {
        flex: none;
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        .action-buttons {
          flex: none;
          display: flex;
          align-items: center;
        }
        .filter-form-wrap {
          flex: none;
          display: flex;
          .filter-form-inline {
            padding-left: 10px;
            .el-form-item--small.el-form-item {
              margin-top: 9px;
              margin-bottom: 9px;
            }
            .el-select {
              width: 80px;
            }
            .el-input-number {
              width: 100px;
            }
            .el-input {
              width: 100px;
            }
            .el-radio+.el-radio {
              margin-left: 10px;
            }
            .el-date-editor--datetimerange.el-input,
            .el-date-editor--datetimerange.el-input__inner {
              width: 200px;
            }
          }
        }
      }
      .table-wrap {
        flex:auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        .extra-action-row {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          .total-page {
            margin-left: 0.5em;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
