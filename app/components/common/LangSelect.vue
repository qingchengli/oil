<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      {{$t('message.lang')}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="cn">中文</el-dropdown-item>
      <el-dropdown-item command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'lang-select',
  computed: {
    language () {
      return this.$store.state.lang.language
    }
  },
  watch: {
    language () {
      this.switchTips()
    }
  },
  methods: {
    handleCommand (command) {
      this.switchLang(command)
    },
    switchLang (command) {
      this.$store.dispatch('setLanguage', command)
    },
    switchTips () {
      // this.$message(this.$t('message.switch_to') + ' ' + this.$t('message.lang'))
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dropdown {
    margin-left: 50px;
    color: #fff;
    cursor: pointer;
    .el-dropdown-link {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
    }
    .el-dropdown-menu__item {
      color: #606266;
    }
  }
  .el-menu-item i {
    color: #fff;
  }
</style>
