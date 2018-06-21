<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.qt_quality')}}</h2>
    </div>
    <div class="page-content">
      <div class="blast-table-wrap">
        <!-- 筛选框 -->
        <el-row>
          <el-form :model="form" :inline="true">
            <el-form-item>
              <el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" size="mini"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">{{$t('message.qt_Inquire')}}</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <!-- 上方图表 -->
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <h3 style="width: 100%; text-align: center; margin-bottom: 10px;">按照实物量</h3>
            <el-table :data="tableData1" style="width: 100%" height="250">
              <el-table-column label="收入(kg/t)" header-align="center">
                <el-table-column label="物品" prop="Sname"></el-table-column>
                <el-table-column label="价值" prop="Svalue"></el-table-column>
              </el-table-column>
              <el-table-column label="支出(kg/t)" header-align="center">
                <el-table-column label="物品" prop="Zname"></el-table-column>
                <el-table-column label="价值" prop="Zvalue"></el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="16">
            <div ref="topLine" style="width: 100%; height: 300px;"></div>
          </el-col>
        </el-row>
        <!-- 下方图表 -->
        <el-row style="margin-top: 30px;">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <h3 style="width: 100%; text-align: center; margin-bottom: 10px;">按照吨铁</h3>
            <el-table :data="tableData1" style="width: 100%" height="250">
              <el-table-column label="收入(kg/t)" header-align="center">
                <el-table-column label="物品" prop="Sname"></el-table-column>
                <el-table-column label="价值" prop="Svalue"></el-table-column>
              </el-table-column>
              <el-table-column label="支出(kg/t)" header-align="center">
                <el-table-column label="物品" prop="Zname"></el-table-column>
                <el-table-column label="价值" prop="Zvalue"></el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :xs="24" :sm="12" :md="16" :lg="16">
            <div ref="bottomLine" style="width: 100%; height: 300px;"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'quality-banlance',
  data () {
    return {
      form: {
        time: null
      },
      tableData1: [
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        }
      ],
      tableData2: [
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        },
        {
          Sname: '银矿',
          Svalue: 500,
          Zname: '钻石',
          Zvalue: 1000
        }
      ]
    }
  },
  methods: {
    drawLine (ref) {
      let mychart = this.$echarts.init(ref)
      mychart.setOption({
        title: {
          text: '元素平衡',
          left: 'center'
        },
        legend: {
          data: ['输入值', '实际值'],
          top: '10%'
        },
        grid: {
          top: '20%',
          bottom: '10%',
          left: '10%',
          right: '8%'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: {
          type: 'inside'
        },
        xAxis: [
          {
            type: 'category',
            data: ['Fe', 'Ca', 'Mg', 'Fi', 'Ne'],
            boundaryGap: true
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '输入值',
            type: 'bar',
            barGap: 0,
            label: {
              show: true,
              color: 'black',
              position: ['38%', '-20']
            },
            data: [80, 60, 90, 88, 45]
          },
          {
            name: '实际值',
            type: 'bar',
            label: {
              show: true,
              color: 'black',
              position: ['38%', '-20']
            },
            data: [40, 50, 78, 69, 30]
          }
        ]
      })
    }
  },
  mounted () {
    this.drawLine(this.$refs.topLine)
    this.drawLine(this.$refs.bottomLine)
  }
})
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    display: flex;
    flex: auto;
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
      display: flex;
      box-sizing: border-box;
      flex: auto;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      padding-top: 0;
      .blast-table-wrap {
        margin-top: 20px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 5px #666666;
        position: relative;
      }
    }
  }
</style>
