<template>
  <div id="shaft-index" class="page-content">
    <h2 class="page-title">{{$t('message.qt_shaftSimulation')}}</h2>
    <div class="blast-table-wrap">
      <el-row :gutter="20">
        <!-- 左侧堆积图 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <div class="line-box" ref="lineBox">

          </div>
        </el-col>
        <!-- 右侧图表 -->
        <el-col :xs="24" :sm="24" :md="12" :lg="16">
          <div class="right-box">
            <el-row>
              <!-- 按钮组 & 阶梯图-->
              <el-col :span="24">
                <el-button-group>
                  <el-button v-for="(item,index) in buttonList" :key="item.name" size="mini" type="primary" plain :autofocus="index === 0 ? true : false" @click="choiceIt (index)">{{ item.name }}</el-button>
                </el-button-group>
                <!-- 阶梯图 -->
                <div class="step-box" ref="stepBox">
                  123
                </div>
              </el-col>
              <!-- 表格 & 底部筛选框 -->
              <el-col :span="24">
                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#3AC9CD',color:'#fff', textAlign: 'center'}" border height="280px">
                  <el-table-column label="IbVolume" width="100" prop="IbVolume"></el-table-column>
                  <el-table-column label="Coke(dry):" width="100" prop="CokeDry"></el-table-column>
                  <el-table-column label="Analysiscoke" width="120">
                    <template slot-scope="scope">
                      <el-button type="text" @click="openForm">{{$t('message.qt_analysis')}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="Burden(dry)" width="120" prop="Burden"></el-table-column>
                  <el-table-column label="Analysiscoke" width="120">
                    <template slot-scope="scope">
                      <el-button type="text" @click="openForm">{{$t('message.qt_analysis')}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="Slag:" prop="Slag"></el-table-column>
                  <el-table-column label="Tot.Moistur" width="110" prop="Tot"></el-table-column>
                  <el-table-column label="Hot Metal" width="100" prop="Hot"></el-table-column>
                  <el-table-column label="AnalysisHM" width="110">
                    <template slot-scope="scope">
                      <el-button type="text" @click="openForm">{{$t('message.qt_analysis')}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="AnalysisSlag" width="110">
                    <template slot-scope="scope">
                      <el-button type="text" @click="openForm">{{$t('message.qt_analysis')}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="B2" prop="B2"></el-table-column>
                  <el-table-column label="B3" prop="B3"></el-table-column>
                </el-table>
                <!-- 分页器 -->
                <!-- 筛选框 -->
                <el-row style="margin-top: 30px;">
                  <ul class="choice-list">
                    <li>
                        <template>
                          <span>{{$t('message.qt_time')}}</span>
                          <el-date-picker size="mini"  type='daterange' range-separator="至" start-placeholder="开始日期" v-model="dateRange" end-placeholder="结束日期" style="width: 200px;"></el-date-picker>
                        </template>
                    </li>
                    <li>
                      <template>
                        <el-radio v-model="radio" label="1" selected style="margin-left: 10px;">{{$t('message.qt_online')}}</el-radio>
                        <el-radio v-model="radio" label="2" style="margin-left: 10px;">{{$t('message.qt_offline')}}</el-radio>
                      </template>
                    </li>
                    <li>
                      <template>
                        <el-button type="parimary" plain size="mini">{{$t('message.qt_loadingData')}}</el-button>
                      </template>
                    </li>
                  </ul>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <analysis-form :visible="visible" :listData="listData" @close-form="closeMe()"></analysis-form>
  </div>
</template>
<script>
import analysisForm from './analysisForm.vue'
export default ({
  name: 'shaft-simulation',
  components: {
    analysisForm
  },
  data () {
    return {
      // 分析列表显示
      visible: false,
      listData: [
        {
          name: '金银花',
          value: '20%'
        },
        {
          name: '板蓝根',
          value: '70%'
        }
      ],
      // 波浪图数据
      waveData: [],
      waveX: [],
      waveY: [],
      // 模拟数据
      time: [],
      data: [],
      radio: '1',
      // 筛选时间
      dateRange: [new Date(2018, 10, 10, 10, 10), new Date(2018, 10, 11, 10, 10)],
      dateRange2: [new Date(2018, 10, 10, 10, 10), new Date(2018, 10, 11, 10, 10)],
      // 分页功能
      // 按钮组
      buttonList: [
        {
          name: 'Tot.Moistur'
        },
        {
          name: 'Coke(dry):'
        },
        {
          name: 'Burden(dry)'
        },
        {
          name: 'B2'
        },
        {
          name: 'B3'
        },
        {
          name: 'Hot Metal:'
        },
        {
          name: 'Slag:'
        },
        {
          name: 'batchore'
        },
        {
          name: 'batchcoke'
        }
      ],
      tableData: [
        {
          IbVolume: 1,
          CokeDry: 1,
          Burden: 1,
          Slag: 1,
          Tot: 1,
          Hot: 1,
          B2: 1,
          B3: 1
        }
      ]
    }
  },
  computed: {
    language () {
      return this.$store.state.lang.language
    }
  },
  watch: {
    language () {
      this.drawLine()
      this.drawWave()
    }
  },
  mounted () {
    // 模拟数据
    for (var i = 1, newTime = new Date(); i < 50; i++) {
      this.time.push(this.createTime(newTime))
      this.data.push(this.createData(20, 42))
      newTime = new Date(newTime + 6000)
    }
    this.drawLine()
    this.drawWave()
    // this.getWaveData()
  },
  methods: {
    // 打开分析成分弹窗
    openForm () {
      this.visible = true
    },
    closeMe () {
      this.visible = false
    },
    // 获取列表
    getList () {
      console.log(this.pageNum)
    },
    // 获取炉身镜像数据
    // getWaveData () {
    //   this.$axios.get(`${process.env.API_HOST}furnace/shs/shslcshaperesult/1`).then(data => {
    //     var arr = data.data.data
    //     var last = arr[arr.length-1].lineId
    //     arr.forEach((ele,index) => {
    //       this.waveData[ele.lineId].
    //     });
    //   })
    // },
    // 静态建立数据,可删除
    choiceIt (index) {
      this.activeIndex = index
      this.data = []
      for (var i = 1, newTime = new Date(); i < 50; i++) {
        this.data.push(this.createData(20, 42))
        newTime = new Date(newTime + 6000)
      };
      this.drawLine()
    },
    // 模拟数据
    createData (n, m) {
      var newData = (parseFloat(Math.random() * n + m)).toFixed(4)
      return newData
    },
    // 建立x轴时间数据
    createTime (newTime) {
      newTime = newTime.toLocaleTimeString()
      return newTime
    },
    drawLine () {
      let mychart = this.$echarts.init(this.$refs.stepBox)
      mychart.setOption({
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0]
          }
        ],
        grid: {
          top: '10%',
          bottom: '10%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: this.time,
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            name: 'Tot.Moisture [kg/tHM]',
            type: 'value',
            nameLocation: 'middle',
            nameGap: 35,
            nameTextStyle: {
              fontWeight: 'bold',
              color: '#C23531'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            data: this.data,
            step: true,
            type: 'line'
          }
        ]
      })
    },
    // 绘制物料堆积图
    drawWave () {
      var mycharts = this.$echarts.init(this.$refs.lineBox)
      mycharts.setOption({
        title: {
          text: this.$t('message.qt_shaftSimulation')
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '1', '2']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'z',
            type: 'line',
            data: [1, 2, 3],
            areaStyle: {normal: {}}
          }
        ]
      })
    }
  }
})
</script>
<style lang="scss" scoped>
  .page-content {
    padding: 0 40px;
    flex: auto;
    width: 100%;
    box-sizing: border-box;
    .page-title {
      margin: 0 -40px;
      padding: 0 40px;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 1px;
      border-bottom: 1px solid #c0c0c0;
    }
    .blast-table-wrap {
      margin-top: 30px;
      .line-box {
        width: 100%;
        height: 680px;
        background: #fff;
        box-shadow: 0 0 10px #999999;
      }
      .right-box {
        width: 100%;
        min-height: 680px;
        padding: 10px;
        box-shadow: 0 0 10px #999999;
        .step-box{
          width: 100%;
          height: 300px;
          margin-bottom: 10px;
        }
        .choice-list li{
          display: inline-block;
          margin-left: 30px;
        }
      }
    }
  }
</style>
