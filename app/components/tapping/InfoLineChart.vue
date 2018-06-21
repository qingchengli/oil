<template>
  <div class="chart-content" ref="chart"></div>
</template>

<script>
export default {
  name: 'info-line-chart',
  props: {
    data: Array,
    show: Boolean
  },
  data () {
    return {
      myChart: null,
      chartOption: null
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
        legend: {
          data: ['1号炉口出铁速度', '2号炉口出铁速度', '3号炉口出铁速度', '4号炉口出铁速度']
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          interval: 2000,
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            name: '炉缸残余铁量(t)',
            type: 'value',
            min: 0,
            max: 2500,
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          {
            name: '出铁速度',
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '1号炉口出铁速度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: []
          },
          {
            name: '2号炉口出铁速度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: []
          },
          {
            name: '3号炉口出铁速度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: []
          },
          {
            name: '4号炉口出铁速度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: []
          }
        ]
      }
      // this.setChart()
      setInterval(() => {
        this.formatChartData()
      }, 2000)
    },
    randomData () {

    },
    formatChartData () {
      let data = this.chartOption.series

      data.forEach((item) => {
        if (item.data.length >= 20) {
          item.data.shift()
        }
        item.data.push({
          name: this.$moment().format('YYYY/MM/DD HH:mm:ss'),
          value: [
            this.$moment().format('YYYY/MM/DD HH:mm:ss'),
            Math.round(Math.random() * 1000 + Math.random() * 21 - 10)
          ]
        })
      })

      this.setChart()
    },
    setChart () {
      this.myChart.hideLoading()
      this.myChart.setOption(this.chartOption)
    }
  },
  mounted () {
    this.chartInit()
  }
}
</script>

<style lang="scss" scoped>
.chart-content {
  width: 100%;
  height: 280px;
}
</style>
