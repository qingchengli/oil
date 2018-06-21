<template>
  <el-aside width='auto' class="show-shadow">
    <el-menu router unique-opened :default-active="$route.path" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-bf-createtask_fill"></i>
          <span slot="title">{{$t('message.title_materialManagement')}}</span>
        </template>
        <el-menu-item :index="`/${language}/componentAnalysis`">
          <span slot="title">{{$t('message.title_componentAnalysis')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/batchingControl`">
          <span slot="title">{{$t('message.title_batchingControl')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/materialState`">
          <span slot="title">{{$t('message.qt_materialState')}}</span>
      </el-menu-item>
      <el-menu-item :index="`/${language}/shaftSimulation`">
          <span slot="title">{{$t('message.qt_shaftSimulation')}}</span>
      </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-bf-smallscreen_fill"></i>
          <span slot="title">{{$t('message.title_operation')}}</span>
        </template>
        <el-menu-item :index="`/${language}/heatRule`">
          <span slot="title">{{$t('message.title_heatRule')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/airRule`">
          <span slot="title">{{$t('message.qt_airRule')}}</span>
        </el-menu-item>
        <!-- <el-menu-item :index="`/${language}/batchingControl`">
          <span slot="title">{{$t('message.title_batchingControl')}}</span>
        </el-menu-item> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-bf-dynamic_fill"></i>
          <span slot="title">{{$t('message.title_tapping')}}</span>
        </template>
        <el-menu-item :index="`/${language}/tapping`">
          <span slot="title">{{$t('message.title_tappingOverview')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/tappingInfo`">
          <span slot="title">{{$t('message.title_tappingInfo')}}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-bf-qrcode_fill"></i>
          <span slot="title">{{$t('message.title_BFShape')}}</span>
        </template>
        <el-menu-item :index="`/${language}/furnaceWallTemp`">
          <span slot="title">{{$t('message.title_furnaceWallTemp')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/staticPressure`">
          <span slot="title">{{$t('message.qt_static')}}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-bf-share_fill"></i>
          <span slot="title">{{$t('message.qt_HFmanagement')}}</span>
        </template>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-bf-flip_fill"></i>
          <span slot="title">{{$t('message.qt_BFLifeManage')}}</span>
        </template>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-bf-stealth_fill"></i>
          <span slot="title">{{$t('message.title_evaluate')}}</span>
        </template>
        <el-menu-item :index="`/${language}/qualityBalance`">
          <span slot="title">{{$t('message.qt_quality')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/minRadio`">
          <span slot="title">{{$t('message.qt_MinFuelRatio')}}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-bf-task_fill"></i>
          <span slot="title">{{$t('message.title_equipment')}}</span>
        </template>
        <el-menu-item :index="`/${language}/airOutlet`">
          <span slot="title">{{$t('message.title_airOutlet')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/RwManagement`">
          <span slot="title">{{$t('message.qt_RwManagement')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/SiloManagement`">
          <span slot="title">{{$t('message.qt_SiloManagement')}}</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-bf-brush_fill"></i>
          <span slot="title">{{$t('message.qt_StatisticalManagement')}}</span>
        </template>
      </el-submenu>
      <el-menu-item :index="`/${language}/records`">
        <i class="el-icon-bf-activity_fill"></i>
        <span slot="title">{{$t('message.title_records')}}</span>
      </el-menu-item>
      <el-submenu index="10">
        <template slot="title">
          <i class="el-icon-bf-addressbook_fill"></i>
          <span slot="title">{{$t('message.title_userManagement')}}</span>
        </template>
        <el-menu-item :index="`/${language}/accountManagement`">
          <span slot="title">{{$t('message.title_accountManagement')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/authManagement`">
          <span slot="title">{{$t('message.title_authManagement')}}</span>
        </el-menu-item>
        <el-menu-item :index="`/${language}/changePass`">
          <span slot="title">{{$t('message.title_changePass')}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'admin-aside',
  data () {
    return {
    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.menu.isCollapse
    },
    language () {
      return this.$store.state.lang.language
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-aside {
    display: flex;
    overflow-x: hidden;
    .el-menu{
      height: 100%;
      // border-color: #37404E;
      &:not(.el-menu--collapse){
        width: 210px;
      }
      [class^="el-icon-"] {
        font-size: 24px;
      }
    }
  }
</style>
