<template>
  <el-dialog :visible="visibleRadar" @close="closeMe">
    <div class="radar-box" ref="radarBox"></div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'dialog-line',
  props: {
    visibleRadar: Boolean
  },
  computed: {
    language () {
      return this.$store.state.lang.language
    }
  },
  watch: {
    visibleRadar (val) {
      // if (this.visibleRadar === true) {
      //   this.drawRadar()
      // } else {
      //   this.$echarts.dispose(this.$refs.radarBox)
      // }

      val ? this.$nextTick(() => {
        this.drawRadar()
      }) : this.$echarts.dispose(this.$refs.radarBox)
    },
    language () {
      this.drawLine()
    }
  },
  mounted () {
    // if (this.$refs.radarBox) {
    //   setTimeout(() => {
    //     this.drawRadar()
    //   }, 1000);
    // }
  },
  methods: {
    closeMe () {
      this.$emit('close-form')
    },
    drawRadar () {
      let mychart = this.$echarts.init(this.$refs.radarBox)
      mychart.setOption({
        title: {
          text: this.$t('message.qt_sectionTrend')
        },
        tooltip: {},
        grid: {
          left: '8%',
          right: '8%',
          bottom: '5%',
          top: '15%'
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
            name: '热负荷',
            type: 'line',
            data: [1, 2, 3]
          }
        ]
      })
    }
  }
})
</script>
<style lang="scss" scoped>
  .radar-box{
    width: 500px;
    height: 400px;
    margin: 0 auto;
  }
</style>
