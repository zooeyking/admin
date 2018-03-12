import lazyLoading from './lazyLoading'

export default {
  meta: {
    label: '终端管理',
    icon: 'fa-laptop',
    expanded: false
  },

  children: [
    {
      name: '终端权限',
      path: '/buttons',
      meta: {
        link: 'ui/Buttons.vue'
      },
      component: lazyLoading('ui/Buttons')
    },
    {
      name: '分组管理',
      path: '/form',
      meta: {
        link: 'ui/Form.vue'
      },
      component: lazyLoading('ui/Form')
    },
    {
      name: '终端维护',
      path: '/typography',
      meta: {
        link: 'ui/Typography.vue'
      },
      component: lazyLoading('ui/Typography')
    },
    {
      name: 'Icons',
      path: '/icons',
      meta: {
        link: 'ui/Icons.vue'
      },
      component: lazyLoading('ui/Icons')
    }
  ]
}
