<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.qt_airRule')}}</h2>
    </div>
    <div class="page-content">
      <div class="blast-table-wrap">
        <el-tabs v-model="activeValue">
          <el-tab-pane :label="$t('message.qt_ventSimulation')" name="first">
            <air-mock :test="testp"></air-mock>
          </el-tab-pane>
          <el-tab-pane :label="$t('message.qt_blowParameters')" name="second">
            <blow-param :test="testpp"></blow-param>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import airMock from './airMock.vue'
import blowParam from './blowParam.vue'
export default ({
  name: 'air-rule',
  components: {
    airMock,
    blowParam
  },
  data () {
    return {
      testp: 222,
      testpp: 232,
      activeValue: 'first'
    }
  }
})

</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    display: flex;
    flex: auto;
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
      display: flex;
      box-sizing: border-box;
      flex: auto;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      padding-top: 0;
      .blast-table-wrap {
        margin-top: 20px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 0 5px #666666;
        position: relative;
      }
    }
  }

</style>
