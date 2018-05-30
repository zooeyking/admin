import lazyLoading from './lazyLoading'

export default {
  name: '业务管理',
  path: '/affairs',
  meta: {
    label: '业务管理',
    icon: 'fa-laptop',
    expanded: false,
    link: 'affairs/index.vue'
  },
  component: lazyLoading('affairs', true),

  children: [
    {
      name: '信息分类',
      path: 'infoType',
      meta: {
        link: 'affairs/InfoType.vue'
      },
      component: lazyLoading('affairs/InfoType')
    },
    {
      name: '信息管理',
      path: 'information',
      meta: {
        link: 'affairs/Information.vue'
      },
      component: lazyLoading('affairs/Information')
    },
    {
      name: '引导管理',
      path: 'guide',
      meta: {
        link: 'affairs/Guide.vue'
      },
      component: lazyLoading('affairs/Guide')
    },
    {
      name: '活动管理',
      path: 'party',
      meta: {
        link: 'affairs/Party.vue'
      },
      component: lazyLoading('affairs/Party')
    },
    {
      name: '机构分类',
      path: 'organization',
      meta: {
        link: 'affairs/Organization.vue'
      },
      component: lazyLoading('affairs/Organization')
    },
    {
      name: '机构管理',
      path: 'agency',
      meta: {
        link: 'affairs/Agency.vue'
      },
      component: lazyLoading('affairs/Agency')
    }
  ]
}

