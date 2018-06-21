const urlList = {
  state: {
    list: [
      {
        name: '原料管理',
        title: 'message.title_materialManagement',
        icon: 'el-icon-bf-createtask_fill',
        path: null,
        children: [
          {
            name: '成分分析',
            title: 'message.title_componentAnalysis',
            path: '/componentAnalysis',
            children: []
          },
          {
            name: '装料状态',
            title: 'message.qt_materialState',
            path: '/qt_materialState',
            children: []
          },
          {
            name: '炉身镜像',
            title: 'message.qt_shaftSimulation',
            path: '/shaftSimulation',
            children: []
          },
          {
            name: '配料控制',
            title: 'message.title_batchingControl',
            path: '/batchingControl',
            children: []
          }
        ]
      },
      {
        name: '操作管理',
        title: 'message.title_operation',
        icon: 'el-icon-bf-smallscreen_fill',
        path: null,
        children: [
          // {
          //   name: '布料模型*',
          //   title: 'message.title_componentAnalysis',
          //   path: '/componentAnalysis',
          //   children: []
          // },
          {
            name: '炉热控制',
            title: 'message.title_heatRule',
            path: '/heatRule',
            children: []
          },
          {
            name: '送风制度',
            title: 'message.qt_airRule',
            path: '/airRule',
            children: []
          }
          // {
          //   name: '炉渣模型*',
          //   title: 'message.title_batchingControl',
          //   path: '/batchingControl',
          //   children: []
          // }
        ]
      },
      {
        name: '评估管理',
        title: 'message.title_evaluate',
        icon: 'el-icon-bf-stealth_fill',
        path: null,
        children: [
          // {
          //   name: '质能平衡模型*',
          //   title: 'message.title_componentAnalysis',
          //   path: '/componentAnalysis',
          //   children: []
          // },
          // {
          //   name: '最小燃料比*',
          //   title: 'message.title_componentAnalysis',
          //   path: '/componentAnalysis',
          //   children: []
          // }
        ]
      },
      {
        name: '出铁管理',
        title: 'message.title_tapping',
        icon: 'el-icon-bf-dynamic_fill',
        path: null,
        children: [
          {
            name: '出铁总览',
            title: 'message.title_tappingOverview',
            path: '/tapping',
            children: []
          },
          {
            name: '出铁信息',
            title: 'message.title_tappingInfo',
            path: '/tappingInfo',
            children: []
          }
        ]
      },
      {
        name: '炉型管理',
        title: 'message.title_BFShape',
        icon: 'el-icon-bf-qrcode_fill',
        path: null,
        children: [
          {
            name: '软熔带模型*',
            title: 'message.title_batchingControl',
            path: '/batchingControl',
            children: []
          },
          {
            name: '炉墙温度管理',
            title: 'message.title_furnaceWallTemp',
            path: '/furnaceWallTemp',
            children: [
              {
                name: '渣皮监控系统*',
                title: 'message.qt_monitoringSystem',
                path: '/furnaceWallTemp',
                children: [
                  
                ]
              },
              {
                name: '热负荷监控画面*',
                title: 'message.qt_ThermalMonitoringSystem',
                path: '/furnaceWallTemp',
                children: [
                  
                ]
              }
            ]
          },
          {
            name: '炉身静压*',
            title: 'message.title_tappingInfo',
            path: '/tappingInfo',
            children: []
          },
          {
            name: '操作炉型*',
            title: 'message.title_tappingInfo',
            path: '/tappingInfo',
            children: []
          }
        ]
      },
      {
        name: '高炉长寿管理',
        title: 'message.qt_BFLifeManage',
        icon: 'el-icon-bf-flip_fill',
        path: null,
        children: [
          {
            name: '本体管理',
            title: 'message.title_furnaceWallTemp',
            path: '/furnaceWallTemp',
            children: [
              {
                name: '炉墙温度管理*',
                title: 'message.title_furnaceWallTemp',
                path: '/furnaceWallTemp',
                children: [
                  
                ]
              },
              {
                name: '炉墙温度云图*',
                title: 'message.title_furnaceWallTemp',
                path: '/furnaceWallTemp',
                children: [
                  
                ]
              },
              {
                name: '高炉本体温度*',
                title: 'message.title_furnaceWallTemp',
                path: '/furnaceWallTemp',
                children: [
                  
                ]
              }
            ]
          },
          {
            name: '炉缸侵蚀*',
            title: 'message.title_tappingInfo',
            path: '/tappingInfo',
            children: []
          }
        ]
      },
      {
        name: '设备管理',
        title: 'message.title_equipment',
        icon: 'el-icon-bf-task_fill',
        path: null,
        children: [
          {
            name: '休减风管理',
            title: 'message.qt_RwManagement',
            path: '/RwManagement',
            children: []
          },
          {
            name: '风口管理',
            title: 'message.title_airOutlet',
            path: '/airOutlet',
            children: []
          },
          {
            name: '料仓管理',
            title: 'message.qt_SiloManagement',
            path: '/SiloManagement',
            children: []
          }
        ]
      },
      {
        name: '统计管理',
        title: 'message.qt_StatisticalManagement',
        icon: 'el-icon-bf-brush_fill',
        path: null,
        children: [

        ]
      },
      {
        name: '日志管理',
        title: 'message.title_records',
        icon: 'el-icon-bf-activity_fill',
        path: '/records',
        children: []
      },
      {
        name: '用户管理',
        title: 'message.title_userManagement',
        icon: 'el-icon-bf-addressbook_fill',
        path: null,
        children: [
          {
            name: '账号管理',
            title: 'message.title_accountManagement',
            path: '/accountManagement',
            children: []
          },
          {
            name: '权限管理',
            title: 'message.title_authManagement',
            path: '/authManagement',
            children: []
          },
          {
            name: '修改密码',
            title: 'message.title_changePass',
            path: '/changePass',
            children: []
          }
        ]
      }
    ]
  }
}

export default urlList
