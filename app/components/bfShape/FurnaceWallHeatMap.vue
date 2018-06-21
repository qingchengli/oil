<template>
  <div class="content-wrap">
    <div class="filter-form-wrap">
      <el-form size="small" :inline="true" :model="filterForm" class="filter-form-inline">
        <el-form-item>
          <el-radio-group v-model="filterForm.isOnline">
            <el-radio label="online">{{$t('message.qt_online')}}</el-radio>
            <el-radio label="offline">{{$t('message.qt_offline')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="`${$t('message.qt_time')}`">
          <el-date-picker
            v-model="filterForm.time"
            type="datetime"
            size="small"
            :picker-options="filterForm.time"
            placeholder="请选择"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitFilter">{{$t('message.qt_Inquire')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <furnace-wall-heat-map-chart></furnace-wall-heat-map-chart>
    <div class="chart-wrap">
      <h4 class="chart-wrap-title">{{$t('message.qt_ventCondition')}}</h4>
      <div class="num-wrap">
        <h5>{{$t('message.qt_ventNum')}}:</h5>
        <div class="num-container">
          <span class="num-item" v-for="(item, index) in 42" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="length-wrap">
        <h5>{{$t('message.qt_ventLen')}}:</h5>
        <div class="length-container" ref="lengthChart">
          <air-outlet-chart :data="airOutletData" :show="showChart" :type="`length`"></air-outlet-chart>
        </div>
      </div>
      <div class="diameter-wrap">
        <h5>{{$t('message.qt_ventDiameter')}}:</h5>
        <div class="diameter-container" ref="diameterChart">
          <air-outlet-chart :data="airOutletData" :show="showChart" :type="`diameter`"></air-outlet-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FurnaceWallHeatMapChart from './FurnaceWallHeatMapChart'
import AirOutletChart from './AirOutletChart'

export default {
  name: 'furnace-wall-heatmap',
  props: {
    showChart: Boolean
  },
  components: {
    FurnaceWallHeatMapChart,
    AirOutletChart
  },
  data () {
    return {
      filterForm: {
        isOnline: 'offline',
        time: this.$moment().format('x')
      },
      airOutletData: (() => {
        var len = 42
        var res = []
        while (len--) {
          res.unshift({
            id: len + 1,
            length: 643.3,
            diameter: 120
          })
        }
        return res
      })()
    }
  },
  methods: {
    submitFilter () {

    }
  },
  mounted () {
    this.showChart = true
  }
}
</script>

<style lang="scss" scoped>
.content-wrap {
  flex: auto;
  width: 100%;
  box-sizing: border-box;
  .chart-wrap {
    h4 {
      line-height: 35px;
      font-size: 18px;
    }
    [class*=-wrap] {
      h5 {
        font-size: 14px;
      }
      [class*=-container] {
        margin: 5px 0;
      }
    }
    .num-container {
      display: flex;
      justify-content: space-between;
      .num-item {
        display: inline-block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        border: 1px solid #1989fa;
        border-radius: 100%;
        box-sizing: border-box;
      }
    }
    .length-container,
    .diameter-container {
      height: 25px;
    }
  }
}
</style>
