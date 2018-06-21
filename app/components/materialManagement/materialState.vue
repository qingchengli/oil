<template>
  <div class="page-content">
    <h2 class="page-title">{{$t('message.qt_materialState')}}</h2>
    <div class="blast-table-wrap">
      <div class="tableBox">
        <el-tabs v-model="activeTab" v-on:tab-click="showMe">
          <!-- 分布矩阵列表 -->
          <el-tab-pane :label="`${$t('message.qt_distributionMatrix')}`" name="first">
            <el-table :data="tableData" style="width: 100%;" :header-cell-style="{background:'#3AC9CD',color:'#fff'}" border>
              <el-table-column prop="No" label="No" width="60"></el-table-column>
              <el-table-column prop="batchno" :label="`${$t('message.qt_batchno')}`"  width="80"></el-table-column>
              <el-table-column prop="endtime" :label="`${$t('message.qt_endTime')}`" width="100"></el-table-column>
              <el-table-column prop="typ" :label="`${$t('message.qt_typ')}`" width="80"></el-table-column>
              <el-table-column prop="indexInDay" label="IndexInDay" width="120"></el-table-column>
              <el-table-column prop="serialno" :label="`${$t('message.qt_serialno')}`" width="100"></el-table-column>
              <el-table-column prop="brandcode" label="brandcode" width="120"></el-table-column>
              <el-table-column prop="weightset" label="weightset" width="120"></el-table-column>
              <el-table-column prop="weightdry" label="weightdry" width="120"></el-table-column>
              <el-table-column prop="weightwet" label="weightwet" width="120"></el-table-column>
              <el-table-column prop="moisture" :label="`${$t('message.qt_moisture')}`" width="100"></el-table-column>
              <el-table-column  :label="`${$t('message.qt_manipulate')}`" width="260" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="getDetails(scope.row,1)" class="action-view-button" type="text">{{$t('message.qt_analysis')}}</el-button>
                  <el-button type="text" size="mini" @click="getEditForm(scope.row,'material')" class="action-edit-button">{{$t('message.qt_change')}}</el-button>
                  <el-button type="text" size="mini" class="action-delete-button" @click="deleteData()">{{$t('message.qt_delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- 电荷矩阵表格 -->
          <el-tab-pane :label="`${$t('message.qt_chargeMatrix')}`" name="second">
            <el-table :data="tableData2" style="width: 60" :header-cell-style="{background:'#3AC9CD',color:'#fff'}" border>
              <el-table-column prop="No" label="No" width="60"></el-table-column>
              <el-table-column prop="batchno" :label="`${$t('message.qt_batchno')}`"></el-table-column>
              <el-table-column prop="endtime" :label="`${$t('message.qt_endTime')}`" width="100"></el-table-column>
              <el-table-column prop="typ" :label="`${$t('message.qt_typ')}`" width="80"></el-table-column>
              <el-table-column prop="indexInDay" label="IndexInDay" width="120"></el-table-column>
              <el-table-column prop="serialno" :label="`${$t('message.qt_serialno')}`" width="100"></el-table-column>
              <el-table-column prop="brandcode" label="brandcode" width="120"></el-table-column>
              <el-table-column prop="weightset" label="weightset" width="120"></el-table-column>
              <el-table-column prop="weightdry" label="weightdry" width="120"></el-table-column>
              <el-table-column prop="weightwet" label="weightwet" width="120"></el-table-column>
              <el-table-column prop="moisture" :label="`${$t('message.qt_moisture')}`" width="100"></el-table-column>
              <el-table-column  :label="`${$t('message.qt_manipulate')}`" width="260" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="getDetails(scope.row)">{{$t('message.qt_analysis')}}</el-button>
                  <el-button type="success" size="small" @click="getEditForm(scope.row,'distribution')">{{$t('message.qt_change')}}</el-button>
                  <el-button type="danger" size="small" @click="deleteData()">{{$t('message.qt_delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- 分布矩阵对应筛选 -->
        <ul class="selectIt" v-show="isShow" >
          <li>
            <el-button type="primary" size="small" @click="showAddForm()">{{$t('message.qt_addInformation')}}</el-button>
          </li>
          <li>
            <template>
              <el-select v-model="value" :placeholder="`${$t('message.qt_select')}`" size="mini" style="width: 100px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </template>
          </li>
          <li>
            <template>
              <span>{{$t('message.qt_onlineCount')}}</span>
              <el-input-number v-model="num"  :min="1"  label="描述文字" size="mini" style="width: 100px;"></el-input-number>
              <el-radio v-model="radio" label="1" selected style="margin-left: 10px;">{{$t('message.qt_online')}}</el-radio>
              <el-radio v-model="radio" label="2" style="margin-left: 10px;">{{$t('message.qt_offline')}}</el-radio>
            </template>
          </li>
          <li>
              <template>
                <span>{{$t('message.qt_time')}}</span>
                <el-date-picker size="mini"  type='daterange' range-separator="至" start-placeholder="开始日期" v-model="dateRange" end-placeholder="结束日期" style="width: 200px;"></el-date-picker>
              </template>
          </li>
          <li>
            <template>
              <el-button type="primary" size="small">{{$t('message.qt_Inquire')}}</el-button>
            </template>
          </li>
        </ul>
        <!-- 电荷矩阵对应筛选 -->
        <ul class="selectIt" v-show="!isShow">
          <li>
            <el-button type="primary" size="small" @click="showAddForm()">{{$t('message.qt_addInformation')}}2</el-button>
          </li>
          <li>
            <template>
              <el-select v-model="value" :placeholder="`${$t('message.qt_select')}`" size="mini" style="width: 100px;">
                <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </template>
          </li>
          <li>
            <template>
              <span>{{$t('message.qt_onlineCount')}}</span>
              <el-input-number v-model="num"  :min="1"  label="描述文字" size="mini" style="width: 100px;"></el-input-number>
              <el-radio v-model="radio" label="1" selected style="margin-left: 10px;">{{$t('message.qt_online')}}</el-radio>
              <el-radio v-model="radio" label="2" style="margin-left: 10px;">{{$t('message.qt_offline')}}</el-radio>
            </template>
          </li>
          <li>
              <template>
                <span>{{$t('message.qt_time')}}</span>
                <el-date-picker size="mini"  type='daterange' range-separator="至" start-placeholder="开始日期" v-model="dateRange2" end-placeholder="结束日期" style="width: 200px;"></el-date-picker>
              </template>
          </li>
          <li>
            <template>
              <el-button type="primary" size="small">{{$t('message.qt_Inquire')}}</el-button>
            </template>
          </li>
        </ul>
            <!-- 分页 -->
        <div class="pageBox" v-show="isShow">
          <el-pagination background :total="total" :page-size="pageSize" @current-change="currentChange"></el-pagination>
        </div>
        <div class="pageBox" v-show="!isShow">
          <el-pagination background :total="total" :page-size="pageSize" @current-change="currentChange"></el-pagination>
        </div>
      </div>
    </div>
    <!-- 隐藏表单 -->
    <add-form :visible="isShowAddForm" @close-form="closeAddForm()" @submit-form="submitAddForm()" @handle-form="updateTable()"></add-form>
    <details-form :visible="isShowDetails" :form="detailsList" @close-form="closeDetails()" ></details-form>
    <edit-form :editUrl="editUrl" :visible="isShowEdit" :form="editFormList" @close-form="closeEdit()"  @handle-form="updateTable()"></edit-form>
  </div>
</template>
<script>
import addForm from './addForm.vue'
import detailsForm from './detailsForm.vue'
import editForm from './editForm.vue'
export default ({
  name: 'raw-management',
  components: {
    addForm,
    detailsForm,
    editForm
  },
  props: [],
  data () {
    return {
      // 显示新增列表
      isShowAddForm: false,
      isShowDetails: false,
      isShowEdit: false,
      // 获取的物料分析数组
      detailsList: {},
      editFormList: {},
      // 不同类型新增的url
      editUrl: '',
      tableData: [],
      tableData2: [],
      activeTab: 'first',
      value: '',
      num: 1,
      radio: '1',
      // 下拉选框
      options: [
        {
          value: 'O',
          label: 'O'
        },
        {
          value: 'C',
          label: 'C'
        }
      ],
      // 右侧筛选框
      isShow: true,
      // 筛选时间
      dateRange: [new Date(2017, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dateRange2: [new Date(2017, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      // 分页
      curPage: 1,
      pageSize: 10,
      total: 1
    }
  },
  mounted () {
    this.updateTable()
  },
  methods: {
    // 删除表
    deleteData () {
      this.$confirm(this.$t('message.qt_isdelete')).then(() => {
        this.$message({
          type: 'success',
          message: this.$t('message.qt_success')
        })
      })
    },
    // 刷新表
    updateTable () {
      this.getMaterial()
      this.getDistribution()
    },
    // 获取最近几个小时的料批总览和物料信息
    getMaterial () {
      this.tableData = []
      this.$axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${process.env.API_HOST}furnace/batches/material/period/20170701000000/20170702000000?pageNum=${this.curPage}&pageSize=${this.pageSize}`,
        changeOrigin: true
      }).then(data => {
        var arr = data.data.data.rows
        this.total = data.data.data.total
        for (var i = 0; i < arr.length; i++) {
          var obj = {
            No: (this.curPage - 1) * this.pageSize + 1 + i,
            batchno: arr[i].batchIndex.batchno || '',
            endtime: arr[i].batchIndex.endtime || '',
            typ: arr[i].batchIndex.typ || '',
            serialno: arr[i].batchIndex.serialno || '',
            indexInDay: arr[i].indexInDay,
            brandcode: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].brandcode : '',
            weightset: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].weightset : '',
            weightdry: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].weightdry : '',
            weightwet: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].weightwet : '',
            moisture: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].moisture : ''
          }
          this.tableData.push(obj)
        }
      })
    },
    // 获取最近几个小时的料批总览和布料信息
    getDistribution () {
      this.tableData2 = []
      this.$axios({
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: `${process.env.API_HOST}furnace/batches/distribution/period/20170701000000/20170702000000?pageNum=1&pageSize=10`,
        changeOrigin: true
      }).then(data => {
        var arr = data.data.data.rows
        for (var i = 0; i < arr.length; i++) {
          var obj = {
            No: (this.curPage - 1) * this.pageSize + 1 + i,
            batchno: arr[i].batchIndex.batchno || '',
            endtime: arr[i].batchIndex.endtime || '',
            typ: arr[i].batchIndex.typ || '',
            serialno: arr[i].batchIndex.serialno || '',
            indexInDay: arr[i].indexInDay,
            brandcode: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].brandcode : '',
            weightset: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].weightset : '',
            weightdry: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].weightdry : '',
            weightwet: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].weightwet : '',
            moisture: arr[i].batchMaterials.length !== 0 ? arr[i].batchMaterials[0].moisture : ''
          }
          this.tableData2.push(obj)
        }
      })
    },
    // 获取物料分析详情
    getDetails (msg, num) {
      if (num === 1) {
        this.$axios.get(`${process.env.API_HOST}furnace/batch/material/${msg.batchno}`).then(data => {
          this.detailsList = data.data.data[0]
        })
        this.isShowDetails = true
      } else {
        this.$axios.get(`${process.env.API_HOST}furnace/batch/distribution/${msg.batchno}`).then(data => {
          this.detailsList = data.data.data[0]
        })
        this.isShowDetails = true
      }
    },
    // 物料{{$t('message.qt_change')}}表参数
    getEditForm (msg, url) {
      this.isShowEdit = true
      this.editFormList = msg
      this.editUrl = url
    },
    // 切换筛选框
    showMe (tab, event) {
      this.isShow = event.target.id === 'tab-first'
    },
    // 显示新增表单,并根据类型不同传递url
    showAddForm (url) {
      this.isShowAddForm = true
      this.addUrl = url
    },
    // 关闭表单
    closeAddForm () {
      this.isShowAddForm = false
    },
    closeDetails () {
      this.isShowDetails = false
    },
    closeEdit () {
      this.isShowEdit = false
    },
    // 分页
    currentChange (val) {
      this.curPage = val
      this.getMaterial()
    },
    // 提交新增表单
    submitAddForm () {
      this.$axios.post(`${process.env.API_HOST}furnace/batch`).then(data => {
      })
    }
  }
})
</script>
<style lang="scss" scoped>
  .page-content {
    padding: 0 20px;
    flex: auto;
    width: 100%;
    box-sizing: border-box;
   .page-title  {
      margin: 0 -40px;
      padding: 0 40px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 1px;
      border-bottom: 1px solid #c0c0c0;
    }
    .blast-table-wrap {
      margin-top: 20px;
      padding: 10px;
      box-shadow: 0 0 5px #666666;
      display: flex;
      justify-content: space-between;
      position: relative;
        div.tableBox{
          width: 100%;
          .selectIt{
            position: absolute;
            right: 20px;
            top: 10px;
              li{
                display: inline-block;
                margin-left: 10px;
              }
          }
        }
    }
  }
</style>
