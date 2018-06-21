<template>
  <el-dialog center top="0" :title="`${$t('message.qt_change')}`" :visible="visible" @close="closeMe()">
    <el-form :model="form" :rules="rules" ref="editForm" label-position="top">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="batchno" prop="batchno">
            <el-input v-model="form.batchno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="brandcode" prop="brandcode">
            <el-input v-model="form.brandcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="weightset" prop="weightset">
            <el-input v-model="form.weightset"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="weightwet" prop="weightwet">
            <el-input v-model="form.weightwet"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="weightdry" prop="weightdry">
            <el-input v-model="form.weightdry"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_moisture')}`" prop="moisture">
            <el-input v-model="form.moisture"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="warningMsg()">{{$t('message.qt_change')}}</el-button>
      <el-button @click="closeMe()">{{$t('message.qt_cancel')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'edit-form',
  props: {
    form: Object,
    visible: Boolean,
    editUrl: String
  },
  data () {
    return {
      sending: false,
      rules: {
        batchno: [
          {required: true, message: '请输入batchno', trigger: 'blur'}
        ],
        brandcode: [
          {required: true, message: '请输入brandcode', trigger: 'blur'}
        ],
        weightset: [
          {required: true, message: '请输入weightset', trigger: 'blur'}
        ],
        weightwet: [
          {required: true, message: '请输入weightwet', trigger: 'blur'}
        ],
        weightdry: [
          {required: true, message: '请输入weightdry', trigger: 'blur'}
        ],
        moisture: [
          {required: true, message: '请输入湿气值', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 提示是否修改
    warningMsg () {
      this.$confirm(this.$t('message.qt_confirm'), 'warning', {
        confirmButtonText: this.$t('message.qt_submit'),
        cancelButtonText: this.$t('message.qt_cancel'),
        type: 'warning'
      }).then(() => {
        this.$refs.editForm.validate(res => {
          if (res) {
            this.submitForm()
          } else {
            this.$message.error(this.$t('message.qt_error'))
            return false
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.qt_success')
          })
        })
      })
    },
    // 更新表格
    handleForm () {
      this.$emit('handle-form')
      this.closeMe()
    },
    closeMe () {
      this.$emit('close-form')
    },
    submitForm () {
      this.sending = true
      this.$axios.put(`${process.env.API_HOST}furnace/batch/${this.editUrl}`, this.form).then(data => {
        if (data.status === 200) {
          this.$message.success(this.$t('message.qt_success'))
          if (data.data.status) {
            this.handleForm()
          }
        }
      }).catch(error => {
        console.log(error)
        this.$message.error(this.t('message.qt_error'))
        this.sending = false
      }).then(() => {
        this.sending = false
      })
    }
  }
})
</script>
