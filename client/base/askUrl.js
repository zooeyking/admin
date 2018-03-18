const ip = "http://192.168.1.15:8091"
//用户列表
const userListUrl = ip + '/sso_base_modular/getUserPageJson'
//用户数据更新
const userUpdateUrl = ip + '/sso_base_modular/updateUserInfoByIdJson'
//新用户
const userSaveUrl = ip + '/sso_base_modular/saveUserJson'
//角色列表
const roleListUrl = ip + '/sso_base_modular/getRolePageJson'
//新角色
const roleSaveUrl = ip + '/sso_base_modular/saveRole'
//来源系统
const appSrcListUrl = ip + '/sso_base_modular/getAppConfigAllListJson'
//部门列表
const partmentListUrl = ip + '/sso_base_modular/getDeptListJson'
//新部门
const partmentSaveUrl = ip + '/sso_base_modular/saveDeptJson'



export {
	userListUrl,
	userUpdateUrl,
	userSaveUrl,
	roleListUrl,
	logsListUrl,
	appSrcListUrl,
	partmentListUrl,
	partmentSaveUrl
}