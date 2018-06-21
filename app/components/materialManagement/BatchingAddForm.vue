<template>
  <el-dialog center top="0" :title="$t('message.qt_addInformation')" :visible="visible" @close="handleClose">
    <el-form ref="addForm" status-icon :rules="rules" :model="formData">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('message.qt_batching')">
            <el-cascader
              :options="options"
              :props="defaultProps"
              v-model="formData.type"
              @change="handleChange"
              change-on-select
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('message.qt_sample')">
            <el-select v-model="formData.sample">
              <el-option
                v-for="item in 10"
                :key="item"
                :label="`${$t('message.qt_sample')}${item}`"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('message.qt_analysisResult')">
            <el-table
              ref='batchingTable'
              border
              stripe
              size="mini"
              height="auto"
              :data="tableData"
              highlight-current-row
              @current-change="handleCurrentRowChange"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                fixed="left"
                width="55">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                :label="$t('message.qt_materials')">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="Fe">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="CaO">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="SiO2">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="MgO">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="AI2O3">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="S">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="p">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="TIO2">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="K2O">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="Na2O">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="ZnO">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="Zn">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                label="Mn">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                :label="$t('message.qt_proportion')" width="100">
              </el-table-column>
              <el-table-column
                prop=""
                align="center"
                :label="$t('message.qt_weight')">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">{{ $t('message.qt_submit') }}</el-button>
      <el-button @click="handleClose">{{ $t('message.qt_cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'batching-add-form',
  props: {
    visible: Boolean
  },
  data () {
    return {
      formData: {
        type: null,
        sample: null
      },
      rules: {
        type: [
          { required: true, message: '请选择物料', trigger: 'change' }
        ],
        sample: [
          { required: true, message: '请选择样本', trigger: 'change' }
        ]
      },
      options: [],
      defaultProps: {
        children: 'children',
        label: 'text',
        value: 'id'
      },
      tableData: []
    }
  },
  methods: {
    getOptions () {
      this.$axios.get(`${process.env.API_HOST}furnace/material/tree`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status) {
              this.$message(res.data.message)
              this.options = res.data.data.children
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleChange () {

    },
    handleClose () {
      this.$emit('form-close')
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
    handleSubmit () {
      this.$emit('form-submit')
      this.handleClose()
    },
    handleCurrentRowChange () {

    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  mounted () {
    this.getOptions()
  }
}
</script>
