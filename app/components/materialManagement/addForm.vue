<template>
  <el-dialog center top="0" :title="$t('message.qt_addInformation')" :visible="visible" @close="closeMe()" width="60%">
    <el-form :model="form" ref="addForm" label-position="top" :rules="rules">
      <el-row :gutter="20">
        <!-- endtime -->
        <el-col :span="8">
          <el-form-item :label="`${$t('message.qt_endTime')}`" prop="endtime">
           <el-date-picker v-model="form.endtime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item :label="`${$t('message.qt_typ')}`" prop="typ">
              <el-select v-model="form.typ" placeholder="请选择">
                <el-option v-for="item in typList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
      <el-button type="primary"  @click="submitForm" :loading="sending">{{$t('message.qt_submit')}}</el-button>
      <el-button @click="closeMe()">{{$t('message.qt_cancel')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'add-form',
  props: {
    visible: Boolean
  },
  data () {
    return {
      sending: false,
      form: {
        endtime: null,
        typ: null,
        brandcode: null,
        weightset: null,
        weightdry: null,
        weightwet: null,
        moisture: null
      },
      rules: {
        endtime: [
          {required: true, message: '请输入结束时间', trigger: 'blur'}
        ],
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
        ],
        typ: [
          {required: true, message: '请输入典型值', trigger: 'blur'}
        ]
      },
      dialogFormVisible: false,
      typList: [
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'O',
          label: 'O'
        }
      ]
    }
  },
  methods: {
    // 刷新列表
    handleForm () {
      this.$emit('handle-form')
      this.sending = false
      this.closeMe()
      this.$refs.addForm.resetFields()
    },
    closeMe () {
      this.$emit('close-form')
    },
    submitForm () {
      this.$refs.addForm.validate(valid => {
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
      this.$axios({
        method: 'post',
        data: {},
        url: `${process.env.API_HOST}furnace/batch`
      }).then(data => {
        if (data.status === 200) {
          this.$message.success('添加成功')
          this.handleForm()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求出错')
        this.sending = false
      })
    }
  }
})
</script>
