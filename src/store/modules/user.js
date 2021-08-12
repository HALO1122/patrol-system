const state = {
  token: '',
  name: '',
  scoket: ''
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
  }
}

const actions = {
  token({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  scoket({ commit }, scoket) {
    commit('SET_SOCKET', scoket)
  }
}

export default {
  state,
  mutations,
  actions
}
