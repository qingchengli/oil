<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_tappingOverview')}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <div class="action-row">
          <div class="action-buttons">
            <el-button type="primary" plain size="small" @click="openAddModal">{{$t('message.qt_addInformation')+$t('message.title_tappingInfo')}}</el-button>
          </div>
          <div class="filter-forms">
            <el-form size="small" :inline="true" :model="filterForm" class="filter-form-inline">
              <el-form-item :label="$t('message.qt_onlineCount')">
                <el-input-number size="small"  v-model="filterForm.onlineTime"></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-radio-group v-model="filterForm.isOnline">
                  <el-radio label="online">{{$t('message.qt_online')}}</el-radio>
                  <el-radio label="offline">{{$t('message.qt_offline')}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('message.qt_time')">
                <el-date-picker
                  v-model="filterForm.timeRange"
                  type="datetimerange"
                  size="small"
                  :picker-options="filterForm.timeRange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="submitFilter">{{$t('message.qt_Inquire')}}</el-button>
              </el-form-item>
            </el-form>
            <el-form size="small" :inline="true" :model="searchForm" class="filter-form-inline">
              <el-form-item>
                <el-input size="small" placeholder="出铁号" v-model="searchForm.tapNo"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="submitSearch">{{$t('message.qt_Inquire')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="table-wrap">
          <overview-table :table-data="tableData" @delete-row="handleDelete" @edit-row="handleEdit" @view-row="handleView"></overview-table>
          <div class="extra-action-row">
            <el-pagination
              @current-change="handleCurrentPageChange"
              :current-page.sync="currentPage"
              :page-size="10"
              background
              layout="total, prev, pager, next, jumper, slot"
              :total="total">
              <span class="total-page">{{`/ 共${totalPage}页`}}</span>
            </el-pagination>
            <el-button size="small" @click="exportExcel">{{$t('message.qt_exportReport')}}<i class="el-icon-upload2 el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
    </div>
    <tapping-add-form :visible="showAdd" @form-close="closeAddModal" @form-submit="getList"></tapping-add-form>
    <tapping-edit-form :visible="showEdit" :item="curItem" @form-close="closeEditModal" @form-submit="getList"></tapping-edit-form>
    <tapping-details-dialog :visible="showDetails" :item="curItem" @form-close="closeDetailsModal"></tapping-details-dialog>
  </div>
</template>

<script>
import OverviewTable from './OverviewTable.vue'
import TappingAddForm from './TappingAddForm'
import TappingEditForm from './TappingEditForm'
import TappingDetailsDialog from './TappingDetailsDialog'
import ExcelExport from '@/mixin/ExcelExport.js'

export default {
  name: 'tapping-index',
  components: {
    OverviewTable,
    TappingAddForm,
    TappingEditForm,
    TappingDetailsDialog
  },
  mixins: [
    ExcelExport
  ],
  data () {
    return {
      filterForm: {
        onlineTime: 6,
        isOnline: 'offline',
        timeRange: ''
      },
      searchForm: {
        tapNo: null
      },
      loading: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      totalPage: 1,
      showAdd: false,
      showEdit: false,
      curItem: {},
      showDetails: false
    }
  },
  methods: {
    submitFilter () {

    },
    submitSearch () {

    },
    getList () {
      this.loading = true
      this.$axios.get(`${process.env.API_HOST}furnace/taps/summary/period/${20150101000000}/${20191010000000}`, {
        params: {
          pageNum: this.currentPage,
          pageSize: 10
        }
      })
        .then((res) => {
          if (res.status === 200) {
            this.$message(res.data.message)
            if (res.data.status) {
              this.tableData = res.data.data.rows
              this.currentPage = res.data.data.pageNum
              this.total = res.data.data.total
              this.totalPage = Math.ceil(res.data.data.total / res.data.data.pageSize)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          this.loading = false
        })
    },
    handleCurrentPageChange () {
      this.getList()
    },
    handleDelete (index, row) {
      this.$axios.delete(`${process.env.API_HOST}furnace/tap/${row.tapid}`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleEdit (index, row) {
      this.curItem = Object.assign({}, row)
      this.showEdit = true
    },
    handleView (index, row) {
      this.curItem = Object.assign({}, row)
      this.showDetails = true
    },
    exportExcel () {
      let sheetColumns = (() => {
        let columns = ['tapno', 'taphole', 'starttime', 'slagtime', 'endtime', 'canceltime', 'temp', 'actweight', 'theroyweight', 'totalweight', 'torpedoweight', 'ironspeed', 'actslagwgt', 'theroyslagwgt', 'slagspeed', 'slagperc', 'dephth', 'holediameter', 'startsrc', 'slagsrc', 'endsrc', 'flag']
        return columns.map((item) => {
          return { header: item, key: item, width: 25 }
        })
      })()
      this.makeExcel(sheetColumns, this.tableData, '出铁总览', '出铁信息记录表.xlsx')
    },
    openAddModal () {
      this.showAdd = true
    },
    closeAddModal () {
      this.showAdd = false
    },
    closeEditModal () {
      this.showEdit = false
    },
    closeDetailsModal () {
      this.showDetails = false
    }
  },
  mounted () {
    this.getList()
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
        .filter-forms {
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
        }
      }
    }
  }
}
</style>
