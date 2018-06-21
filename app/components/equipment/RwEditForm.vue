<template>
  <el-dialog center top="0" :title="$t('message.qt_addInformation')" :visible="visible" @close="closeMe()" width="60%">
    <el-form :model="form" ref="editForm" label-position="top" :rules="rules">
      <el-row :gutter="20">
        <!-- endtime -->
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_begin')}`" prop="begin">
            <el-date-picker v-model="form.begin" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_endTime')}`" prop="end">
            <el-date-picker v-model="form.end" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_duration')}`" prop="duration">
            <el-input v-model="form.duration"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_state')}`" prop="state">
            <el-input v-model="form.state"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_reason')}`" prop="reason">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_ImpactPro')}`" prop="impact">
            <el-input v-model="form.impact"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="warningMsg('form')">{{$t('message.qt_submit')}}</el-button>
      <el-button @click="closeMe()">{{$t('message.qt_cancel')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'rw-edit-form',
  props: {
    visible: Boolean,
    form: Object
  },
  data () {
    return {
      rules: {
        begin: [
          {required: true, message: '请输入结束时间', trigger: 'blur'}
        ],
        end: [
          {required: true, message: '请输入batchno', trigger: 'blur'}
        ],
        duration: [
          {required: true, message: '请输入brandcode', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请输入weightset', trigger: 'blur'}
        ],
        reason: [
          {required: true, message: '请输入weightwet', trigger: 'change'}
        ],
        impact: [
          {required: true, message: '请输入weightdry', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    warningMsg (form) {
      this.$confirm(this.$t('message.qt_confirm'), 'warning', {
        confirmButtonText: this.$t('message.qt_submit'),
        cancelButtonText: this.$t('message.qt_cancel'),
        type: 'warning'
      }).then(() => {
        this.$refs.editForm.validate(res => {
          if (res) {
            this.submitForm(form)
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
    submitForm (form) {
      // this.sending = true
      this.$axios.put(`${process.env.API_HOST}furnace/batch/${this.editUrl}`, this.form).then(data => {
        if (data.status === 200) {
          this.$message.success(this.$t('message.qt_success'))
          if (data.data.status) {
            // this.handleForm()
          }
        }
      }).catch(error => {
        console.log(error)
        this.$message.error(this.t('message.qt_error'))
        this.sending = false
      }).then(() => {
        this.sending = false
      })
    },
    closeMe () {
      this.$emit('close-form')
    }
  }
})
</script>
