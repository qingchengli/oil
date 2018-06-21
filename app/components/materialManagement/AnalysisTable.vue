<template>
  <div class="table-wrap">
    <el-form size="small" :inline="true" :model="filterForm" class="filter-form-inline">
      <el-form-item>
        <el-select size="small" v-model="filterForm.type">
          <el-option label="全部" value="0"></el-option>
          <el-option label="化学" value="1"></el-option>
          <el-option label="物理" value="2"></el-option>
          <el-option label="冶金" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="在线期间">
        <el-input-number size="small"  v-model="filterForm.onlineTime"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="filterForm.isOnline">
          <el-radio label="online">在线</el-radio>
          <el-radio label="offline">离线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="filterForm.timeRange"
          type="datetimerange"
          size="small"
          :picker-options="filterForm.timeRange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="submitFilter">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref='analysisTable'
      border
      stripe
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentRowChange"
      :header-cell-style ="{background:'#3ac9d6',color:'#fff'}"
      style="width: 100%">
      <el-table-column
        prop="converterInfoId"
        label="转炉代号">
      </el-table-column>
      <el-table-column
        prop="furnaceNum"
        label="炉次号">
      </el-table-column>
      <el-table-column
        prop="steelType"
        label="钢种类型">
      </el-table-column>
      <el-table-column
        prop="ironWater"
        label="铁水量(t)">
      </el-table-column>
      <el-table-column
        prop="scrapVolume"
        label="废钢量(t)">
      </el-table-column>
      <el-table-column
        prop="steelTotle"
        label="出钢量(t)">
      </el-table-column>
      <el-table-column
        prop="steelTemperature"
        label="出钢温度(℃)">
      </el-table-column>
      <el-table-column
        prop="tappingBetweenTime"
        label="出钢时长">
      </el-table-column>
      <el-table-column
        prop="brasqueNum"
        label="炉衬修炉编码">
      </el-table-column>
      <el-table-column
        prop="brasqueUsedCount"
        label="炉衬耐材使用次数">
      </el-table-column>
      <el-table-column
        prop="tapHoleNum"
        label="出钢口编码">
      </el-table-column>
      <el-table-column
        prop="tapHoleUsedCount"
        label="出钢口使用次数">
      </el-table-column>
      <el-table-column
        prop="slidingPlateNum"
        label="滑板编码">
      </el-table-column>
      <el-table-column
        prop="slidingPlateUsedCount"
        label="滑板使用次数">
      </el-table-column>
      <el-table-column
        prop="furnaceStartTime"
        width="100"
        align="center"
        header-align="left"
        label="炉次开始时间">
      </el-table-column>
      <el-table-column
        prop="furnaceEndTime"
        width="100"
        align="center"
        header-align="left"
        fixed="right"
        label="炉次结束时间">
      </el-table-column>
    </el-table>
    <div class="extra-action-row">
      <el-pagination
        @current-change="handleCurrentPageChange"
        :current-page.sync="currentPage"
        :page-size="10"
        background
        layout="total, prev, pager, next, jumper, slot"
        :total="total">
        <span class="total-page">{{`/ 共${totalPage}页`}}</span>
      </el-pagination>
      <el-button size="small" @click="exportExcel">导出报表<i class="el-icon-upload2 el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analysis-table',
  props: {
    id: String
  },
  data () {
    return {
      filterForm: {
        type: '0',
        onlineTime: 6,
        isOnline: 'online',
        timeRange: ''
      },
      tableData: [
        { converterInfoId: 1,
          furnaceNum: 1,
          steelType: 1,
          ironWater: 1,
          scrapVolume: 1,
          steelTotle: 1,
          steelTemperature: 1,
          tappingBetweenTime: 1,
          brasqueNum: 1,
          brasqueUsedCount: 1,
          tapHoleNum: 1,
          tapHoleUsedCount: 1,
          slidingPlateNum: 1,
          slidingPlateUsedCount: 1,
          furnaceStartTime: 1,
          furnaceEndTime: 1
        },
        { converterInfoId: 2,
          furnaceNum: 2,
          steelType: 2,
          ironWater: 2,
          scrapVolume: 2,
          steelTotle: 2,
          steelTemperature: 2,
          tappingBetweenTime: 2,
          brasqueNum: 2,
          brasqueUsedCount: 2,
          tapHoleNum: 2,
          tapHoleUsedCount: 2,
          slidingPlateNum: 2,
          slidingPlateUsedCount: 2,
          furnaceStartTime: 2,
          furnaceEndTime: 2
        },
        { converterInfoId: 3,
          furnaceNum: 3,
          steelType: 3,
          ironWater: 3,
          scrapVolume: 3,
          steelTotle: 3,
          steelTemperature: 3,
          tappingBetweenTime: 3,
          brasqueNum: 3,
          brasqueUsedCount: 3,
          tapHoleNum: 3,
          tapHoleUsedCount: 3,
          slidingPlateNum: 3,
          slidingPlateUsedCount: 3,
          furnaceStartTime: 3,
          furnaceEndTime: 3
        },
        { converterInfoId: 4,
          furnaceNum: 4,
          steelType: 4,
          ironWater: 4,
          scrapVolume: 4,
          steelTotle: 4,
          steelTemperature: 4,
          tappingBetweenTime: 4,
          brasqueNum: 4,
          brasqueUsedCount: 4,
          tapHoleNum: 4,
          tapHoleUsedCount: 4,
          slidingPlateNum: 4,
          slidingPlateUsedCount: 4,
          furnaceStartTime: 4,
          furnaceEndTime: 4
        },
        { converterInfoId: 5,
          furnaceNum: 5,
          steelType: 5,
          ironWater: 5,
          scrapVolume: 5,
          steelTotle: 5,
          steelTemperature: 5,
          tappingBetweenTime: 5,
          brasqueNum: 5,
          brasqueUsedCount: 5,
          tapHoleNum: 5,
          tapHoleUsedCount: 5,
          slidingPlateNum: 5,
          slidingPlateUsedCount: 5,
          furnaceStartTime: 5,
          furnaceEndTime: 5
        },
        { converterInfoId: 6,
          furnaceNum: 6,
          steelType: 6,
          ironWater: 6,
          scrapVolume: 6,
          steelTotle: 6,
          steelTemperature: 6,
          tappingBetweenTime: 6,
          brasqueNum: 6,
          brasqueUsedCount: 6,
          tapHoleNum: 6,
          tapHoleUsedCount: 6,
          slidingPlateNum: 6,
          slidingPlateUsedCount: 6,
          furnaceStartTime: 6,
          furnaceEndTime: 6
        }
      ],
      currentPage: 1,
      total: 0,
      totalPage: 1
    }
  },
  methods: {
    submitFilter () {

    },
    getlist () {

    },
    handleCurrentRowChange () {

    },
    exportExcel () {

    },
    handleCurrentPageChange () {

    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .table-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    .filter-form-inline {
      padding-left: 10px;
      flex: none;
      .el-select {
        width: 80px;
      }
      .el-input-number {
        width: 100px;
      }
      .el-radio+.el-radio {
        margin-left: 10px;
      }
      .el-date-editor--datetimerange.el-input,
      .el-date-editor--datetimerange.el-input__inner {
        width: 200px;
      }
    }
    .extra-action-row {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }
  }
</style>
