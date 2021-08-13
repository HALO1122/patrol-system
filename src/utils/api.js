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

// 考试列表
export function getSessions() {
  return request({
    url: '/patrol/sessions/',
    method: 'get'
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

// 异常警报
export function abnormalType() {
  return request({
    url: '/patrol/session/' + sessionId + '/monitor_type/',
    method: 'get'
  })
}

// 监考统计
export function teacherInfo() {
  return request({
    url: '/patrol/session/' + sessionId + '/teacher_info/',
    method: 'get'
  })
}

// 考生热度统计
export function EntryArea() {
  return request({
    url: '/patrol/session/' + sessionId + '/area/',
    method: 'get'
  })
}
