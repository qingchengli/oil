<template>
  <div class="container">
    <!-- 筛选框 -->
    <el-row>
      <ul class="radio-box">
        <li>
          <template>
            <el-radio v-model="radio" label="1">{{$t('message.qt_online')}}</el-radio>
            <el-radio v-model="radio" label="2">{{$t('message.qt_offline')}}</el-radio>
          </template>
        </li>
        <li>
          <template>
              <el-date-picker v-model="dateTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" style="width: 200px"></el-date-picker>
          </template>
        </li>
        <li>
          <el-button type="primary" size="small">{{$t('message.qt_Inquire')}}</el-button>
        </li>
      </ul>
    </el-row>
    <!-- 旭日图 & 折线图 -->
    <el-row>
      <!-- 左侧按钮组 -->
      <el-col :xs="12" :sm="12" :md="2" :lg="2">
        <ul style="margin-top: 30px;">
          <li v-for="(item,index) in buttonList" :key="item.name">
            <el-radio v-model="radio2" :label="index">{{item.name}}</el-radio>
          </li>
        </ul>
      </el-col>
      <!-- 旭日图 -->
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <div class="bar-box" ref="barBox"></div>
      </el-col>
      <!-- 折线图 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <!-- 上方按钮组 -->
        <el-row style="text-align: center">
          <el-radio v-model="radio3" label="1">{{$t('message.qt_slagThickness')}}</el-radio>
          <el-radio v-model="radio3" label="2">{{$t('message.qt_surfaceTemperature')}}</el-radio>
        </el-row>
        <el-row>
          <div class="line-box" ref="lineBox"></div>
        </el-row>
      </el-col>
    </el-row>
    <!-- 下方热力云图 -->
    <el-row :gutter="30">
      <el-col :span="3">
        <img src="../../assets/img/炉身图.png" alt="占位图">
      </el-col>
      <el-col :span="20">
        <div class="heat-box" ref="heatBox"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default ({
  name: 'slag-skull',
  props: {
    lineDataSlag: Array,
    activeName: String
  },
  mounted () {
    this.drawPie()
    this.drawLine()
  },
  data () {
    return {
      radio: '1',
      radio2: '1',
      radio3: '1',
      dateTime: '',
      buttonList: [
        {
          name: 'S2'
        },
        {
          name: 'S1'
        },
        {
          name: 'B3'
        },
        {
          name: 'B2'
        }
      ]
    }
  },
  computed: {
    language () {
      return this.$store.state.lang.language
    }
  },
  watch: {
    activeName () {
      this.drawLine()
      this.drawPie()
    },
    lineDataSlag () {
      this.drawLine()
    },
    language () {
      this.drawLine()
    }
  },
  methods: {
    drawPie () {
      if (this.activeName === 'third') {
        let mychart = this.$echarts.init(this.$refs.barBox)
        mychart.setOption({
          grid: {
            top: '5%',
            bottom: '5%',
            left: '15%',
            right: '2%'
          },
          series: [
            {
              name: 'Line 1',
              type: 'pie',
              clockWise: false,
              radius: [0, 70],
              center: ['50%', '50%'],
              hoverAnimation: false,
              itemStyle: {
                normal: {
                  color: '#FEDAB8'
                }
              },
              startAngle: 90,
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            },
            {
              name: 'Line 2',
              type: 'pie',
              clockWise: false,
              radius: [70, 80],
              center: ['50%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              itemStyle: {
                normal: {
                  color: '#A52B29'
                }
              },
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            },
            {
              name: 'Line 3',
              type: 'pie',
              clockWise: false,
              radius: [80, 85],
              center: ['50%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              itemStyle: {
                normal: {
                  color: '#FDF804'
                }
              },
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            },
            {
              name: 'Line 3',
              type: 'pie',
              clockWise: false,
              radius: [85, 90],
              center: ['50%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              itemStyle: {
                normal: {
                  color: '#FFD600'
                }
              },
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            },
            {
              name: 'Line 4',
              type: 'pie',
              clockWise: false,
              radius: [90, 105],
              center: ['50%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              itemStyle: {
                normal: {
                  color: '#FEA400'
                }
              },
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            },
            {
              name: 'Line 5',
              type: 'pie',
              clockWise: false,
              radius: [105, 110],
              center: ['50%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              itemStyle: {
                normal: {
                  color: '#AEA79B'
                }
              },
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            },
            {
              name: 'Line 6',
              type: 'pie',
              clockWise: false,
              radius: [110, 120],
              center: ['50%', '50%'],
              hoverAnimation: false,
              startAngle: 90,
              itemStyle: {
                normal: {
                  color: '#7F7F7F'
                }
              },
              label: {
                show: false
              },
              data: [
                {
                  value: 54.6,
                  name: '四级匹配度'
                }
              ]
            }
          ]
        })
      } else {
        this.$echarts.dispose(this.$refs.barBox)
      }
    },
    // 绘制折线图
    drawLine () {
      if (this.activeName === 'third') {
        let mychart = this.$echarts.init(this.$refs.lineBox)
        mychart.setOption({
          title: {
            text: this.$t('message.qt_double_trend'),
            textStyle: {
              fontSize: '14px'
            },
            left: 'center',
            top: 5
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top: '8%',
            bottom: '12%',
            left: '10%',
            rigth: '2%'
          },
          xAxis: [
            {
              type: 'category',
              data: [1, 2, 3],
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'line',
              data: [1, 2, 3]
            }
          ]
        })
      } else {
        this.$echarts.dispose(this.$refs.lineBox)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
  .container{
    padding-bottom: 20px;
    flex: auto;
    .bar-box{
      width: 300px;
      height: 300px;
    }
    .line-box{
      width: 800px;
      height: 300px;
      margin: 0 auto;
    }
    img{
      width: 100%;
      height: 270px;
    }
    .heat-box{
      width: 1000px;
      height: 270px;
      box-shadow: 0 0 5px #666666;
      margin: 0 auto;
    }
  }
  .container ul{
    margin-left: 20px
  }
  .container ul li:not(:last-child){
    margin-bottom: 40px;
  }
  .container ul.radio-box li{
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 20px;
  }
</style>
