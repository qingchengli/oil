<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_airOutlet')}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <div class="table-wrap">
          <el-table
            border
            stripe
            fit
            size="small"
            height="auto"
            :data="tableData"
            highlight-current-row
            :header-cell-style ="{background:'#3ac9d6',color:'#fff'}"
            style="width: 100%">
            <el-table-column
              label="..."
              align="center"
              v-if="tableData.length === 0">
            </el-table-column>
            <el-table-column
              prop="num"
              align="center"
              label="风口编号">
            </el-table-column>
            <el-table-column
              prop="diameter"
              align="center"
              label="直径">
            </el-table-column>
            <el-table-column
              prop="length"
              align="center"
              label="长度">
            </el-table-column>
            <el-table-column
              prop="angle"
              align="center"
              label="角度">
            </el-table-column>
            <el-table-column
              prop="replaceTime"
              align="center"
              width="148"
              label="最近更换时间">
            </el-table-column>
            <el-table-column
              prop="life"
              align="center"
              label="使用寿命">
            </el-table-column>
            <el-table-column
              prop="reason"
              align="center"
              label="更换原因">
            </el-table-column>
            <el-table-column
              align="center"
              label="喷煤">
              <template slot-scope="scope">
                <div class="state-indicator">
                  <i class="el-icon-bf-gou" v-if="scope.row.isPulverizedCoal"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="漏水">
              <template slot-scope="scope">
                <div class="state-indicator">
                  <i class="el-icon-bf-gou" v-if="scope.row.isLeak"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="阻塞">
              <template slot-scope="scope">
                <div class="state-indicator">
                  <i class="el-icon-bf-gou" v-if="scope.row.isBlockade"></i>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="140">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index, scope.row)" type="text" class="action-edit-button" size="mini">编辑</el-button>
                <el-button @click="handleView(scope.$index, scope.row)" type="text" class="action-view-button" size="mini">查看历史</el-button>
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
    <air-outlet-edit-form :visible="showEdit" :item="curItem" @form-close="closeEditModal" @form-submit="getList"></air-outlet-edit-form>
  </div>
</template>

<script>
import AirOutletEditForm from './AirOutletEditForm'

export default {
  name: 'air-outlet-index',
  components: {
    AirOutletEditForm
  },
  data () {
    return {
      tableData: [{
        num: 1,
        diameter: 6416,
        length: 643,
        angle: 6,
        replaceTime: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
        life: 360,
        reason: '磨损',
        isPulverizedCoal: true,
        isLeak: false,
        isBlockade: true
      }],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      totalPage: 1,
      curItem: null,
      showEdit: false
    }
  },
  methods: {
    getList () {
      // this.$axios.get(`${process.env.API_HOST}furnace`)
    },
    handleEdit (index, row) {
      this.curItem = Object.assign({}, row)
      this.showEdit = true
    },
    handleView (index, row) {
      console.log(index, row)
    },
    handleCurrentPageChange (val) {
      this.getList()
    },
    closeEditModal () {
      this.showEdit = false
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

.state-indicator {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #979797;
  box-sizing: border-box;
  i {
    color: #3AC9D6;
    font-size: 20px;
  }
}
</style>
