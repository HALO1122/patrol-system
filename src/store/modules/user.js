const state = {
  token: '',
  name: '',
  scoket: '',
  sessionId: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_SOCKET: (state, scoket) => {
    state.scoket = scoket
  },
  SET_SESSIONID: (state, sessionId) => {
    state.sessionId = sessionId
  }
}

const actions = {
  token({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  scoket({ commit }, scoket) {
    commit('SET_SOCKET', scoket)
  },
  sessionId({ commit }, sessionId) {
    commit('SET_SESSIONID', sessionId)
  }
}

export default {
  state,
  mutations,
  actions
}
