import request from '@/utils/request'

var tenantId = ''; var sessionId = 50745
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

// 考生状态
export function EntryStatus() {
  return request({
    url: '/patrol/session/' + sessionId + '/status/',
    method: 'get'
  })
}

// 在线人数统计
export function EntryOnline() {
  return request({
    url: '/patrol/session/' + sessionId + '/online/',
    method: 'get'
  })
}

// 考生监控随机数
export function EntryMonitor() {
  return request({
    url: '/patrol/session/' + sessionId + '/monitor/',
    method: 'get'
  })
}

