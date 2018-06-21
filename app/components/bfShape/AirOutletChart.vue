<template>
  <div class="chart-content" ref="chart"></div>
</template>

<script>
export default {
  name: 'air-outlet-chart',
  props: {
    data: Array,
    type: String,
    show: Boolean
  },
  data () {
    return {
      myChart: null,
      chartOption: null
    }
  },
  watch: {
    show (val) {
      val ? (() => {
        this.$nextTick(() => {
          this.chartInit()
          this.data.length !== 0 && this.formatChartData()
        })
      })() : this.destoryChart()
    }
  },
  methods: {
    chartInit () {
      var dom = this.$refs.chart
      this.myChart = this.$echarts.init(dom)
      this.myChart.showLoading()
      this.getChartData()
    },
    getChartData () {
      this.chartOption = {
        color: ['#1989fa'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 0
        },
        xAxis: [
          {
            show: false,
            type: 'category',
            data: (() => {
              var len = 42
              var res = []
              while (len--) {
                res.unshift(len + 1)
              }
              return res
            })(),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              fontSize: 8
            },
            barGap: 3,
            data: (() => {
              var len = 42
              var res = []
              while (len--) {
                res.unshift(0)
              }
              return res
            })()
          }
        ]
      }
    },
    formatChartData () {
      let data = this.data
      this.chartOption.xAxis.data = data.map((item) => {
        return item.id
      })
      this.chartOption.series[0].data = data.map((item) => {
        return item[this.type]
      })
      this.myChart.hideLoading()
      this.myChart.setOption(this.chartOption)
    },
    destoryChart () {
      this.$echarts.dispose(this.myChart)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.chart-content {
  width: 100%;
  height: 100%;
}
</style>
