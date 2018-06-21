<template>
  <div class="page-content">
    <h2 class="page-title">{{$t('message.qt_RwManagement')}}</h2>
    <div class="blast-table-wrap">
      <div class="flex-box">
        <div class="btn-box">
          <el-button type="primary" plain size="small" style="margin-left: 20px;" @click="openAddForm">{{$t('message.qt_addInformation') + $t('message.qt_Rw')}}</el-button>
        </div>
        <div class="form-box">
          <el-form :model="RWform" :inline="true" size="small" style="display:flex;">
            <el-form-item :label="$t('message.qt_time')" v-model="RWform.time">
              <el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" style="width: 300px"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">{{$t('message.qt_Inquire')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-row>
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#3AC9CD',color:'#fff'}" border>
          <el-table-column prop="begin" :label="`${$t('message.qt_begin')}`"></el-table-column>
          <el-table-column prop="end" :label="`${$t('message.qt_endTime')}`"></el-table-column>
          <el-table-column prop="long" :label="`${$t('message.qt_duration')}`"></el-table-column>
          <el-table-column prop="state" :label="`${$t('message.qt_state')}`"></el-table-column>
          <el-table-column prop="why" :label="`${$t('message.qt_reason')}`"></el-table-column>
          <el-table-column prop="pro" :label="`${$t('message.qt_ImpactPro')}`"></el-table-column>
          <el-table-column  :label="`${$t('message.qt_manipulate')}`" width="260" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="mini" class="action-edit-button" @click="openEditForm(scope.row)">{{$t('message.qt_change')}}</el-button>
              <el-button type="text" size="mini" class="action-delete-button">{{$t('message.qt_delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 20px; padding-bottom: 10px; border-bottom: 1px solid #999">
        <el-pagination background :total="10"></el-pagination>
      </el-row>
      <div class="echarts-box">
        <div class="pro-cal" ref="proCal"></div>
        <div class="time-cal" ref="timeCal"></div>
      </div>
    </div>
    <rw-add-form :visible="addVisible" @close-form="closeAddForm"></rw-add-form>
    <rw-edit-form :visible="editVisible" @close-form="closeEditForm" :form="editForm"></rw-edit-form>
  </div>
</template>
<script>
import RwAddForm from './RwAddForm.vue'
import RwEditForm from './RwEditForm.vue'
export default ({
  name: 'rw-management',
  components: {
    RwAddForm,
    RwEditForm
  },
  data () {
    return {
      addVisible: false,
      editVisible: false,
      editForm: {},
      RWform: {
        time: null
      },
      timeRange: '',
      tableData: [
        {
          begin: '1',
          end: '1',
          duration: '1',
          state: '1',
          reason: '1',
          impact: '1'
        }
      ]
    }
  },
  mounted () {
    // 模拟数据
    let obj1 = {
      ref: this.$refs.proCal,
      name: '减风影响产量统计图',
      title: ['一号炉子', '二号炉子', '三号炉子'],
      data: [
        {value: 225, name: '一号炉子'},
        {value: 440, name: '二号炉子'},
        {value: 222, name: '三号炉子'},
        {value: 330, name: '四号炉子'},
        {value: 128, name: '五号炉子'}
      ]
    }
    let obj2 = {
      ref: this.$refs.timeCal,
      name: '减风影响产量统计图',
      titles: ['一号炉子', '二号炉子', '三号炉子', '四号炉子', '五号炉子'],
      data: [
        {value: 338, name: '一号炉子'},
        {value: 264, name: '二号炉子'},
        {value: 323, name: '三号炉子'},
        {value: 164, name: '四号炉子'},
        {value: 387, name: '五号炉子'}
      ]
    }
    this.drawPie(obj1)
    this.drawPie(obj2)
  },
  methods: {
    // 打开添加表
    openAddForm () {
      this.addVisible = true
    },
    openEditForm (row) {
      this.editVisible = true
      this.editForm = row
    },
    // 关闭表格
    closeAddForm () {
      this.addVisible = false
    },
    closeEditForm () {
      this.editVisible = false
    },
    // 绘制饼状图
    drawPie (obj) {
      let echart = this.$echarts.init(obj.ref)
      let option = {
        title: {
          text: obj.name,
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: obj.titles,
          itemWidth: 16,
          itemHeight: 10
        },
        series: [
          {
            name: obj.item,
            type: 'pie',
            roseType: 'radius',
            radius: '60%',
            center: ['50%', '50%'],
            labelLine: {
              length: 5,
              length2: 5
            },
            data: obj.data
          }
        ]
      }
      echart.setOption(option)
    }
  }
})
</script>
<style lang="scss" scoped>
  .page-content {
    padding: 0 20px;
    flex: auto;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
   .page-title  {
      margin: 0 -40px;
      padding: 0 40px;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 1px;
      border-bottom: 1px solid #c0c0c0;
    }
    .blast-table-wrap {
      margin-top: 20px;
      padding: 10px;
      box-shadow: 0 0 5px #666666;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      .flex-box{
        display: flex;
        flex: none;
        margin-top: 10px;
        width: 100%;
        justify-content: flex-start;
        .form-box{
          display: flex;
          flex: none;
          padding-left: 30px;
        }
      }
      .echarts-box{
        display: flex;
        margin-top: 50px;
        flex: none;
        flex-direction: row;
        justify-content: space-between;
        div{
          width: 400px;
          height: 400px;
        }
        .pro-cal{
          margin-left: 150px;
        }
        .time-cal{
          margin-right: 150px;
        }
      }
    }
  }
</style>
