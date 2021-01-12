import request from '@/utils/request'

export function defaultKaptcha() {
    return request({
        url:'/kaptcha/defaultKaptcha',
        method:'get',
        responseType:'blob'
    })
}

export function checkVerifyCode(code) {
    return request({
        url:'/kaptcha/checkVerifyCode',
        method:'post',
        params:{
           verificationCode:code,
        }
    })
}