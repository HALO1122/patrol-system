// sockte
import store from '@/store'
import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'

export function openSocket() {
  const scoketServer = store.getters.scoket
  // 建立socket连接
  Vue.use(new VueSocketIo({
    debug: false,
    connection: scoketServer
  })
  )
}
