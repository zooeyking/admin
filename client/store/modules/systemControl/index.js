import * as types from '../../mutation-types'


const state = {
  systems: {
    userList: [],
    currentUser: {},
    roleList: [],
    role: {},
    appSrcList: [],
    optionLogs: {},
    department: {},
    systemConfig: {}
  }
}

const getters = {
  listData (state) {
    return state.systems.userList
  },
  rolesData (state) {
    return state.systems.roleList
  },
  appList (state) {
    return state.systems.appSrcList
  }
}

const mutations = {
  [types.SET_SYS_USERLIST] (state, list) {
    state.systems.userList = list
  },
  [types.SET_SYS_CURRENTUSER] (state, user) {
    state.systems.currentUser = user
  },
  [types.SET_SYS_ROLELIST] (state, list) {
    state.systems.roleList = list
  },
  [types.SET_SYS_APPSRCLIST] (state, list) {
    state.systems.appSrcList = list
  }
}

export default {
  state,
  mutations,
  getters
}
