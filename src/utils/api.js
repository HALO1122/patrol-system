import request from '@/utils/request'

var tenantId = ''
if (document.URL.indexOf('session') !== -1) {
  tenantId = document.URL.replace('"', '').split('session')[1].split('/')[1]
} else {
  tenantId = 85
}
console.log(tenantId, 'tenantId')

// 登录接口
export function PatrolLogin(data) {
  return request({
    url: '/patrol/' + tenantId + '/login/',
    method: 'post',
    data
  })
}
