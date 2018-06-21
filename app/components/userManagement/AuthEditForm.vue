<template>
  <el-dialog center top="0" title="编辑" :visible="visible" @close='handleClose'>
    <el-form ref="editForm" label-position="top" status-icon :rules="rules" :model="formData">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色" prop="roles">
            <el-select v-model="formData.roles" placeholder="请选择角色">
              <el-option
                  label="普通用户"
                  value="">
                </el-option>
                <el-option
                  label="管理员"
                  value="">
                </el-option>
                <el-option
                  label="操作人员"
                  value="">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="description">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="formData.description">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'auth-edit-form',
  props: {
    visible: Boolean,
    item: Object
  },
  data () {
    return {
      sending: false,
      formData: {
        username: null,
        roles: null,
        description: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        roles: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      isIndeterminate: true,
      checkAll: false
    }
  },
  watch: {
    visible (val) {
      val && this.updateForm()
    }
  },
  methods: {
    updateForm () {
      if (this.item.id) {
        this.formData.username = this.item.username
        this.formData.roles = this.item.roles
        this.formData.description = this.item.description
      }
      this.validateForm()
    },
    handleClose () {
      this.$emit('form-close')
    },
    validateForm () {
      this.$nextTick(() => {
        this.$refs['editForm'].validate((valid) => {})
      })
    },
    handleSubmit () {
      this.$emit('form-submit')
      this.handleClose()
    },
    submitForm () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          this.submitEdit()
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    submitEdit () {
      this.sending = true
      this.$axios.put(`${process.env.API_HOST}converter/taphole/update/${this.item.id}`, this.formData)
        .then((res) => {
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
