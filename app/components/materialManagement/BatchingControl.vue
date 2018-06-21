<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_batchingControl')}}</h2>
    </div>
    <div class="page-content">
      <div class="action-row">
        <div class="action-main">
          <el-radio-group>
            <el-radio label="asc">{{$t('message.qt_Fcalculation')}}</el-radio>
            <el-radio label="desc">{{$t('message.qt_Rcalculation')}}</el-radio>
          </el-radio-group>
          <el-button type="primary" size="small" plain @click="openAddModal">{{$t('message.qt_addInformation') + $t('message.qt_batching')}}</el-button>
        </div>
        <div class="action-extra">
          <div class="parameters-table-wrap">
            <h4 class="parameters-table-title">Parameters</h4>
            <table class="parameters-table">
              <thead>
                <tr>
                  <th>[Fe]</th>
                  <th>[C]</th>
                  <th>[Si]</th>
                  <th>[S]</th>
                  <th>[B2]</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><el-input size="mini" placeholder=""></el-input></td>
                  <td><el-input size="mini" placeholder=""></el-input></td>
                  <td><el-input size="mini" placeholder=""></el-input></td>
                  <td><el-input size="mini" placeholder=""></el-input></td>
                  <td><el-input size="mini" placeholder=""></el-input></td>
                </tr>
              </tbody>
            </table>
          </div>
          <el-button type="primary" size="small">{{$t('message.qt_calculation')}}</el-button>
        </div>
      </div>
      <batching-table></batching-table>
      <div class="result-wrap">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="result-item">
              <h4 class="result-item-title">HM</h4>
              <table cellspacing="0" class="result-item-table">
                <thead>
                  <tr>
                    <th>Fe</th>
                    <th>C</th>
                    <th>Si</th>
                    <th>S</th>
                    <th>P</th>
                    <th>Mn</th>
                    <th>Ti</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0.935</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="result-item">
              <h4 class="result-item-title">Slag</h4>
              <table cellspacing="0" class="result-item-table">
                <thead>
                  <tr>
                    <th>CaO</th>
                    <th>SiO2</th>
                    <th>MgO</th>
                    <th>AI2O3</th>
                    <th>B2</th>
                    <th>B3</th>
                    <th>B4</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="result-item">
              <h4 class="result-item-title">Results</h4>
              <table cellspacing="0" class="result-item-table">
                <thead>
                  <tr>
                    <th>Sum</th>
                    <th>Quality</th>
                    <th>SlagRate</th>
                    <th>CokeRate</th>
                    <th>NCRate</th>
                    <th>PCIRate</th>
                    <th>FuelRate</th>
                    <th>SRate</th>
                    <th>AlkaRate</th>
                    <th>ZnRate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <batching-add-form :visible="showAdd" @form-close="closeAddModal" @form-submit="handleAddFormSubmit"></batching-add-form>
  </div>
</template>
<script>
import BatchingTable from './BatchingTable.vue'
import BatchingAddForm from './BatchingAddForm.vue'

export default {
  name: 'batching-control',
  components: {
    BatchingTable,
    BatchingAddForm
  },
  data () {
    return {
      showAdd: false
    }
  },
  methods: {
    openAddModal () {
      this.showAdd = true
    },
    closeAddModal () {
      this.showAdd = false
    },
    handleAddFormSubmit () {

    }
  },
  mounted () {

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
      .action-row {
        flex: none;
        .action-main {
          margin-bottom: 5px;
          .el-radio-group {
            margin-right: 10px;
            .el-radio+.el-radio {
              margin-left: 10px;
            }
          }
        }
        .action-extra {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 5px;
          width: 100%;
          .parameters-table-wrap {
            flex: auto;
            display: flex;
            align-items: flex-end;
            width: 100%;
            margin-right: 10px;
            overflow-x: auto;
            .parameters-table-title {
              flex: none;
              margin-right: 10px;
              line-height: 30px;
              font-size: 14px;
            }
            .parameters-table {
              thead {
                tr {
                  th {
                    font-weight: 400;
                    font-size: 14px;
                    width: 56px;
                  }
                }
              }
              tbody {
                tr {
                  td {
                    width: 56px;
                  }
                }
              }
            }
          }
        }
      }
      .result-wrap {
        flex: none;
        .result-item {
          display: flex;
          align-items: flex-end;
          margin-bottom: 10px;
          width: 100%;
          overflow-x: auto;
          .result-item-title {
            flex: none;
            margin-right: 10px;
            line-height: 30px;
            font-size: 14px;
          }
          .result-item-table {
            text-align: center;
            thead {
              tr {
                th {
                  font-weight: 400;
                  font-size: 13px;
                  width: 60px;
                }
              }
            }
            tbody {
              tr {
                td {
                  width: 60px;
                  height: 30px;
                  border: 1px solid #979797;
                  &:nth-child(even) {
                    background: #f2f2f2;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
