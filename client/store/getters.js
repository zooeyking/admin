const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items
const componententry = state => {
  return state.menu.items.filter(c => c.meta && c.meta.label === 'Components')[0]
}
////以下是SSO数据管理
const systems = state => state.systemControl.systems
const userList = state => state.systemControl.systems.userList
const currentUser = state => state.systemControl.systems.currentUser
//const systems = state => state.systemControl.systems

export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  componententry,
  systems,
  userList,
  currentUser
}

