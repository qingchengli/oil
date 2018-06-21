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
            type: 'category',
            data: ['1号', '2号', '3号', '4号'],
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '出炉时间',
            type: 'scatter',
            itemStyle: {
              normal: {
                color: '#C23531'
              }
            },
            symbol: 'rect',
            data: []
          },
          {
            name: '出渣时间',
            type: 'scatter',
            itemStyle: {
              normal: {
                color: '#2F4554'
              }
            },
            symbol: 'rect',
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
            Math.round(Math.random() * 3)
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
