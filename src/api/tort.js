import request from '@/utils/request'

export const saveTort = (data) => {
  return request({
    url: `/tort/saveTort?author=${data.author}&url=${data.url}`,
    method: 'post'
  })
}

export const getTort = () => {
  return request({
    url: '/tort/getTort',
    method: 'post'
  })
}
