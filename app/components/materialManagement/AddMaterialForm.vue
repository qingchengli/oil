<template>
  <el-dialog center top="0" :title="$t('message.qt_addInformation') + $t('message.qt_materials')" :visible="visible" @close="handleClose">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form ref="addForm" size="small" label-position="top" status-icon :rules="rules" :model="formData" label-width="80px" v-loading="loading">
          <el-form-item :label="$t('message.qt_brandcode')" prop="brandcode">
            <el-input v-model="formData.brandcode"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.qt_brandname')" prop="brandname">
            <el-input v-model="formData.brandname"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.qt_materialtype')" prop="materialtype">
            <el-select v-model="formData.materialtype" placeholder="请选择">
              <el-option v-for="(item, index) in materialtypes" :key="index" :label="item.descr" :value="item.materialtype"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('message.qt_descr')" prop="descr">
            <el-input type="textarea" autosize v-model="formData.descr"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm" v-loading="sending">{{ $t('message.qt_submit') }}</el-button>
      <el-button @click="handleClose">{{ $t('message.qt_cancel') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'add-material-form',
  props: {
    visible: Boolean
  },
  data () {
    return {
      loading: false,
      sending: false,
      formData: {
        brandcode: null,
        brandname: null,
        materialtype: null,
        descr: null
      },
      rules: {
        brandcode: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        brandname: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        materialtype: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        descr: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
