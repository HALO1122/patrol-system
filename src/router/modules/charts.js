/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    },
    {
      path: 'china-map',
      component: () => import('@/views/charts/china-map'),
      name: 'ChinaMap',
      meta: { title: 'China Map', noCache: true }
    },
    {
      path: 'word-map',
      component: () => import('@/views/charts/word-map'),
      name: 'WordMap',
      meta: { title: 'Word Map', noCache: true }
    }
  ]
}

export default chartsRouter
