<template>
  <div class="page-content">
    <h2 class="page-title">{{$t('message.qt_SiloManagement')}}</h2>
    <div class="blast-table-wrap">
      <div class="flex-box">
        <div class="form-box">
          <el-form :model="siloform" :inline="true" size="small" style="display:flex;">
            <el-form-item :label="$t('message.qt_time')" v-model="siloform.time">
              <el-date-picker v-model="timeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                size="small" style="width: 300px"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small">{{$t('message.qt_Inquire')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="silo-box">
          <div class="silo-item" v-for="item in siloList" :key="item.id">
            <div class="item-top"></div>
            <div class="item-main">
              <div class="item-before" :style="{height: item.height / 100*160 + 'px'}">
                <span class="before-num" :style="{top: item.height / 100 < 0.25 ? '-30px' : '5px'}">{{ item.height + '%' }}</span>
              </div>
              <div class="item-left"></div>
              <div class="item-right"></div>
            </div>
            <div class="item-bottom">
              <p>FJMLSA-FN-HHA1 粉状大理石石灰石</p>
              <p>5</p>
              <p>400</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default ({
  name: 'silo-management',
  data () {
    return {
      siloform: {
        time: ''
      },
      timeRange: '',
      siloList: []
    }
  },
  mounted () {
    this.mockItem()
  },
  methods: {
    // 模拟数据
    mockItem () {
      for (let i = 0; i < 22; i++) {
        let j = parseInt(Math.random() * 85 + 10)
        this.siloList.push({height: j, id: i})
      }
      console.log(this.siloList)
    }
  }
})
</script>
<style lang="scss" scoped>
  .page-content{
    padding: 0 20px;
    flex: auto;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
   .page-title  {
      margin: 0 -40px;
      padding: 0 40px;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 1px;
      border-bottom: 1px solid #c0c0c0;
    }
    .blast-table-wrap{
      margin-top: 20px;
      padding: 10px;
      box-shadow: 0 0 5px #666666;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      .flex-box{
        display: flex;
        flex-direction: column;
        flex: none;
        margin-top: 10px;
        width: 100%;
        justify-content: flex-start;
        .form-box{
          display: flex;
          flex: none;
          padding-left: 30px;
          margin-bottom: 10px;
        }
        .silo-box{
          display: flex;
          flex: auto;
          width: 100%;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: flex-start;
          .silo-item{
            display: flex;
            width: 120px;
            flex-direction: column;
            flex: none;
            padding: 8px;
            margin-bottom: 80px;
            .item-top{
              width: 120px;
              height: 12px;
              flex: none;
              background: #000000;
              margin-bottom: 3px;
            }
            .item-main{
              width: 120px;
              height: 160px;
              flex: none;
              background: #bbbbbb;
              position: relative;
              .item-left{
                width: 0;
                height: 0;
                border-color: transparent transparent #fff #fff;
                border-width: 15px 30px;
                border-style: solid;
                position: absolute;
                left: 0;
                bottom: 0;
                z-index: 999;
              }
              .item-right{
                width: 0;
                height: 0;
                border-color: transparent #fff #fff transparent;
                border-width: 15px 30px;
                border-style: solid;
                position: absolute;
                right: 0;
                bottom: 0;
                z-index: 999;
              }
              .item-before{
                width: 120px;
                position: absolute;
                bottom: 0;
                left: 0;
                background: #666666;
                .before-num{
                  display: inline-block;
                  width: 48px;
                  height: 20px;
                  position: absolute;
                  left: 50%;
                  margin-left: -24px;
                  text-align: center;
                  color: black;
                }
              }
            }
            .item-bottom{
              height: 120px;
              p:not(:last-child){
                margin-bottom: 8px;
              }
            }
          }
        }
        .silo-box:after{
          content: '';
          width: 120px;
          display: block;
          flex: auto;
        }
      }
    }
  }
</style>
