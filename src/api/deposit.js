import request from '@/utils/request'

export const createDepositItem = (data) =>
  request({
    url: '/evidence/saveEvidence',
    method: 'post',
    data
  })

export const getDepositList = () =>
  request({
    url: '/evidence/getEvidence',
    method: 'post'
  })

export const getNotarizationList = () =>
  request({
    url: '/authority/getAuthority',
    method: 'post'
  })
