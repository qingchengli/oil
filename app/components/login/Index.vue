<template>
    <div id="login">
        <el-card class="login-card">
            <div slot="header">
                <h2>高炉专家系统</h2>
            </div>
            <div>
                <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm('loginForm')" class="login-button"  :loading="loading">{{loading ? `${$t('message.title_login')}...` : `${$t('message.title_login')}`}}</el-button>
                        <!-- <el-button type='primary' @click="switchLang">切换语言</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.loginForm.password !== '') {
          this.$refs.loginForm.validateField('password')
        }
        callback()
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ validator: validateUser, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      value1: '',
      loading: false
    }
  },
  computed: {
    language () {
      return this.$store.state.lang.language
    },
    isLogged () {
      return this.$store.state.user.logged
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      let formData = new FormData()
      for (let i in this.loginForm) {
        formData.append(i, this.loginForm[i])
      }
      this.loading = true
      this.$axios.post(`${process.env.API_HOST}cms/dologin`, formData)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status) {
              this.getUserInfo()
            } else {
              this.$message.error('登录失败')
              this.loading = false
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('登录失败')
          this.loading = false
        })
    },
    getUserInfo () {
      this.$axios.all([this.$axios.get(`${process.env.API_HOST}cms/user/getUserInfo`), this.$axios.get(`${process.env.API_HOST}cms/user/getRoleList`)])
        .then(this.$axios.spread((res1, res2) => {
          if (res1.status === 200 && res2.status === 200) {
            if (res1.data.status && res2.data.status) {
              this.$store.dispatch('Login', {userInfo: res1.data.data, roles: res2.data.data})
              if (this.$store.state.user.roles.indexOf('Admin_Role') === -1) {
                this.$router.push(`/${this.language}/componentAnalysis`)
              } else {
                this.$router.push(`/${this.language}/componentAnalysis`)
              }
            }
          }
        }))
        .catch((err) => {
          console.log(err)
          this.$message.error('请求超时')
          this.loading = false
        })
        .then(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    if (this.logged) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url('../../assets/img/background.jpg') no-repeat;
  background-size: cover;
  .login-card {
    width: 400px;
    h2 {
      text-align: center;
    }
    .login-button {
      width: 100%;
    }
  }
}
</style>
