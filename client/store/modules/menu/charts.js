import lazyLoading from './lazyLoading'

export default {
  name: '页面管理',
  path: '/charts',
  meta: {
    icon: 'fa-files-o',
    expanded: false,
    link: 'charts/index.vue'
  },
  component: lazyLoading('charts', true),

  children: [
    {
      name: '模版管理',
      path: 'chartist',
      component: lazyLoading('charts/Chartist'),
      meta: {
        link: 'charts/Chartist.vue'
      }
    },
    {
      name: '页面权限',
      path: 'chartjs',
      component: lazyLoading('charts/Chartjs'),
      meta: {
        link: 'charts/Chartjs.vue'
      }
    },
    {
      name: 'Peity',
      path: 'peity',
      component: lazyLoading('charts/Peity'),
      meta: {
        link: 'charts/Peity.vue'
      }
    },
    {
      name: 'Plotly',
      path: 'plotly',
      component: lazyLoading('charts/Plotly'),
      meta: {
        link: 'charts/Plotly.vue'
      }
    }
  ]
}
