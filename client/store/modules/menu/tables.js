import lazyLoading from './lazyLoading'

export default {
  name: '系统管理',
  meta: {
    icon: 'fa-database',
    expanded: false
  },

  children: [
    {
      name: '用户管理',
      path: '/tables/user',
      meta: {
        label: '用户管理',
        link: 'tables/User.vue'
      },
      component: lazyLoading('tables/User')
    },
    {
      name: '角色功能',
      path: '/tables/role',
      meta: {
        label: '角色功能',
        link: 'tables/Role.vue'
      },
      component: lazyLoading('tables/Role')
    },
    {
      name: '部门功能',
      path: '/tables/department',
      meta: {
        label: '部门功能',
        link: 'tables/Department.vue'
      },
      component: lazyLoading('tables/Department')
    },
    {
      name: '系统配置',
      path: '/tables/system',
      meta: {
        label: '系统配置',
        link: 'tables/System.vue'
      },
      component: lazyLoading('tables/System')
    },
    {
      name: '操作日志',
      path: '/tables/logs',
      meta: {
        label: '操作日志',
        link: 'tables/Logs.vue'
      },
      component: lazyLoading('tables/Logs')
    }
  ]
}
