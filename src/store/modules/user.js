const state = {
  token: '',
  name: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  token({ commit }, token) {
    commit('SET_TOKEN', token)
  }
}

export default {
  state,
  mutations,
  actions
}
