import goodStorage from 'good-storage';
import jsonp from 'tools/js/jsonp';
import axios from 'tools/js/axios';
import { safe } from './safe';
//import { mapMutations } from 'vuex';

//请求地址
const ip = "http://192.168.1.15:8088";
//const ip = "http://10.15.21.68:8098";
//const ip = "http://192.168.1.70:8098";

const url = ip + "/gis-service/sys";

//const key = "http://briancheng.51vip.biz:48466/base/sso-base-modular";
//http://192.168.1.15:8088/gis-service/sys/campus/queryListByWhere

//用户登录
const logInUrl = ip + '/login/sso-login/login?serviceUrl=http://192.168.1.138:8090&ssoAppKey=46b70e45ee2d40cbb30431f89b032247';

//用户退出
const logOutUrl = ip + '/login/sso-login/doLogoutJson';

//公共回调
const options = {
  param: 'callback'
};

//公共参数方法
function _getParams() {
	
	//let user = goodStorage.get('USERINFO');
	let user = {
		ssoAppKey: '46b70e45ee2d40cbb30431f89b032247',
		ssoUserId: '3864f817fcf1406eaaf00accfbaf602e'
	}
	let safeUser = null;
	if(user != undefined) {
		safeUser = safe(user);
		return Object.assign({}, safeUser, { "pageSize": 20});
	}else{
		return;
	}
	
};


//公共请求方法
const unitCall = function(_url, _params={}) {
	//公共请求参数
	let CommonParams = _getParams();

	//将实际传入请求参数与公共参数合并
	let finalParams = Object.assign({}, CommonParams, _params);

	
	return new Promise((resolve, reject) => {
		
		jsonp(_url, finalParams, options).then((res)=>{
			
			if(res.status == true) {
          		resolve(res);
        	}else{
        		reject(res);
        	}
		}).catch((err)=>{
			
			reject(err);
		})
	})
	
	//return axios(_url,finalParams)
	/*
	return new Promise((resolve, reject) => {
		
		jsonp(_url, finalParams, options).then((res)=>{
			
			if(res.status == true) {
          		resolve(res);
        	}else{
        		reject(res);
        	}
		}).catch((err)=>{
			
			reject(err);
		})
	})
	*/
	
};

//当前登录人权限
const userPowerUrl = url + '/getUserOperateBySacKeyServiceJson';

//校区列表
const zoneListUrl = url + '/campus/queryListByWhere';

//删除校区
const zoneDeleteUrl = url + '/campus/deleteById';    

//校区信息编辑
const zoneEditUrl = url + '/campus/saveOrUpdate';

//建筑类别列表
const buildingTypeListUrl = url + '/archite_category/queryListByWhere';

//编辑建筑类别
const buildingTypeEditUrl = url + '/archite_category/saveOrUpdate';

//删除建筑类别
const buildingTypeDeleteUrl = url + '/archite_category/deleteById';

//建筑实体列表
const buildingListUrl = url + '/archite_entity/queryListByWhere';

//编辑建筑实体
const buildingEditUrl = url + '/archite_entity/saveOrUpdate';

//删除建筑实体
const buildingDeleteUrl = url + '/archite_entity/deleteById';

//获取服务分类清单
const serviceTypeListUrl = url + '/service_category/queryListByWhere';

//编辑服务分类
const serviceTypeEditUrl = url + '/service_category/saveOrUpdate';

//删除服务分类
const serviceTypeDeleteUrl = url + '/service_category/deleteById';

//上传logo图片
const uploadLogoUrl = url + '/upload/uploadImg';

//获取服务信息清单
const serviceInfoListUrl = url + '/service_info/queryListByWhere';

//编辑服务信息
const serviceInfoEditUrl = url + '/service_info/saveOrUpdate';

//删除服务信息
const serviceInfoDeleteUrl = url + '/service_info/deleteById';

//获取服务分类清单
const guideListUrl = url + '/service_category/queryListByWhere';

//编辑服务分类
const guideEditUrl = url + '/service_category/saveOrUpdate';

//删除服务分类
const guideDeleteUrl = url + '/service_category/deleteById';

//获取服务信息清单
const partyListUrl = url + '/service_info/queryListByWhere';

//编辑服务信息
const partyEditUrl = url + '/service_info/saveOrUpdate';

//删除服务信息
const partyDeleteUrl = url + '/service_info/deleteById';

//机构类别清单
const organizationListUrl = url + '/organization/queryListByWhere';

//编辑机构类别
const organizationEditUrl = url + '/organization/saveOrUpdate';

//删除机构类别
const organizationDeleteUrl = url + '/organization/deleteById';

//机构分类关联校区操作
const relationCampusUrl = url + '/organization/relationCampus';

//机构分类取消关联校区操作
const removeRelationCampusUrl = url + '/organization/removeRelation';

//机构分类关联校区查询
const relationAndNotUrl = url + '/organization/relationAndNot';

//获取机构清单
const agencyListUrl = url + '/org_entity/queryListByWhere';

//编辑机构
const agencyEditUrl = url + '/org_entity/saveOrUpdate';

//删除机构
const agencyDeleteUrl = url + '/org_entity/deleteById';


export {
	logInUrl,
	logOutUrl,
	CommonParams,
	options,
	unitCall,
	userPowerUrl,
	zoneListUrl,
	zoneEditUrl,
	zoneDeleteUrl,
	buildingTypeListUrl,
	buildingTypeEditUrl,
	buildingTypeDeleteUrl,
	buildingListUrl,
	buildingEditUrl,
	buildingDeleteUrl,
	organizationListUrl,
	organizationEditUrl,
	organizationDeleteUrl,
	relationCampusUrl,
	removeRelationCampusUrl,
	relationAndNotUrl,
	agencyListUrl,
	agencyEditUrl,
	agencyDeleteUrl,
	serviceTypeListUrl,
	serviceTypeEditUrl,
	serviceTypeDeleteUrl,
	uploadLogoUrl,
	serviceInfoListUrl,
	serviceInfoEditUrl,
	serviceInfoDeleteUrl,
	guideListUrl,
	guideEditUrl,
	guideDeleteUrl,
	partyListUrl,
	partyEditUrl,
	partyDeleteUrl
}


