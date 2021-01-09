import Layout from '@/layout'

const depositRouter = {
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
    },
    {
      path: 'evidence',
      component: () => import('@/views/deposit/evidence'),
      name: 'Evidence',
      hidden: true,
      meta: { title: '申请公证' }
    }
  ]
}

export default depositRouter

