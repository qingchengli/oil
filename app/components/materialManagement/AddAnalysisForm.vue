<template>
  <el-dialog center top="0" :title="$t('message.qt_addInformation') + $t('message.qt_analysis')" :visible="visible" @close="handleClose">
    <el-form ref="addForm" size="small" status-icon :rules="rules" :model="formData" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item, index) in analysisArr" :key="index">
          <el-form-item :label="item" :prop="item">
            <el-input v-model="formData[item]"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" v-loading="sending">{{ $t('message.qt_submit') }}</el-button>
      <el-button @click="handleClose">{{ $t('message.qt_cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-analysis-form',
  props: {
    visible: Boolean
  },
  data () {
    return {
      analysisArr: [ 'sampletoken', 'lron', 'FeO', 'CaO', 'B3[-]', 'SiO2' ],
      loading: false,
      sending: false,
      formData: {},
      rules: {},
      materialtypes: []
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.updateForm()
        this.getMaterialTypes()
      }
    }
  },
  methods: {
    updateForm () {
      this.$nextTick(() => {
        this.$refs['addForm'].resetFields()
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
      this.sending = true
      this.$axios.post(`${process.env.API_HOST}furnace/material`, this.formData)
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
    getMaterialTypes () {
      this.loading = true
      this.$axios.get(`${process.env.API_HOST}furnace/materialTypes`)
        .then((res) => {
          if (res.status === 200) {
            this.$message(res.data.message)
            if (res.data.status) {
              this.materialtypes = res.data.data
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
    getFormData () {
      this.analysisArr.forEach((item, index) => {
        this.formData[item] = null
        this.rules[item] = [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      })
    }
  },
  mounted () {
    this.getFormData()
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
