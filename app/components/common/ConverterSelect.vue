<template>
  <el-dialog
    title="选择转炉"
    fullscreen
    center
    :visible="visible"
    @close="closeSelect"
    v-loading="loading"
    element-loading-text="加载转炉数据中"
    element-loading-spinner="el-icon-loading">
    <el-form class="converter-select-form" v-if="converter_list.length!==0">
      <el-radio-group v-model="converter_index">
        <el-radio v-for="(item,index) in converter_list" :label="item.id" :key="index" border>{{`转炉编号：${item.converterNum}`}}</el-radio>
      </el-radio-group>
    </el-form>
    <div v-if="converter_list.length!==0" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSelect">确 定</el-button>
      <el-button @click="closeSelect">取 消</el-button>
    </div>
    <p class="no-data" v-else>没有转炉数据<router-view class="to-maintenance" v-if="isAdmin" :to="`/${language}/maintenance`">去添加</router-view></p>
  </el-dialog>
</template>

<script>
export default {
  name: 'converter-select',
  props: {
    visible: Boolean
  },
  data () {
    return {
      loading: false,
      noData: false
    }
  },
  computed: {
    converter_index: {
      get () {
        return this.$store.state.converter.id
      },
      set (value) {
        this.$store.dispatch('setConverterId', value)
      }
    },
    converter_list () {
      return this.$store.state.converter.list
    },
    isAdmin () {
      return this.$store.state.user.role === 'admin'
    }
  },
  methods: {
    openSelect () {
      this.$emit('open')
    },
    closeSelect () {
      this.$emit('close')
    },
    handleSelect () {
      this.$emit('close')
      this.$emit('selected')
    },
    loadList () {
      this.loading = true
      this.$axios.get(`${process.env.API_HOST}converter/converterinfo/selectinfo`)
        .then((res) => {
          if (res.status === 200) {
            this.$message(`${res.data.message}`)
            if (res.data.status) {
              this.$store.dispatch('setConverterList', res.data.data)
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.noData = true
        })
        .then(() => {
          this.loading = false
        })
    }
  },
  mounted () {
    if (this.converter_list.length === 0) {
      this.loadList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .converter-select-form {
    text-align: center;
  }
  .no-data {
    text-align: center;
  }
</style>
