import Vue from 'vue'
import Router from 'vue-router'
// 换主题
//
// import '../../element-variables.scss'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: 'testauto',
    meta: { title: '接口自动化测试', icon: 'el-icon-position' },
    children: [
      {
        path: '/ProjectManager',
        name: 'ProjectManager',
        component: () => import('@/views/autotest/ProjectManager'),
        meta: { title: '服务列表', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/InterfaceManager',
        name: 'InterfaceManager',
        component: () => import('@/views/autotest/Interface'),
        meta: { title: '接口列表', icon: 'el-icon-s-promotion' },
        hidden: true
      },
      {
        path: '/CaseManager',
        name: 'CaseManager',
        component: () => import('@/views/autotest/CaseManager'),
        meta: { title: '接口用例列表', icon: 'el-icon-s-promotion' },
        hidden: true
      },
      {
        path: '/Casedetail',
        name: 'Casedetail',
        component: () => import('@/views/autotest/Casedetail'),
        meta: { title: '接口详情页面', icon: 'el-icon-s-promotion' },
        hidden: true
      },
      {
        path: '/ParamManager',
        name: 'ParamManager',
        component: () => import('@/views/autotest/ParamManager'),
        meta: { title: '公用变量管理', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/PreManager',
        name: 'PreManager',
        component: () => import('@/views/autotest/PreManager'),
        meta: { title: '处理器管理', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/ConfigManager',
        name: 'ConfigManager',
        component: () => import('@/views/autotest/ConfigManager'),
        meta: { title: '配置管理', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/LabelManager',
        name: 'LabelManager',
        component: () => import('@/views/autotest/LabelManager'),
        meta: { title: '标签管理', icon: 'el-icon-s-promotion' },
      },
      {
        path: '/ExectedLogManager',
        name: 'ExectedLogManager',
        component: () => import('@/views/autotest/ExectedLogManager'),
        meta: { title: '日志列表', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/TaskManager',
        name: 'TaskManager',
        component: () => import('@/views/autotest/TaskManager'),
        meta: { title: '任务管理', icon: 'el-icon-s-promotion' },
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
