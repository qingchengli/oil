<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_heatRule')}}</h2>
    </div>
    <div class="page-content">
      <div class="blast-table-wrap">
        <!-- 上方筛选框 -->
        <el-row :gutter="10" style="width: 100%">
          <!-- 左侧硅调节 -->
          <el-col :span="10">
            <el-form :inline="true" :model="SiForm" class="demo-form-inline">
              <el-form-item label="目标铁水si含量设定值：" >
                <el-input v-model="SiForm.value" size="mini"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini">确认</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <!-- 右侧时间查询 -->
          <el-col :span="12">
            <el-form :inline="true" :model="timeForm">
              <el-form-item label="时间" >
                <el-date-picker v-model="timeForm.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" size="mini" style="width: 300px;"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <!-- 下方图表 -->
        <el-row :gutter="20" style="width: 100%">
          <el-col :xs="24" :sm="24" :md="10" :lg="10">
            <el-form :model="SiDetailsForm" style="box-shadow: 0 0 5px #999999; padding: 10px; width: 80%; margin: 50px auto 0;" label-position="left">
              <el-form-item>
                <el-col :span="14">
                  当前铁水Si含量:
                </el-col>
                <el-col :span="10">
                  <el-input style="width: 100%;" size="mini" v-model="SiDetailsForm.nowSi"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="14">
                  未来<el-input-number style="width: 100px;margin: 0 10px" size="mini" v-model="SiDetailsForm.hour" controls-position="right"></el-input-number>小时铁水量:
                </el-col>
                <el-col :span="10">
                  <el-input style="width: 100%;" size="mini" v-model="SiDetailsForm.hourFe"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="14">
                  当前喷铁量：
                </el-col>
                <el-col :span="10">
                  <el-input style="width: 100%;" size="mini" v-model="SiDetailsForm.nowFe"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="14">
                  建议喷煤量：
                </el-col>
                <el-col :span="10">
                  <el-input style="width: 100%;" size="mini" v-model="SiDetailsForm.adviseFe"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :xs="24" :sm="24" :md="14" :lg="14" style="margin-bottom: 30px;">
            <div class="si-chart" ref="siChart"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="10" :lg="10">
            <div class="wave-chart" ref="waveChart"></div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="14" :lg="14">
            <div class="heat-chart" ref="heatChart"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'heat-rule',
  data () {
    return {
      SiForm: {
        value: null
      },
      timeForm: {
        startTime: null,
        endTime: null
      },
      SiDetailsForm: {
        nowSi: null,
        hour: null,
        hourFe: null,
        nowFe: null,
        adviseFe: null
      },
      // 模拟可删除
      // hot air flow
      dataAir: [],
      // gas
      dataGas: [],
      // hot air temp
      dataTemp: [],
      // total pressure difference
      dataPre: [],
      // hot air pressure
      dataAirPre: [],
      // K
      dataK: [],
      // rodline1
      dataRod1: [],
      // rodline2
      dataRod2: [],
      time: []
    }
  },
  methods: {
    createData (n, m) {
      var newData = (parseFloat(Math.random() * n + m)).toFixed(4)
      return newData
    },
    createTime (newTime) {
      newTime = newTime.toLocaleTimeString()
      return newTime
    },
    drawLine (ref) {
      let myChart = this.$echarts.init(ref)
      myChart.setOption({
        title: {
          text: '鼓风参数图',
          textStyle: {
            fontSize: 14
          },
          left: 'center',
          top: 5
        },
        grid: {
          left: '15%',
          right: '15%',
          top: '25%',
          bottom: '6%',
          containLabel: true
        },
        legend: {
          data: ['Hot air Flow', 'Bosh Gas Value', 'Hot Air Tempearture', 'total pressure difference', 'hot air pressure', 'K', 'Rodline1', 'Rodline2'],
          top: 30
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            start: 0,
            end: 100,
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }, {
            type: 'inside',
            realtime: true
          }
        ],
        yAxis: [
          {
            name: 'Nm3/h',
            type: 'value',
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            axisLabel: {
              rotate: 90
            },
            position: 'left',
            nameLocation: 'middle',
            nameRote: 90,
            nameGap: 25,
            nameTextStyle: {
              fontWeight: 'bold'
            }
          }, {
            name: 'm3/min',
            type: 'value',
            axisLabel: {
              rotate: 90
            },
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            position: 'left',
            nameLocation: 'middle',
            nameRote: 90,
            nameGap: 25,
            offset: 50,
            nameTextStyle: {
              fontWeight: 'bold'
            }
          }, {
            name: 'Deg C',
            type: 'value',
            axisLabel: {
              rotate: 90
            },
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            position: 'left',
            nameLocation: 'middle',
            nameRote: 90,
            nameGap: 25,
            offset: 100,
            nameTextStyle: {
              fontWeight: 'bold'
            }
          }, {
            name: 'kPa',
            type: 'value',
            axisLabel: {
              rotate: -90
            },
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            position: 'right',
            nameLocation: 'middle',
            nameRote: -90,
            nameGap: 25,
            nameTextStyle: {
              fontWeight: 'bold'
            }
          }, {
            name: 'Kpa',
            type: 'value',
            axisLabel: {
              rotate: -90
            },
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            position: 'right',
            nameLocation: 'middle',
            nameRote: -90,
            nameGap: 25,
            offset: 50,
            nameTextStyle: {
              fontWeight: 'bold'
            }
          }, {
            name: 'm',
            type: 'value',
            axisLabel: {
              rotate: 90
            },
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            position: 'left',
            nameLocation: 'middle',
            nameRote: 90,
            nameGap: 25,
            offset: 150,
            nameTextStyle: {
              fontWeight: 'bold'
            }
          }, {
            name: '-',
            type: 'value',
            axisLabel: {
              rotate: -90
            },
            splitLine: {
              show: false
            },
            boundaryGap: [0, '100%'],
            position: 'right',
            nameLocation: 'middle',
            nameRote: -90,
            nameGap: 25,
            offset: 100,
            nameTextStyle: {
              fontWeight: 'bold'
            },
            inverse: true
          }
        ],
        xAxis: [
          {
            splitLine: {
              show: false
            },
            type: 'category',
            boundaryGap: false,
            data: this.time
          }
        ],
        series: [
          {
            name: 'Hot air Flow',
            type: 'line',
            yAxisIndex: [0],
            showSymbol: false,
            data: this.dataAir
          }, {
            name: 'Bosh Gas Value',
            type: 'line',
            yAxisIndex: [1],
            showSymbol: false,
            data: this.dataGas
          }, {
            name: 'Hot Air Tempearture',
            type: 'line',
            yAxisIndex: [2],
            showSymbol: false,
            data: this.dataTemp
          }, {
            name: 'total pressure difference',
            type: 'line',
            yAxisIndex: [3],
            showSymbol: false,
            data: this.dataPre
          }, {
            name: 'hot air pressure',
            type: 'line',
            yAxisIndex: [4],
            showSymbol: false,
            data: this.dataAirPre
          }, {
            name: 'K',
            type: 'line',
            yAxisIndex: [5],
            showSymbol: false,
            data: this.dataK
          }, {
            name: 'Rodline1',
            type: 'line',
            yAxisIndex: [6],
            showSymbol: false,
            data: this.dataRod1
          }, {
            name: 'Rodline2',
            type: 'line',
            yAxisIndex: [6],
            showSymbol: false,
            data: this.dataRod2
          }
        ]
      })
    },
    drawRect () {
      let myChart = this.$echarts.init(this.$refs.waveChart)
      myChart.setOption({
        title: {
          text: '铁水Si含量日波动情况',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '15%',
          bottom: '6%',
          containLabel: true
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            realtime: true
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: ['2018-5-2', '2018-5-3', '2018-5-4', '2018-5-5', '2018-5-6']
          }
        ],
        yAxis: [
          {
            name: '%',
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Si',
            type: 'bar',
            data: [20, 30, 15, 22, 38]
          }
        ]
      })
    }
  },
  mounted () {
    for (var i = 1, newTime = new Date(); i < 200; i++) {
      this.dataAir.push(this.createData(200, 6000))
      this.dataGas.push(this.createData(200, 8000))
      this.dataTemp.push(this.createData(50, 1000))
      this.dataPre.push(this.createData(100, 100))
      this.dataAirPre.push(this.createData(100, 300))
      this.dataK.push(this.createData(1, 2))
      this.dataRod1.push(this.createData(-0.5, -2))
      this.dataRod2.push(this.createData(-0.5, -2))
      this.time.push(this.createTime(newTime))
      newTime = new Date(newTime + 6000)
    }
    this.drawLine(this.$refs.siChart)
    this.drawLine(this.$refs.heatChart)
    this.drawRect()
  }
}
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
      .si-chart{
        width: 100%;
        height: 400px;
        box-shadow: 0 0 5px #999999;
      }
      .wave-chart{
        width: 100%;
        height: 400px;
        box-shadow: 0 0 5px #999999;
      }
      .heat-chart{
        width: 100%;
        height: 400px;
        box-shadow: 0 0 5px #999999;
      }
    }
  }
}
</style>
