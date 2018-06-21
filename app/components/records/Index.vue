<template>
  <div class="page">
    <div class="page-title">
      <h2>{{`${$t('message.title_records')}`}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <div class="action-row">
          <div class="filter-form-wrap">
            <el-form size="small" :inline="true" :model="filterForm" class="filter-form-inline">
              <el-form-item label="类型">
                <el-select v-model="filterForm.type">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="报警" value="1"></el-option>
                  <el-option label="事件" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker
                  v-model="filterForm.timeRange"
                  type="datetimerange"
                  :picker-options="filterForm.timeRange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  align="right">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitFilter">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button @click="exportExcel">导出报表<i class="el-icon-upload2 el-icon--right"></i></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="table-wrap" v-loading="loading" element-loading-text="加载列表数据中" element-loading-spinner="el-icon-loading">
          <el-table
            :data="tableData"
            size="small"
            border
            highlight-current-row
            @current-change="handleCurrentRowChange"
            :header-cell-style ="{background:'#3ac9d6',color:'#fff'}"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="time"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="source"
              label="来源">
            </el-table-column>
            <el-table-column
              prop="event"
              label="事件">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="openDetails(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DetailsDialog from './DetailsDialog.vue'
import ExcelExport from '@/mixin/ExcelExport.js'

export default {
  name: 'records-index',
  mixins: [
    ExcelExport
  ],
  data () {
    return {
      loading: false,
      filterForm: {
        type: '0',
        timeRange: ''
      },
      tableData: [],
      pageSize: 10,
      currentPage: 1,
      totalPage: 1,
      total: 0,
      currentRow: null,
      showDetails: false
    }
  },
  methods: {
    handleCurrentRowChange (val) {
      this.currentRow = val
    },
    submitFilter () {

    },
    getList () {
      this.loading = true
      this.$axios.get(`${process.env.API_HOST}converter/warnlog/list`, {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
      })
        .then((res) => {
          if (res.status === 200) {
            this.$message(res.data.message)
            if (res.data.status) {
              this.tableData = res.data.data.rows
              this.totalPage = res.data.data.pages
              this.currentPage = res.data.data.pageNum
              this.total = res.data.data.totle
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
    handleCurrentPageChange (val) {
      this.getList()
    },
    openDetails (index, row) {
      this.currentRow = row
      this.showDetails = true
    },
    closeDetails () {
      this.showDetails = false
    },
    exportExcel () {
      let sheetColumns = [
        {header: '操作人', key: 'converterInfoId', width: 25},
        {header: '事件', key: 'furnaceNum', width: 25},
        {header: '时间', key: 'steelType', width: 25}
      ]
      this.makeExcel(sheetColumns, this.tableData, '日志记录', '日志记录信息表.xlsx')
    }
  },
  mounted () {
    // this.getList()
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
