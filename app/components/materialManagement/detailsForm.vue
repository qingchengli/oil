<template>
  <el-dialog center top="0" :title="`${$t('message.qt_analysis')}`" :visible="visible" @close="closeMe()">
    <el-form :model="form" label-position="top">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="batchno">
            <el-input v-model="form.batchno" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="brandcode">
            <el-input v-model="form.brandcode" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="moisture">
            <el-input v-model="form.moisture" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="weightset">
            <el-input v-model="form.weightset" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="weightdry">
            <el-input v-model="form.weightdry" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="weightwet">
            <el-input v-model="form.weightwet" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="closeMe()">{{$t('message.qt_close')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default ({
  name: 'details-form',
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          batchno: '',
          brandcode: '',
          moisture: '',
          weightset: '',
          weightdry: '',
          weightwet: ''
        }
      }
    },
    visible: Boolean
  },
  data () {
    return {

    }
  },
  methods: {
    // 关闭表格
    closeMe () {
      this.$emit('close-form')
    }
  }
})
</script>
