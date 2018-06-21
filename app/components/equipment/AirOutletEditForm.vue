<template>
  <el-dialog center top="0" title="风口设备更换" :visible="visible" @close="handleClose">
    <el-form ref="addForm" size="small" status-icon :rules="rules" :model="formData" v-loading="loading">
      <el-row :gutter="20" type="flex" align="bottom" justify="space-between">
        <el-col :span="12">
          <el-form-item label="更换原因" prop="reason">
            <el-input v-model="formData.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-checkbox v-model="formData.isPulverizedCoal">喷煤</el-checkbox>
            <el-checkbox v-model="formData.isLeak">漏水</el-checkbox>
            <el-checkbox v-model="formData.isBlockade">阻塞</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="直径" prop="diameter">
            <el-input v-model="formData.diameter">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="长度" prop="length">
            <el-input v-model="formData.length">
              <template slot="append">mm</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="角度" prop="angle">
            <el-input v-model="formData.angle">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="使用寿命" prop="life">
            <el-input v-model="formData.life">
            </el-input>
          </el-form-item>
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
  name: 'air-outlet-edit-form',
  props: {
    visible: Boolean,
    item: Object
  },
  data () {
    return {
      loading: false,
      sending: false,
      formData: {
        diameter: null,
        length: null,
        angle: null,
        life: null,
        reason: null,
        isPulverizedCoal: false,
        isLeak: false,
        isBlockade: false
      },
      rules: {
        diameter: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        length: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        angle: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        life: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        reason: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.updateForm()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
