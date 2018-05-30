import lazyLoading from './lazyLoading'

export default {
  name: '校园建筑',
  path: '/campus',
  meta: {
    icon: 'fa-institution',
    expanded: false,
    link: 'campus/index.vue'
  },
  component: lazyLoading('campus', true),

  children: [
    {
      name: '校区管理',
      path: 'zone',
      component: lazyLoading('campus/Zone'),
      meta: {
        link: 'campus/Zone.vue'
      }
    },
    {
      name: '建筑分类',
      path: 'catagory',
      component: lazyLoading('campus/BuildingType'),
      meta: {
        link: 'campus/BuildingType.vue'
      }
    },
    {
      name: '建筑实体',
      path: 'building',
      component: lazyLoading('campus/Buildings'),
      meta: {
        link: 'campus/Buildings.vue'
      }
    }
  ]
}


