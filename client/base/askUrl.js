import goodStorage from 'good-storage';
import jsonp from 'tools/js/jsonp'
import { safe } from './safe';
//import { mapMutations } from 'vuex';

//请求ip
const ip = "http://192.168.1.80:8093/base/sso-base-modular";

//公共回调
const options = {
  param: 'callback'
};

//公共参数方法
function _getParams() {
	let user = goodStorage.get('USERINFO');
	let safeUser = null;
	if(user != undefined) {
		safeUser = safe(user);
		return Object.assign({}, safeUser, { "pageSize": 20});
	}else{
		return;
	}
};

//公共请求方法
const unitCall = function(_callBackSuccess, _callBackErr, _url, _params={}) {
	//公共请求参数
	let CommonParams = _getParams();

	//将实际传入请求参数与公共参数合并
	let finalParams = Object.assign({}, CommonParams, _params);
	/*
	return new Promise(resolve, reject){

		jsonp(_url, finalParams, options).then((res)=>{
			if(res.status == true) {
          		resolve(res);
        	}else{
        		reject(res);
        	}
		}).catch((err)=>{
			reject(err);
		})
	}
	*/

	jsonp(_url, finalParams, options).then((res)=>{
		
        if(res.status == true) {
          	_callBackSuccess(res);
        }else{
        	/*
        	console.log('参数错误！');
        	console.log(res);
        	switch(res.code) {
		        case 'Timeout':
		          obj.messageType = 1;
		          break;
		        case 402 :
		          console.log(233);
		          obj.messageShow = true;
		          obj.messageType = 2;
		          break;
		        case 401 :
		          obj.messageType = 3;
		          break;
		        case 404 :
		          obj.messageType = 4;
		          break;
		        case 404 :
		          obj.messageType = 5;
		          break;
		      }
		    */
          	_callBackErr(res);
          	//window.location.href = 'http://192.168.1.80:8092/sso_login/login?serviceUrl=http://192.168.1.138:8080&ssoAppKey=46b70e45ee2d40cbb30431f89b032247';
        }
        
    }).catch((err)=>{
    	/*
    	console.log(err);
    	switch(err) {
	        case 'Timeout':
	          this.messageType = 1;
	          break;
	        case err.code === 402 :
	          this.messageType = 2;
	          break;
	        case err.code === 401 :
	          this.messageType = 3;
	          break;
	        case err.code === 404 :
	          this.messageType = 4;
	          break;
	        case err.code === 404 :
	          this.messageType = 5;
	          break;
	      }
	    */
    	_callBackErr(err);
    	//window.location.href = 'http://192.168.1.80:8092/sso-login/login?serviceUrl=http://192.168.1.138:8080&ssoAppKey=46b70e45ee2d40cbb30431f89b032247';
    })
};

//用户登录
const logInUrl = 'http://192.168.1.80:8092/sso-login/login?serviceUrl=http://192.168.1.138:8080&ssoAppKey=46b70e45ee2d40cbb30431f89b032247';

//用户退出
const logOutUrl = 'http://192.168.1.80:8092/sso-login/doLogoutJson';

//当前登录人权限
const userPowerUrl = ip + '/getUserOperateBySacKeyServiceJson';

//用户列表
const userListUrl = ip + '/getUserPageJson';

//用户角色信息查询
const userRoleUrl = ip + '/getRoleNameByUserIdJson';

//用户部门信息查询
const userDepartmentUrl = ip + '/getDeptByUserIdJson';

//用户数据更新
const userUpdateUrl = ip + '/updateUserInfoByIdJson';

//新用户
const userSaveUrl = ip + '/saveUserJson';

//角色列表
const roleListUrl = ip + '/getRolePageJson';

//新角色
const roleSaveUrl = ip + '/saveRole';

//复制角色
const roleCopyUrl = ip + '/copyRoleJson';

//删除角色
const roleDelUrl = ip + '/delRoleJson';

//更新角色权限
const roleUpdateUrl = ip + '/saveRoleAndUpOperJson';

//权限列表数据
const powerListUrl = ip + '/getOperateListAllJson';

//查询角色已绑定的用户
const roleUserUrl = ip + '/selectUserByRoleIdJson';

//角色未绑定的用户搜索
const unbindedRoleUsersUrl = ip + '/selectRoleExistsUserByRIdJson';

//用户绑定到角色上
const roleBindUrl = ip + '/addRoleAndUserJson';

//单个移除角色下的用户
const roleUnbindUrl = ip + '/delRoleUserJson';

//部门列表
const partmentListUrl = ip + '/getDeptListJson';

//新部门
const partmentSaveUrl = ip + '/saveDeptJson';

//获取某个部门下所有绑定的用户
const partmentUserUrl = ip + '/getDeptUserByDUIdJson';

//获取某个部门下所有未绑定的用户
const unbindedPartmentUsersUrl = ip + '/selectDeptExistsUserByDIdJson';

//用户绑定到部门上
const partmentBindUrl = ip + '/saveDeptAndUserJson';

//单个移除部门下的用户
const partmentUnbindUrl = ip + '/delDeptByIdJson';

//移除部门
const partmentDelUrl = ip + '/delDeptByTDIdJson';

//生成权限
const operateAddUrl = ip + '/addOperateJson';

//搜索权限
const operateSearchUrl = ip + '/searchOperatePageJson';

//注销权限
const operateDelUrl = ip + '/delOperateJson';

//系统配置列表
const systemListUrl = ip + '/getAppConfigPageJson';

//下拉列表系统配置名称
const appSrcListUrl = ip + '/getAppConfigAllListJson';

//添加系统
const systemSaveUrl = ip + '/saveAppConfig';

//日志列表
const logListUrl = ip + '/getLogPageJson';

//流量统计
const requestsUrl = ip + '/getHttpCountNumPageJson';

//用户统计
const customersUrl = ip + '/getUserCountBysacIdJson';


export {
	logInUrl,
	logOutUrl,
	CommonParams,
	_refreshCommonParams,
	options,
	unitCall,
	userPowerUrl,
	userListUrl,
	userRoleUrl,
	userDepartmentUrl,
	userUpdateUrl,
	userSaveUrl,
	roleListUrl,
	roleSaveUrl,
	roleCopyUrl,
	roleDelUrl,
	roleUpdateUrl,
	roleUserUrl,
	roleBindUrl,
	roleUnbindUrl,
	unbindedRoleUsersUrl,
	powerListUrl,
	logsListUrl,
	appSrcListUrl,
	systemListUrl,
	systemSaveUrl,
	partmentListUrl,
	partmentSaveUrl,
	partmentUserUrl,
	unbindedPartmentUsersUrl,
	partmentUnbindUrl,
	partmentBindUrl,
	partmentDelUrl,
	operateAddUrl,
	operateSearchUrl,
	operateDelUrl,
	logListUrl,
	requestsUrl,
	customersUrl
}


