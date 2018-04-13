import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/Home')
    },
    {
      name: 'Login',
      path: '/login',
      component: require('../views/auth/Login')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: '*',
      redirect: '/'
    },
    /*
    {
      name: '用户管理',
      path: '/sysCtl/user',
      meta: {
        label: '用户管理',
        link: 'sysCtl/User.vue'
      },
      component: require('../views/sysCtl/User')
    },
    {
      name: '角色功能',
      path: '/sysCtl/role',
      meta: {
        label: '角色功能',
        link: 'sysCtl/Role.vue'
      },
      component: require('../views/sysCtl/Role')
    },
    {
      name: '部门功能',
      path: '/sysCtl/department',
      meta: {
        label: '部门功能',
        link: 'sysCtl/Department.vue'
      },
      component: require('../views/sysCtl/Department')
    },
    {
      name: '权限管理',
      path: '/sysCtl/power',
      meta: {
        label: '权限管理',
        link: 'sysCtl/Power.vue'
      },
      component: require('../views/sysCtl/Power')
    },
    {
      name: '系统配置',
      path: '/sysCtl/system',
      meta: {
        label: '系统配置',
        link: 'sysCtl/System.vue'
      },
      component: require('../views/sysCtl/System')
    },
    {
      name: '操作日志',
      path: '/sysCtl/logs',
      meta: {
        label: '操作日志',
        link: 'sysCtl/Logs.vue'
      },
      component: require('../views/sysCtl/Logs')
    },
    {
      name: '流量统计',
      path: '/sysCtl/requests',
      meta: {
        label: '流量统计',
        link: 'sysCtl/Requests.vue'
      },
      component: require('../views/sysCtl/Requests')
    },
    {
      name: '用户统计',
      path: '/sysCtl/customers',
      meta: {
        label: '用户统计',
        link: 'sysCtl/Customers.vue'
      },
      component: require('../views/sysCtl/Customers')
    }
    
    */
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {

  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
