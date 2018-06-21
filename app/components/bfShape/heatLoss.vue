<template>
  <div class="container">
    <!-- 上方折现图 -->
    <el-row>
      <ul class="radio-box">
        <li>
          <template>
            <el-radio v-model="radio" label="1">{{$t('message.qt_online')}}</el-radio>
            <el-radio v-model="radio" label="2">{{$t('message.qt_offline')}}</el-radio>
          </template>
        </li>
        <li>
          <template>
            <el-date-picker v-model="dateTime" type="datetime" size="mini" style="width: 140px" placeholder="请选择时间"></el-date-picker>
          </template>
        </li>
        <li>
          <el-button type="primary" size="small">{{$t('message.qt_Inquire')}}</el-button>
        </li>
      </ul>
    </el-row>
    <el-row>
      <div class="line-box" ref="lineBox">

      </div>
    </el-row>
    <!-- 下方热力图 -->
    <el-row :gutter="10" style="margin-top: 20px;">
      <!-- 左方按钮组及高炉图 -->
      <el-col :span="8">
        <el-row>
          <el-col :span="10">
            <img src="../../../static/img/炉身图.png" alt="">
          </el-col>
          <!-- 按钮组 -->
          <el-col :span="14">
            <el-row>
              <el-button circle type="primary" disabled size="mini"></el-button>
              <span>{{$t('message.qt_trend')}}</span>
              <el-button circle type="warning" disabled size="mini"></el-button>
              <span>{{$t('message.qt_peripheralDirection')}}</span>
            </el-row>
            <el-row v-for="item in buttonList" :key="item.name">
              <el-col :span="24" style="margin-top: 5px;">
                {{item.name}}
              </el-col>
              <el-col :span="8" :offset="2">
                <el-button circle type="primary" size="mini" @click="openLine"></el-button>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-button circle type="warning" size="mini" @click="openRadar"></el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div class="heat-box" ref="heatBox"></div>
      </el-col>
    </el-row>
    <dialog-radar :visibleRadar="visibleRadar" @close-form="closeMe"></dialog-radar>
    <dialog-line  :visibleRadar="visibleLine" @close-form="closeMeLine"></dialog-line>
  </div>
</template>
<script>
import dialogRadar from './dialog/dialogRadar.vue'
import dialogLine from './dialog/dialogLine.vue'
export default ({
  name: 'heat-loss',
  components: {
    dialogRadar,
    dialogLine
  },
  props: {
    lineDataHeat: Array,
    activeName: String
  },
  data () {
    return {
      visibleRadar: false,
      visibleLine: false,
      radio: '1',
      dateTime: '',
      buttonList: [
        {
          name: 'R1-LH'
        },
        {
          name: 'S4-S5'
        },
        {
          name: 'S1-S3'
        },
        {
          name: 'B3'
        },
        {
          name: 'B2'
        },
        {
          name: 'H6-B1'
        },
        {
          name: 'H1-H5'
        }
      ]
    }
  },
  computed: {
    language () {
      return this.$store.state.lang.language
    }
  },
  mounted () {
    this.drawLine()
    this.visibleRadar = true
    this.visibleRadar = false
  },
  watch: {
    lineDataHeat () {
      this.drawLine()
    },
    activeName () {
      this.drawLine()
    },
    language () {
      this.drawLine()
    }
  },
  methods: {
    // 打开雷达图
    openRadar () {
      this.visibleRadar = true
    },
    openLine () {
      this.visibleLine = true
    },
    // 关闭雷达图
    closeMeLine () {
      this.visibleLine = false
    },
    closeMe () {
      this.visibleRadar = false
    },
    // 绘制线状图
    drawLine () {
      if (this.activeName === 'fourth') {
        let mychart = this.$echarts.init(this.$refs.lineBox)
        console.log(mychart)
        mychart.setOption({
          title: {
            text: this.$t('message.qt_hotTrend'),
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              type: 'category',
              data: [0, 1, 2],
              boundaryGap: false
            }
          ],
          grid: {
            top: '18%',
            bottom: '10%',
            left: '10%',
            right: '5%'
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              type: 'line',
              data: [1, 2, 3]
            }
          ]
        })
      } else {
        this.$echarts.dispose(this.$refs.lineBox)
      }
    },
    // 绘制热力图
    drawHeat () {

    }
  }
})
</script>
<style lang="scss" scoped>
  .container{
    padding-bottom: 10px;
    flex: auto;
      ul.radio-box li{
      display: inline-block;
      margin-bottom: 0px;
      margin-right: 20px;
    }
     img{
       height: 380px;
       width: auto;
     }
    .line-box{
      width: 1100px;
      height: 200px;
      margin: 0 auto
    }
    .heat-box{
      width: 800px;
      height: 380px;
      box-shadow: 0px 0px 5px #666666;
    }
  }
</style>
