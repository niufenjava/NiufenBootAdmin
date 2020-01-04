/**
 * 登录API
 */
import request from '@/utils/request'

/**
 * 登录接口
 * 如果登录成功，则返回token
 *
 * @param username 登录账号
 * @param password 登录秘密
  {
    'username':'admin',
    'password':'xxxxx'
  }
 * @returns token
  {
    code: 20000,
    data: {
      token: tokenValue
    }
  }
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
