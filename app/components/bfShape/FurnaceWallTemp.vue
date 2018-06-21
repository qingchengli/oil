<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_furnaceWallTemp')}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <el-tabs class="furnaceWall-tabs grow-tabs" v-model="activeName">
          <el-tab-pane :label="`${$t('message.title_furnaceWallHeatMap')}`" name="first">
            <furnace-wall-heat-map :show-chart="defaultTab==='first'"></furnace-wall-heat-map>
          </el-tab-pane>
          <el-tab-pane :label="`${$t('message.title_slagCrustMonitor')}`" name="second">
            <slag-crust-monitor :show-chart="defaultTab==='second'"></slag-crust-monitor>
          </el-tab-pane>
          <el-tab-pane :label="`${$t('message.qt_monitoringSystem')}`" name="third">
            <slag-skull :lineData="lineDataSlag" :active-name="activeName"></slag-skull>
          </el-tab-pane>
          <el-tab-pane :label="`${$t('message.qt_ThermalMonitoringSystem')}`" name="fourth">
            <heat-loss :lineData="lineDataHeat" :active-name="activeName"></heat-loss>
          </el-tab-pane>
          <!-- <el-tab-pane label="高炉本体温度" name="fifth">
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import FurnaceWallHeatMap from './FurnaceWallHeatMap'
import SlagCrustMonitor from './SlagCrustMonitor'
import heatLoss from './heatLoss.vue'
import slagSkull from './slagSkull.vue'
export default {
  name: 'furnace-wall-temp',
  components: {
    FurnaceWallHeatMap,
    SlagCrustMonitor,
    heatLoss,
    slagSkull
  },
  data () {
    return {
      defaultTab: null,
      activeName: 'first',
      lineDataSlag: [1, 2, 3],
      lineDataHeat: [1, 2, 3],
      curTab: ''
    }
  },
  methods: {

  },
  mounted () {
    this.defaultTab = 'first'
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
      .furnaceWall-tabs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        flex: auto;
        padding: 0px 5px;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
