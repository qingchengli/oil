<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.qt_static')}}</h2>
    </div>
    <div class="page-content">
      <div class="blast-table-wrap">
        <!-- 上方筛选图 -->
        <el-row>
          <el-form :model="form" :inline="true" size="mini" class="demo-form-inline">
            <el-form-item style="margin-right: 20px;">
              <el-checkbox-group v-model="form.deg">
                <el-checkbox label="0°" name="deg"></el-checkbox>
                <el-checkbox label="90°" name="deg"></el-checkbox>
                <el-checkbox label="180°" name="deg"></el-checkbox>
                <el-checkbox label="270°" name="deg"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item style="margin-right: 40px;">
              <el-radio-group v-model="form.online">
                <el-radio label="在线" name="online"></el-radio>
                <el-radio label="离线" name="online"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker  v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束日期" size="mini" style="width: 300px;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <!-- 下方三图 -->
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div :style="img">
              <!-- 按钮组 -->
              <el-checkbox-group v-model="high" style="display: inline-block; width: 100px; height: 100%; margin-right: 20px;">
                <el-checkbox label="34.49m" name="heigh" style="margin-top: 80px"></el-checkbox>
                <el-checkbox label="31.55m " name="heigh" style="margin-left: 0; margin-top: 86px"></el-checkbox>
                <el-checkbox label="28.26m" name="heigh" style="margin-left: 0; margin-top: 86px"></el-checkbox>
                <el-checkbox label="25.23m" name="heigh" style="margin-left: 0;margin-top: 86px"></el-checkbox>
                <el-checkbox label="22.69m" name="heigh" style="margin-left: 0; margin-top: 86px"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="18" :lg="18">
            <div ref="topLine" style="width: 100%; height: 300px;  margin-bottom: 20px; box-shadow: 0 0 5px #999999;"></div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="18" :lg="18">
            <div ref="bottomLine" style="width: 100%; height: 300px; box-shadow: 0 0 5px #999999;"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default ({
  name: 'static-pressure',
  data () {
    return {
      form: {
        deg: [],
        online: null,
        time: null
      },
      img: {
        width: '100%',
        textAlign: 'right',
        height: '620px',
        backgroundImage: 'url(' + require('../../assets/img/static.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      },
      high: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawLine({
        title: '静压变化趋势',
        ref: this.$refs.topLine,
        xAxis: ['16:00', '17:00', '18:00', '19:00', '20:00'],
        series: [22, 55, 32, 14, 43]
      })
      this.drawLine({
        title: '压差变化趋势',
        ref: this.$refs.bottomLine,
        xAxis: ['16:00', '17:00', '18:00', '19:00', '20:00'],
        series: [12, 33, 35, 21, 8]
      })
    })
  },
  methods: {
    drawLine (obj) {
      let mychart = this.$echarts.init(obj.ref)
      mychart.setOption({
        title: {
          text: obj.title,
          left: 'center',
          top: 5
        },
        grid: {
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: {
          type: 'inside',
          realtime: true,
          xAxisIndex: 0
        },
        xAxis: [
          {
            name: '时间',
            type: 'category',
            boundaryGap: false,
            data: obj.xAxis
          }
        ],
        yAxis: [
          {
            name: 'kPa',
            type: 'value'
          }
        ],
        series: [
          {
            type: 'line',
            data: obj.series
          }
        ]
      })
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
