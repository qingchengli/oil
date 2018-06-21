<template>
  <el-dialog width="1000px" center top="0" :title="$t('message.qt_addInformation')" :visible="visible" @close="handleClose">
    <el-form ref="addForm" size="small" status-icon :rules="rules" :model="formData" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="24">
          <h3>{{$t('message.qt_OverviewInformation')}}</h3>
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
          <h3>{{$t('message.qt_TankerInformation')}}</h3>
        </el-col>
        <el-col :span="24">
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
                    <el-button type="text" size="small" @click="submitLadle">{{$t('message.qt_save')}}</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-form>
        </el-col>
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
            <el-table-column
              fixed="right"
              :label="$t('message.qt_manipulate')"
              align="center"
              width="140">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.$index,scope.row)" type="text" class="action-edit-button" size="mini">编辑</el-button>
                <el-button @click="handleDelete(scope.$index,scope.row)" type="text" class="action-delete-button" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" v-loading="sending">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'tapping-add-form',
  props: {
    visible: Boolean
  },
  data () {
    return {
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
      rules: {
        taphole: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        starttime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        slagtime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        endtime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        temp: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        actweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        theroyweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        totalweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        torpedoweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        ironspeed: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        actslagwgt: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        theroyslagwgt: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        slagspeed: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        slagperc: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        dephth: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        holediameter: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      ladleFormData: {
        starttime: null,
        endtime: null,
        temp: null,
        actweight: null,
        totalweight: null,
        torpedoweight: null
      },
      ladleRules: {
        starttime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        endtime: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        temp: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        actweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        totalweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        torpedoweight: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      ladleTableData: [],
      ladleTableColumns: ['starttime', 'endtime', 'temp', 'actweight', 'totalweight', 'torpedoweight'],
      currentLadleIndex: null,
      timeout: null
    }
  },
  watch: {
    visible (val) {
      val && this.updateForm()
    }
  },
  methods: {
    updateForm () {
      this.$nextTick(() => {
        this.$refs['addForm'].resetFields()
        this.$refs['addLadleForm'].resetFields()
      })
    },
    handleClose () {
      this.$emit('form-close')
    },
    handleSubmit () {
      this.$emit('form-submit')
      this.handleClose()
    },
    submitForm () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          this.submitCreate()
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    submitCreate () {
      let formData = {
        tapIndex: Object.assign({}, this.formData),
        ladleTapIndices: this.ladleTableData.slice(0)
      }
      this.sending = true
      this.$axios.post(`${process.env.API_HOST}furnace/tap`, formData)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.status) {
              this.$notify({
                title: '提示信息',
                message: `${res.data.message}`
              })
              this.handleSubmit()
            } else {
              this.$message.error(res.data.message)
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('请求错误')
          this.sending = false
        })
        .then(() => {
          this.sending = false
        })
    },
    submitLadle () {
      this.$refs['addLadleForm'].validate((valid) => {
        if (valid) {
          this.currentLadleIndex !== null ? this.editLadle() : this.addLadle()
          this.$message('保存成功')
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    addLadle () {
      let tempObj = Object.assign({}, this.ladleFormData)
      this.ladleTableData.push(tempObj)
    },
    editLadle () {
      let tempObj = Object.assign({}, this.ladleFormData)
      this.ladleTableData.splice(this.currentLadleIndex, 1, tempObj)
      this.$nextTick(() => {
        this.currentLadleIndex = null
        this.$refs['addLadleForm'].resetFields()
      })
    },
    handleEdit (index, row) {
      this.$nextTick(() => {
        this.$refs['addLadleForm'].resetFields()
      })
      this.currentLadleIndex = index
      let tempObj = Object.assign({}, row)
      this.ladleFormData = tempObj
    },
    handleDelete (index, row) {
      this.ladleTableData.splice(index, 1)
      if (this.currentLadleIndex !== null) {
        this.$refs['addLadleForm'].resetFields()
      }
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
