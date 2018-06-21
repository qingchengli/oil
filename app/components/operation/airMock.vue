<template>
  <div class="tabBox">
    <el-row>
      <el-form :model="selectForm" size="mini" :inline="true">
        <el-form-item>
          <el-radio-group v-model="selectForm.isOnLine">
            <el-radio label="在线"></el-radio>
            <el-radio label="离线"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="时间" style="margin-left: 20px;">
            <el-date-picker v-model="selectForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="10" :lg="10">
        <el-row>
          <el-col :span="20" :offset="4">
            <el-form :model="numberForm" size="mini" label-position="left" label-width="220px">
              <el-form-item label="当前回旋区长度：">
                <el-input v-model="numberForm.length" style="width: 120px;"></el-input>
              </el-form-item>
              <el-form-item label="建议回旋区长度占比：">
                <el-input v-model="numberForm.adviseLength" style="width: 120px;"></el-input>
              </el-form-item>
              <el-form-item label="当前回旋当前回旋区长度占比：">
                <el-input v-model="numberForm.nowLength" style="width: 120px;"></el-input>
              </el-form-item>
              <el-form-item label="当前回旋区面积占比：">
                <el-input v-model="numberForm.acreage" style="width: 120px;"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="24">
            <div class="radar-chart" ref="radarChart"></div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="14">
        <div class="top-chart" ref="topChart"></div>
        <div class="middle-chart" ref="middleChart"></div>
        <div class="bottom-chart" ref="bottomChart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default ({
  name: 'air-mock',
  props: {
    test: Number
  },
  data () {
    return {
      selectForm: {
        isOnLine: '在线',
        time: null
      },
      numberForm: {
        length: null,
        adviseLength: null,
        nowLength: null,
        acreage: null
      }
    }
  },
  methods: {
    drawRadar () {
      let mychart = this.$echarts.init(this.$refs.radarChart)
      mychart.setOption({
        grid: {
          top: '15%',
          bottom: '10%',
          left: '10%',
          right: '10%'
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            {name: '1', max: 6500},
            {name: '2', max: 16000},
            {name: '3', max: 30000},
            {name: '4', max: 38000},
            {name: '5', max: 52000},
            {name: '6', max: 25000}
          ]
        },
        series: [
          {
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
              }
            ]
          }
        ]
      })
    },
    drawLine (obj) {
      var mychart = this.$echarts.init(obj.ele)
      mychart.setOption({
        title: {
          text: obj.title,
          left: 'center',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '15%',
          bottom: '20%',
          left: '8%',
          right: '8%'
        },
        dataZoom: {
          type: 'inside',
          realtime: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['10:20', '10:30', '10.40']
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'val',
            type: 'line',
            data: [20, 30, 5]
          }
        ]
      })
    }
  },
  mounted () {
    this.drawRadar()
    this.drawLine({ele: this.$refs.topChart, title: '回旋区长度'})
    this.drawLine({ele: this.$refs.middleChart, title: '鼓风动能、风速'})
    this.drawLine({ele: this.$refs.bottomChart, title: '理论燃烧温度'})
  }
})
</script>

<style lang="scss" scoped>
.tabBox {
  width: 100%;
  .radar-chart{
    width: 100%;
    height: 422px;
    margin-left: 5px;
    margin-bottom: 5px;
    box-shadow: 0 0 5px #999999;
  }
  .top-chart {
    width: 100%;
    height: 190px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px #999999;
  }
  .middle-chart {
    width: 100%;
    height: 190px;
    margin-bottom: 20px;
    box-shadow: 0 0 5px #999999;
  }
  .bottom-chart {
    width: 100%;
    height: 190px;
    box-shadow: 0 0 5px #999999;
  }
}
</style>
