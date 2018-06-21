<template>
  <el-dialog width="1000px" center top="0" title="详情" :visible="visible" @close="handleClose">
    <el-form v-loading="loading" :disabled="true" ref="editForm" size="small" status-icon :model="formData" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="24">
          <h3>总览信息</h3>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Tap hole" prop="taphole">
            <el-select v-model="formData.taphole" placeholder="请选择">
              <el-option v-for="item in 4" :key="item" :label="`${item}#Tap Hole`" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Tap start" prop="starttime">
            <el-date-picker
              v-model="formData.starttime"
              type="datetime"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Slag start" prop="slagtime">
            <el-date-picker
              v-model="formData.slagtime"
              type="datetime"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Tap end" prop="endtime">
            <el-date-picker
              v-model="formData.endtime"
              type="datetime"
              style="width:100%"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Temp" prop="temp">
            <el-input v-model="formData.temp">
              <template slot="append">℃</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Actwgt" prop="actweight">
            <el-input v-model="formData.actweight">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Theoywgt" prop="theroyweight">
            <el-input v-model="formData.theroyweight">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Totalwgt" prop="totalweight">
            <el-input v-model="formData.totalweight">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Torpedowgt" prop="torpedoweight">
            <el-input v-model="formData.torpedoweight">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Tap Speed" prop="ironspeed">
            <el-input v-model="formData.ironspeed">
              <template slot="append">t/h</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Actslagwgt" prop="actslagwgt">
            <el-input v-model="formData.actslagwgt">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="theroyslagwgt" prop="theroyslagwgt">
            <el-input v-model="formData.theroyslagwgt">
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Slag speed" prop="slagspeed">
            <el-input v-model="formData.slagspeed">
              <template slot="append">t/h</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Slag perc" prop="slagperc">
            <el-input v-model="formData.slagperc">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Deepth" prop="dephth">
            <el-input v-model="formData.dephth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Holediameter" prop="holediameter">
            <el-input v-model="formData.holediameter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <h3>罐车信息</h3>
        </el-col>
        <!-- <el-col :span="24">
          <el-form ref="addLadleForm" size="small" status-icon :rules="ladleRules" :model="ladleFormData">
            <table cellspacing="0" class="add-ladle-form-table">
              <thead>
                <tr>
                  <th>starttime</th>
                  <th>endtime</th>
                  <th>temp</th>
                  <th>actweight</th>
                  <th>totalweight</th>
                  <th>torpedoweight</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width:200px">
                    <el-form-item prop="starttime">
                      <el-date-picker
                        v-model="ladleFormData.starttime"
                        type="datetime"
                        style="width:100%"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td style="width:200px">
                    <el-form-item prop="endtime">
                      <el-date-picker
                        v-model="ladleFormData.endtime"
                        type="datetime"
                        style="width:100%"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="temp">
                      <el-input v-model="ladleFormData.temp"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="actweight">
                      <el-input v-model="ladleFormData.actweight"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="totalweight">
                      <el-input v-model="ladleFormData.totalweight"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item prop="torpedoweight">
                      <el-input v-model="ladleFormData.torpedoweight"></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 50px;border:1px solid #979797">
                    <el-button type="text" size="small" @click="submitLadle">保存</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form>
        </el-col> -->
        <el-col :span="24">
          <el-table
            border
            stripe
            size="small"
            class="ladle-table"
            :data="ladleTableData">
            <el-table-column
              type="index"
              align="center">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in ladleTableColumns"
              :key="index"
              :prop="item"
              align="center"
              :width="item.indexOf('time')!==-1 ? '148' : 'auto'"
              :label="item">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'tapping-details-dialog',
  props: {
    visible: Boolean,
    item: Object
  },
  data () {
    return {
      loading: false,
      details: null,
      sending: false,
      formData: {
        taphole: null,
        starttime: null,
        slagtime: null,
        endtime: null,
        canceltime: null,
        temp: null,
        actweight: null,
        theroyweight: null,
        totalweight: null,
        torpedoweight: null,
        ironspeed: null,
        actslagwgt: null,
        theroyslagwgt: null,
        slagspeed: null,
        slagperc: null,
        dephth: null,
        holediameter: null
      },
      ladleTableData: [],
      ladleTableColumns: ['starttime', 'endtime', 'temp', 'actweight', 'totalweight', 'torpedoweight'],
      currentLadleIndex: null,
      timeout: null
    }
  },
  watch: {
    visible (val) {
      val && this.loadDetails()
    }
  },
  methods: {
    loadDetails () {
      this.loading = true
      this.$axios.get(`${process.env.API_HOST}furnace/tap/detail/${this.item.tapid}`)
        .then((res) => {
          if (res.status === 200) {
            this.$message(res.data.message)
            if (res.data.status) {
              this.details = res.data.data
              this.updateForm()
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          this.loading = false
        })
    },
    updateForm () {
      this.$nextTick(() => {
        this.formData = Object.assign({}, this.details.tapIndex)
        this.ladleTableData = this.details.ladleTapIndices.slice(0)
      })
    },
    handleClose () {
      this.$emit('form-close')
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  h3 {
    margin: 10px 0;
    font-size: 18px;
  }

  .add-ladle-form-table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border: 1px solid #979797;
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    thead {
      th {
        height: 30px;
        font-weight: 400;
        border: 1px solid #979797;
      }
    }
  }

  .ladle-table {
    margin-top: 20px;
  }
</style>
