<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.qt_MinFuelRatio')}}</h2>
    </div>
    <div class="page-content">
      <div class="blast-table-wrap">
        <!-- 上方时间筛选 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form :model="form" :inline="true">
              <el-form-item>
                <el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini">{{$t('message.qt_Inquire')}}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <!-- 图表 -->
        <el-row :gutter="20">
          <!-- 左上图表 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-row style="box-shadow: 0 0 5px #999999;">
              <el-col :span="24">
                <el-form :model="radioForm" :inline="true" :rules="rules" style="margin-left: 10px;">
                  <el-form-item label="当前实际燃料比：" prop="nowRadio">
                    <el-input v-model="radioForm.nowRadio" size="mini" style="width: 100px"></el-input>
                  </el-form-item>
                  <el-form-item label="最小燃料比: " prop="minRadio">
                    <el-input v-model="radioForm.minRadio" size="mini" style="width: 100px"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="24">
                <div ref="firstChart" class="first-chart"></div>
              </el-col>
            </el-row>
          </el-col>
          <!-- 右上图表 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div style="width: 100%; box-shadow: 0 0 5px #999999;">
              <div class="second-chart" ref="secondChart"></div>
              <el-form :model="form" :inline="true" style="margin-left: 10px;">
                <el-form-item>
                  <el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" size="mini"></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini">{{$t('message.qt_Inquire')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 20px;">
          <!-- 左下图表 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div class="tableBox" style="width: 100%; box-shadow: 0 0 5px #999999;">
                <h3 style="width: 100%; text-align: center; margin-bottom: 10px;">各因素对燃料比的影响计算</h3>
                <el-table :data="tableData" style="width: 98%; margin: 0 auto;" height="300" border>
                  <el-table-column label="影响因素" prop="case"></el-table-column>
                  <el-table-column label="变化量" prop="changeNum"></el-table-column>
                  <el-table-column label="燃料比" prop="oilRadio"></el-table-column>
                </el-table>
            </div>
          </el-col>
          <!-- 右下图表 -->
          <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <div class="third-chart" ref="thirdChart"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'min-radio',
  data () {
    return {
      form: {
        time: null
      },
      radioForm: {
        nowRadio: null,
        minRadio: null
      },
      rules: {
        nowRadio: [

        ],
        minRadio: [

        ]
      },
      tableData: [
        {
          case: '风温',
          changeNum: '+10℃',
          oilRadio: '燃料比'
        },
        {
          case: '铁水Si',
          changeNum: '-0.1℃',
          oilRadio: '燃料比'
        }
      ]
    }
  },
  methods: {
    drawBar () {
      let mychart = this.$echarts.init(this.$refs.secondChart)
      mychart.setOption({
        title: {
          text: '每日实际燃料比喻理论最小燃料对比',
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
            data: ['2018-5-20', '2018-5-20', '2018-5-20', '2018-5-20', '2018-5-20'],
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
          }
        ]
      })
    },
    drawLine () {
      let mychart = this.$echarts.init(this.$refs.firstChart)
      mychart.setOption({
        title: {
          text: '每日实际燃料比喻理论最小燃料对比',
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
            data: ['2018-5-20', '2018-5-20', '2018-5-20', '2018-5-20', '2018-5-20'],
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
            type: 'line',
            barGap: 0,
            data: [80, 60, 90, 88, 45]
          }
        ]
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawBar()
      this.drawLine()
    })
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
        .first-chart{
          width: 100%;
          height: 250px;
        }
        .second-chart{
          width: 100%;
          height: 250px;
        }
        .third-chart{
          width: 100%;
          height: 336px;
          box-shadow: 0 0 5px #999999;
        }
      }
    }
  }
</style>
