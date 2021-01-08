import Layout from '@/layout'

const componentsRouter = {
  path: '/deposit',
  component: Layout,
  redirect: '/deposit/list',
  name: 'Deposit',
  meta: {
    title: '区块链版权存证',
    icon: 'software-mgmt'
  },
  children: [
    {
      path: 'application',
      component: () => import('@/views/deposit/application'),
      name: 'DepositApplication',
      meta: {
        title: '存证申请'
      }
    },
    {
      path: 'list',
      component: () => import('@/views/deposit/list'),
      name: 'DepositList',
      meta: {
        title: '存证列表'
      }
    }
  ]
}

export default componentsRouter

