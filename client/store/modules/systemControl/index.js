import * as types from '../../mutation-types';


const state = {
  systems: {
    //用户管理/用户列表数据
    userList: [],

    //用户管理/单个用户管理            
    currentUser: {},

    //单个用户角色信息
    userRoleInfo: [],

    //单个用户部门信息
    userDepartmentInfo: [],

    //角色管理/角色列表数据
    roleList: [],

    //角色管理/单个角色管理
    currentRole: {},

    //单个角色已绑定的用户
    bindedUsers: {},

    //单个角色未绑定的用户
    unbindedUsers: {},

    //系统来源下拉列表数据
    appSrcList: [],

    //部门管理/部门列表数据
    departmentList: [],

    //部门管理/单个部门管理
    currentDepartment: {},

    //权限管理/权限列表数据
    powerList: [],

    //权限管理/单个权限管理
    currentPower: {},

    //系统配置列表数据
    systemList: [],

    //操作日志列表数据
    logList: [],

    //流量统计列表数据
    requestList: [],

    //用户统计列表数据
    customerList: [],

    //用户统计列表数据
    test: []
  }
}

const getters = {
  //用户管理数据列表
  userData (state) {
    return state.systems.userList;
  },

  //用户管理单个用户操作
  user (state) {
    return state.systems.currentUser;
  },

  //用户管理单个用户操作
  userRoleList (state) {
    return state.systems.userRoleInfo;
  },

  //用户管理单个用户操作
  userDepartmentList (state) {
    return state.systems.userDepartmentInfo;
  },

  //角色管理数据列表
  roleData (state) {
    return state.systems.roleList;
  },

  //角色管理单个角色操作
  role (state) {
    return state.systems.currentRole;
  },

  bindedList(state) {
    return state.systems.bindedUsers;
  },

  unbindedList(state) {
    return state.systems.unbindedUsers;
  },

  //系统配置名称列表数据
  appList (state) {
    return state.systems.appSrcList;
  },

  //部门管理数据列表
  departmentData (state) {
    return state.systems.departmentList;
  },

  //部门管理单个部门操作
  department (state) {
    return state.systems.currentDepartment;
  },

  //权限管理数据列表
  powerData (state) {
    return state.systems.powerList;
  },

  //权限管理单个权限
  power (state) {
    return state.systems.currentPower;
  },

  //系统配置数据列表
  systemData (state) {
    return state.systems.systemList;
  },

  //操作日志数据列表
  logData (state) {
    return state.systems.logList;
  },

  //操作日志数据列表
  requestData (state) {
    return state.systems.requestList;
  },

  //操作日志数据列表
  customerData (state) {
    return state.systems.customerList;
  }

}

const mutations = {
  //设置用户管理数据列表
  [types.SET_SYS_USERLIST] (state, list) {
    state.systems.userList = list;
  },

  //设置单个操作用户
  [types.SET_SYS_CURRENTUSER] (state, user) {
    state.systems.currentUser = user;
  },

  //设置单个用户角色信息
  [types.SET_SYS_USERROLEINFO] (state, list) {
    state.systems.userRoleInfo = list;
  },

  //设置单个用户部门信息
  [types.SET_SYS_USERDEPARTMENTINFO] (state, list) {
    state.systems.userDepartmentInfo = list;
  },

  //设置角色管理数据列表
  [types.SET_SYS_ROLELIST] (state, list) {
    state.systems.roleList = list;
  },

  //设置单个操作角色
  [types.SET_SYS_CURRENTROLE] (state, role) {
    state.systems.currentRole = role;
  },

  //系统来源下拉列表数据
  [types.SET_SYS_APPSRCLIST] (state, list) {
    state.systems.appSrcList = list;
  },

  //设置部门管理数据列表
  [types.SET_SYS_DEPARTMENTLIST] (state, list) {
    state.systems.departmentList = list;
  },

  //设置单个操作部门
  [types.SET_SYS_CURRENTDEPARTMENT] (state, department) {
    state.systems.currentDepartment = department;
  },

  //设置权限管理数据列表
  [types.SET_SYS_POWERLIST] (state, list) {
    state.systems.powerList = list;
  },

  //设置当前所操作权限
  [types.SET_SYS_CURRENTPOWER] (state, power) {
    state.systems.currentPower = power;
  },

  //系统配置列表数据
  [types.SET_SYS_SYSTEMLIST] (state, list) {
    state.systems.systemList = list;
  },

  //操作日志列表数据
  [types.SET_SYS_LOGLIST] (state, list) {
    state.systems.logList = list;
  },

  //流量统计列表数据
  [types.SET_SYS_REQUESTLIST] (state, list) {
    state.systems.requestList = list;
  },

  //用户统计列表数据
  [types.SET_SYS_CUSTOMERLIST] (state, list) {
    state.systems.customerList = list;
  }
  
}

export default {
  state,
  mutations,
  getters
}
