import lazyLoading from './lazyLoading'

export default {
  name: '校园建筑',
  path: '/charts',
  meta: {
    icon: 'fa-institution',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('charts', true),

  children: [
    {
      name: '校区管理',
      path: 'zone',
      component: lazyLoading('charts/Zone'),
      meta: {
        link: 'charts/Zone.vue'
      }
    },
    {
      name: '建筑分类',
      path: 'peity',
      component: lazyLoading('charts/BuildingType'),
      meta: {
        link: 'charts/BuildingType.vue'
      }
    },
    {
      name: '建筑实体',
      path: 'chartist',
      component: lazyLoading('charts/Buildings'),
      meta: {
        link: 'charts/Buildings.vue'
      }
    }
  ]
}
