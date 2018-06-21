<template>
  <div class="chart-box">
    <div class="sktech-map-wrap">
      <img src="" alt="">
    </div>
    <div class="chart-container"></div>
  </div>
</template>

<script>
export default {
  name: 'furnace-wall-heat-map-chart',
  props: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.chart-box {
  flex: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 1160px;
  height: 437px;
  border: 1px solid #979797;
  box-sizing: border-box;
  .sktech-map-wrap {
    flex: none;
    img {
      display: inline-block;
      width: 107px;
      height: 434px;
    }
  }
}
</style>
