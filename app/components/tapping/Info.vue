<template>
   <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_tappingInfo')}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <info-line-chart></info-line-chart>
        <info-scatter-chart></info-scatter-chart>
      </div>
    </div>
  </div>
</template>

<script>
import InfoLineChart from './InfoLineChart'
import InfoScatterChart from './InfoScatterChart'

export default {
  name: 'tapping-info',
  components: {
    InfoLineChart,
    InfoScatterChart
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  flex: auto;
  display: flex;
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
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    .page-shadow-content {
      flex: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
