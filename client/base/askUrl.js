import goodStorage from 'good-storage'
import { safe } from './safe'

//请求ip
const ip = "http://192.168.1.80:8093/base/sso_base_modular"

function getParams() {
	let user = goodStorage.session.get('USERINFO')
	console.log(user)
	let safeUser = null
	if(user != undefined) {
		console.log(user)
		safeUser = safe(user)
		console.log(safeUser)
	}else{
		return
	}
	return Object.assign({}, safeUser, {"pageNum": 1,"pageSize": 100})
}

//公共请求参数
const CommonParams = getParams()


//公共回调
const options = {
  param: 'callback'
}

//用户退出
const logOutUrl = 'http://192.168.1.80:8092/sso_login/doLogoutJson'

//用户列表
const userListUrl = ip + '/getUserPageJson'

//用户数据更新
const userUpdateUrl = ip + '/updateUserInfoByIdJson'

//新用户
const userSaveUrl = ip + '/saveUserJson'

//角色列表
const roleListUrl = ip + '/getRolePageJson'

//新角色
const roleSaveUrl = ip + '/saveRole'

//删除角色
const roleDelUrl = ip + '/delRoleJson'

//更新角色权限
const roleUpdateUrl = ip + '/saveRoleAndUpOperJson'

//权限列表数据
const powerListUrl = ip + '/getOperateListAllJson'

//部门列表
const partmentListUrl = ip + '/getDeptListJson'

//新部门
const partmentSaveUrl = ip + '/saveDeptJson'


//系统配置列表
const systemListUrl = ip + '/getAppConfigPageJson'

//下拉列表系统配置名称
const appSrcListUrl = ip + '/getAppConfigAllListJson'

//添加系统
const systemSaveUrl = ip + '/saveAppConfig'

//日志列表
const logListUrl = ip + '/getLogPageJson'



export {
	CommonParams,
	options,
	userListUrl,
	userUpdateUrl,
	userSaveUrl,
	roleListUrl,
	roleSaveUrl,
	roleDelUrl,
	roleUpdateUrl,
	powerListUrl,
	logsListUrl,
	appSrcListUrl,
	systemListUrl,
	systemSaveUrl,
	partmentListUrl,
	partmentSaveUrl,
	logListUrl,
	logOutUrl
}