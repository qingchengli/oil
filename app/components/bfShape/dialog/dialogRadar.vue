<template>
  <el-dialog :visible="visibleRadar" @close="closeMe">
    <div class="radar-box" ref="radarBox"></div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'dialog-radar',
  props: {
    visibleRadar: Boolean
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
  computed: {
    language () {
      return this.$store.state.lang.language
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
          text: this.$t('message.qt_peripheralDirection')
        },
        tooltip: {},
        grid: {
          left: '8%',
          right: '8%',
          bottom: '5%',
          top: '5%'
        },
        radar: {
          indicator: [
            { name: 'B3', max: 6000 },
            { name: 'B2', max: 7000 },
            { name: 'hot', max: 5000 },
            { name: 'hot', max: 5000 },
            { name: 'hot', max: 5000 }
          ]
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [4300, 5000, 3200, 2200, 2500]
              },
              {
                value: [2000, 4500, 2600, 1800, 2300]
              }
            ]
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
