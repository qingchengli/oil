<template>
  <div class="page">
    <div class="page-title">
      <h2>{{$t('message.title_changePass')}}</h2>
    </div>
    <div class="page-content">
      <div class="page-shadow-content show-shadow">
        <el-form :model="formData" status-icon label-position="top" :rules="rules" ref="passForm" class="pass-form" label-width="100px">
          <el-form-item :label="$t('message.qt_oldPassword')" prop="oldPass">
            <el-input type="password" v-model="formData.oldPass" placeholder="请先验证原密码"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.qt_newPassword')" prop="newPass">
            <el-input type="password" v-model="formData.newPass" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item :label="$t('message.qt_confirmPassword')" prop="checkPass">
            <el-input type="password" v-model="formData.checkPass" auto-complete="off" placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm('passForm')" v-loading="sending">{{$t('message.qt_submit')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'change-password',
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      } else {
        if (this.formData.checkPass) {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      sending: false,
      formData: {
        oldPass: null,
        newPass: null,
        checkPass: null
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入原密码', trigger: 'change' }
        ],
        newPass: [
          { validator: validatePass, trigger: 'change' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'change' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'change' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changePass()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changePass () {
      this.sending = true
      this.$axios.put(`${process.env.API_HOST}cms/changePassword`, this.formData)
        .then((res) => {
          if (res.status === 200) {
            this.$message(res.data.message)
            if (res.data.status) {
              this.logOut()
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          this.sending = false
        })
    },
    logOut () {
      this.$axios.post(`${process.env.API_HOST}cms/logout`)
        .then((res) => {
          if (res.status === 200) {
            this.$store.dispatch('LogOut')
            this.$router.push(`/${this.$store.state.lang.language}/login`)
          }
        })
    }
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
    .page-shadow-content {
      flex: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .pass-form {
        margin: auto;
        width: 50%;
        max-width: 600px;
        min-width: 100px;
      }
    }
  }
}
</style>
