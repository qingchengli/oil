import Lang from '@/components/common/Lang'
import Header from '@/components/common/Header'
import Aside from '@/components/common/Aside'
import Login from '@/components/login/Index'
import Records from '@/components/records/Index'
import AccountManagement from '@/components/userManagement/Account'
import AuthManagement from '@/components/userManagement/Auth'
import ChangePass from '@/components/userManagement/ChangePass'
import ComponentAnalysis from '@/components/materialManagement/ComponentAnalysis'
import BatchingControl from '@/components/materialManagement/BatchingControl'
import Tapping from '@/components/tapping/Index'
import TappingInfo from '@/components/tapping/Info'
import HeatRule from '@/components/operation/HeatRule'
import FurnaceWallTemp from '@/components/bfShape/FurnaceWallTemp'
import AirOutlet from '@/components/equipment/AirOutlet'
import materialState from '@/components/materialManagement/materialState'
import shaftSimulation from '@/components/materialManagement/shaftSimulation'
import RwManagement from '@/components/equipment/RwManagement'
import airRule from '@/components/operation/airRule'
import SiloManagement from '@/components/equipment/siloManagement'
import staticPressure from '@/components/bfShape/staticPressure'
import qualityBalance from '@/components/evaluate/qualityBalance'
import minRadio from '@/components/evaluate/minRadio'

export default [
  {
    path: '/:lang',
    component: Lang,
    children: [
      {
        path: '',
        redirect: '/null/login'
      },
      {
        path: 'login',
        meta: {
          title: 'message.title_login'
        },
        components: {
          main: Login
        }
      },
      {
        path: 'accountManagement',
        meta: {
          requiresAuth: true,
          title: 'message.title_accountManagement'
        },
        components: {
          header: Header,
          aside: Aside,
          main: AccountManagement
        }
      },
      {
        path: 'authManagement',
        meta: {
          requiresAuth: true,
          title: 'message.title_authManagement'
        },
        components: {
          header: Header,
          aside: Aside,
          main: AuthManagement
        }
      },
      {
        path: 'changePass',
        meta: {
          requiresAuth: true,
          title: 'message.title_changePass'
        },
        components: {
          header: Header,
          aside: Aside,
          main: ChangePass
        }
      },
      {
        path: 'records',
        meta: {
          requiresAuth: true,
          title: 'message.title_records'
        },
        components: {
          header: Header,
          aside: Aside,
          main: Records
        }
        // beforeEnter: requireAuth
      },
      {
        path: 'componentAnalysis',
        meta: {
          requiresAuth: true,
          title: 'message.title_componentAnalysis'
        },
        components: {
          header: Header,
          aside: Aside,
          main: ComponentAnalysis
        }
      },
      {
        path: 'batchingControl',
        meta: {
          requiresAuth: true,
          title: 'message.title_batchingControl'
        },
        components: {
          header: Header,
          aside: Aside,
          main: BatchingControl
        }
      },
      {
        path: 'tapping',
        meta: {
          requiresAuth: true,
          title: 'message.title_tappingOverview'
        },
        components: {
          header: Header,
          aside: Aside,
          main: Tapping
        }
      },
      {
        path: 'tappingInfo',
        meta: {
          requiresAuth: true,
          title: 'message.title_tappingInfo'
        },
        components: {
          header: Header,
          aside: Aside,
          main: TappingInfo
        }
      },
      {
        path: 'heatRule',
        meta: {
          requiresAuth: true,
          title: 'message.title_heatRule'
        },
        components: {
          header: Header,
          aside: Aside,
          main: HeatRule
        }
      },
      {
        path: 'airRule',
        meta: {
          requiresAuth: true,
          title: 'message.qt_airRule'
        },
        components: {
          header: Header,
          aside: Aside,
          main: airRule
        }
      },
      {
        path: 'furnaceWallTemp',
        meta: {
          requiresAuth: true,
          title: 'message.title_furnaceWallTemp'
        },
        components: {
          header: Header,
          aside: Aside,
          main: FurnaceWallTemp
        }
      },
      {
        path: 'airOutlet',
        meta: {
          requiresAuth: true,
          title: 'message.title_airOutlet'
        },
        components: {
          header: Header,
          aside: Aside,
          main: AirOutlet
        }
      },
      {
        path: 'shaftSimulation',
        meta: {
          requiresAuth: true,
          title: 'message.qt_shaftSimulation'
        },
        components: {
          header: Header,
          aside: Aside,
          main: shaftSimulation
        }
      },
      {
        path: 'materialState',
        meta: {
          requiresAuth: true,
          title: 'message.qt_materialState'
        },
        components: {
          header: Header,
          aside: Aside,
          main: materialState
        }
      },
      {
        path: 'RwManagement',
        meta: {
          requiresAuth: true,
          title: 'message.qt_RwManagement'
        },
        components: {
          header: Header,
          aside: Aside,
          main: RwManagement
        }
      },
      {
        path: 'staticPressure',
        meta: {
          requiresAuth: true,
          title: 'message.qt_static'
        },
        components: {
          header: Header,
          aside: Aside,
          main: staticPressure
        }
      },
      {
        path: 'SiloManagement',
        meta: {
          requiresAuth: true,
          title: 'message.qt_SiloManagement'
        },
        components: {
          header: Header,
          aside: Aside,
          main: SiloManagement
        }
      },
      {
        path: 'qualityBalance',
        meta: {
          requiresAuth: true,
          title: 'message.qt_quality'
        },
        components: {
          header: Header,
          aside: Aside,
          main: qualityBalance
        }
      },
      {
        path: 'minRadio',
        meta: {
          requiresAuth: true,
          title: 'message.qt_MinFuelRatio'
        },
        components: {
          header: Header,
          aside: Aside,
          main: minRadio
        }
      }
    ]
  }
]
