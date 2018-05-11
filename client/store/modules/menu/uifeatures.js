import lazyLoading from './lazyLoading'

export default {
  meta: {
    label: '业务管理',
    icon: 'fa-laptop',
    expanded: false
  },

  children: [
    {
      name: '服务分类',
      path: '/server-type',
      meta: {
        link: 'affairs/ServerType.vue'
      },
      component: lazyLoading('affairs/ServerType')
    },
    {
      name: '信息管理',
      path: '/information',
      meta: {
        link: 'affairs/Information.vue'
      },
      component: lazyLoading('affairs/Information')
    },
    {
      name: '引导管理',
      path: '/guide',
      meta: {
        link: 'affairs/Guide.vue'
      },
      component: lazyLoading('affairs/Guide')
    },
    {
      name: '活动管理',
      path: '/party',
      meta: {
        link: 'affairs/Party.vue'
      },
      component: lazyLoading('affairs/Party')
    },
    {
      name: '机构分类',
      path: '/organization',
      meta: {
        link: 'affairs/Organization.vue'
      },
      component: lazyLoading('affairs/Organization')
    },
    {
      name: '机构管理',
      path: '/agency',
      meta: {
        link: 'affairs/Agency.vue'
      },
      component: lazyLoading('affairs/Agency')
    }
  ]
}
