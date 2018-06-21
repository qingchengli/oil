<template>
  <el-dialog center top="0" :title="$t('message.qt_addInformation')" :visible="visible" @close="closeMe()" width="60%">
    <el-form :model="form" ref="addForm" label-position="top" :rules="rules">
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
      <el-button type="primary" @click="submitForm">{{$t('message.qt_submit')}}</el-button>
      <el-button @click="closeMe()">{{$t('message.qt_cancel')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'rw-add-form',
  props: {
    visible: Boolean
  },
  data () {
    return {
      form: {
        begin: null,
        end: null,
        state: null,
        duration: null,
        reason: null,
        impact: null
      },
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
          {required: true, message: '请输入weightwet', trigger: 'blur'}
        ],
        impact: [
          {required: true, message: '请输入weightdry', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm () {

    },
    closeMe () {
      this.$emit('close-form')
    }
  }
})
</script>
