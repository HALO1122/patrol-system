import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import * as filters from './filters' // global filters
// echart图表组件
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
