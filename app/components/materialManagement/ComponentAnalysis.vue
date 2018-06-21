<template>
  <div class="page">
    <div class="page-aside">
      <h2>{{$t('message.title_componentAnalysis')}}</h2>
      <material-tree :tree-data="materialTreeData" @selected="handleMaterialTreeSelcted"></material-tree>
      <div class="aside-action-wrap">
        <el-button type="primary" size="small" plain @click="openAddMaterialModal">{{$t('message.qt_addInformation')+$t('message.qt_materials')}}</el-button>
        <el-button type="primary" size="small" plain @click="openAddAnalysisModal">{{$t('message.qt_addInformation')+$t('message.qt_analysis')}}</el-button>
      </div>
    </div>
    <div class="page-content">
      <div class="tabs-wrap">
        <el-tabs class="material-tabs grow-tabs" v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            class="show-shadow"
            v-for="(item, index) in editableTabs"
            :key="item.id"
            :label="item.text"
            :name="item.id"
            :data-index="index">
            <analysis-table :id="item.id"></analysis-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <add-material-form :visible="showAddMaterial" @form-close="closeAddMaterialModal" @form-submit="getMaterialTree"></add-material-form>
    <add-analysis-form :visible="showAddAnalysis" @form-close="closeAddAnalysisModal"></add-analysis-form>
  </div>
</template>

<script>
import MaterialTree from './MaterialTree'
import AnalysisTable from './AnalysisTable'
import AddMaterialForm from './AddMaterialForm'
import AddAnalysisForm from './AddAnalysisForm'

export default {
  name: 'component-analysis',
  components: {
    MaterialTree,
    AnalysisTable,
    AddMaterialForm,
    AddAnalysisForm
  },
  data () {
    return {
      materialTreeData: [],
      editableTabsValue: '',
      editableTabs: [],
      showAddMaterial: false,
      showAddAnalysis: false
    }
  },
  methods: {
    getMaterialTree () {
      this.$axios.get(`${process.env.API_HOST}furnace/material/tree`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status) {
              this.$message(res.data.message)
              this.materialTreeData = res.data.data.children
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleMaterialTreeSelcted (data) {
      let isExist = this.editableTabs.find((item) => {
        return item.id === data.id
      })
      isExist ? this.switchTab(isExist.id) : this.addTab(data)
    },
    switchTab (name) {
      this.editableTabsValue = name
    },
    addTab (data) {
      this.editableTabs.push(data)
      this.editableTabsValue = data.id
    },
    removeTab (targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.id === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.id
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.id !== targetName)
    },
    openAddMaterialModal () {
      this.showAddMaterial = true
    },
    closeAddMaterialModal () {
      this.showAddMaterial = false
    },
    openAddAnalysisModal () {
      this.showAddAnalysis = true
    },
    closeAddAnalysisModal () {
      this.showAddAnalysis = false
    }
  },
  mounted () {
    this.getMaterialTree()
  }
}
</script>

<style lang="scss" scoped>
  .page {
    padding: 10px;
    width: 100%;
    flex: auto;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    .page-aside {
      display: flex;
      flex-direction: column;
      flex: none;
      width: 270px;
      margin-right: 10px;
      h2 {
        flex: none;
        margin-bottom: 5px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        border: 1px solid #979797;
      }
      .aside-action-wrap {
        margin-top: 5px;
        padding: 8px;
        border: 1px solid #979797;
        text-align: center;
      }
    }
    .page-content {
      display: flex;
      align-items: stretch;
      flex: auto;
      width: 100%;
      border: 1px solid #979797;
      overflow: hidden;
      .tabs-wrap {
        display: flex;
        align-items: stretch;
        flex: auto;
        width: 100%;
        overflow: hidden;
        .material-tabs {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: stretch;
          flex: auto;
          width: 100%;
          overflow: hidden;
        }
      }
    }
  }
</style>
