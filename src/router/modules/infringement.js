/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const infringementRouter = {
  path: '/infringement',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Infringement',
  meta: {
    title: '区块链侵权取证',
    icon: 'chart'
  },
  children: [
    {
      path: 'apply',
      component: () => import('@/views/infringement/apply'),
      name: 'EvidenceApply',
      meta: { title: '取证申请', noCache: true }
    },
    {
      path: 'list',
      component: () => import('@/views/infringement/list'),
      name: 'EvidenceList',
      meta: { title: '取证列表', noCache: true }
    }
  ]
}

export default infringementRouter
