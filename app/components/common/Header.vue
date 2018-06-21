<template>
   <el-header>
     <h1>
       <div class="brand"><img src="@/assets/img/logo.png" alt=""></div>
       <menu-collapse></menu-collapse>
       <router-link :to='`/${$store.state.lang.language}/index`'>{{$t('message.title_systemName')}}</router-link>
       <lang-select></lang-select>
      </h1>
      <el-menu mode="horizontal" background-color="#3ac9d6" text-color="#fff" active-text-color="#fff">
        <el-menu-item index="1">
          <user-info></user-info>
        </el-menu-item>
        <el-menu-item index="2"><a class="log-out" @click="logOut">{{$t('message.logout')}}</a></el-menu-item>
      </el-menu>
    </el-header>
</template>
<script>
import UserInfo from './UserInfo'
import LangSelect from './LangSelect.vue'
import MenuCollapse from './MenuCollapse.vue'
export default {
  name: 'admin-header',
  components: {
    UserInfo,
    LangSelect,
    MenuCollapse
  },
  data () {
    return {
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push(`/${this.$store.state.lang.language}/login`)
        location.reload()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #3ac9d6;
    h1 {
      display: flex;
      color: #ffffff;
      .brand {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -20px;
        width: 210px;
      }
      >a {
        font-size: 24px;
        letter-spacing: 2px;
        line-height: 60px;
      }
    }
    .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: none !important;
    }
    .el-menu--horizontal>.el-menu-item{
        font-size: 0;
        border-bottom: none;
        a {
        display: inline-block;
        height: 100%;
        font-size: 16px;
        &.log-out {
          padding: 0 20px;
          margin: 0 -20px;
        }
      }
    }
  }
</style>
