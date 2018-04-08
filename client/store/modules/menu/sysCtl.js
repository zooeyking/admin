import lazyLoading from './lazyLoading'


export default {
  name: '系统管理',
  meta: {
    icon: 'fa-database',
    expanded: true
  },

  children: [
    {
      name: '用户管理',
      path: '/sysCtl/user',
      meta: {
        label: '用户管理',
        link: 'sysCtl/User.vue'
      },
      component: lazyLoading('sysCtl/User')
    },
    {
      name: '角色功能',
      path: '/sysCtl/role',
      meta: {
        label: '角色功能',
        link: 'sysCtl/Role.vue'
      },
      component: lazyLoading('sysCtl/Role')
    },
    {
      name: '部门功能',
      path: '/sysCtl/department',
      meta: {
        label: '部门功能',
        link: 'sysCtl/Department.vue'
      },
      component: lazyLoading('sysCtl/Department')
    },
    {
      name: '权限管理',
      path: '/sysCtl/power',
      meta: {
        label: '权限管理',
        link: 'sysCtl/Power.vue'
      },
      component: lazyLoading('sysCtl/Power')
    },
    {
      name: '系统配置',
      path: '/sysCtl/system',
      meta: {
        label: '系统配置',
        link: 'sysCtl/System.vue'
      },
      component: lazyLoading('sysCtl/System')
    },
    {
      name: '操作日志',
      path: '/sysCtl/logs',
      meta: {
        label: '操作日志',
        link: 'sysCtl/Logs.vue'
      },
      component: lazyLoading('sysCtl/Logs')
    },
    {
      name: '流量统计',
      path: '/sysCtl/requests',
      meta: {
        label: '流量统计',
        link: 'sysCtl/Requests.vue'
      },
      component: lazyLoading('sysCtl/Requests')
    },
    {
      name: '用户统计',
      path: '/sysCtl/customers',
      meta: {
        label: '用户统计',
        link: 'sysCtl/Customers.vue'
      },
      component: lazyLoading('sysCtl/Customers')
    }
  ]
}
