import goodStorage from 'good-storage';
import jsonp from 'tools/js/jsonp';
import axios from 'axios';
import qs from 'qs';
import { safe } from './safe';
//import { mapMutations } from 'vuex';

//请求地址
const ip = "http://192.168.1.15:8089";
//const ip = "http://10.15.21.68:8098";
//const ip = "http://192.168.1.70:8099";

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


// axios.interceptors.response.use((response) => {
//   	if (response.data.error_no !== '0') {
    	
//    	 	return Promise.reject(response);
//   	}
//   	return response.data;
// }, (error) => {
//   	Toast.offline('网络传输错误', 1);
//   	return Promise.reject(error);
// });


//公共请求方法
const unitCall = function(_url, _params={}) {
	//公共请求参数
	let CommonParams = _getParams();

	//将实际传入请求参数与公共参数合并
	let finalParams = Object.assign({}, CommonParams, _params);

	const option = {
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencoded' },
		data: qs.stringify(finalParams),
		//data: finalParams,
		url: _url
	};
	
	return new Promise((resolve, reject)=>{
		axios(option).then((res)=>{

			resolve(res.data);

		}).catch((err)=>{
			console.log(err);
			reject(err);
		})
	})
	
	// return  axios(option).then((res)=>{
	// 		  	console.log(res);
	// 			if(res.data.status == true) {
	// 	 	  		return Promise.resolve(res.data);
	// 	 	   	}else{
	// 	 	   		return Promise.reject(res.data);
	// 	 	   	}
	// 		}).catch((err)=>{
	// 			console.log(err)
	// 			return Promise.reject(err);
	// 		})
	
	
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
const informationListUrl = url + '/service_info/queryListByWhere';

//编辑服务信息
const informationEditUrl = url + '/service_info/saveOrUpdate';

//删除服务信息
const informationDeleteUrl = url + '/service_info/deleteById';

//获取引导清单
const guideListUrl = url + '/guide_detail/queryListByWhere';

//编辑引导
const guideEditUrl = url + '/guide_detail/saveOrUpdate';

//删除引导
const guideDeleteUrl = url + '/guide_detail/deleteById';

//引导关联信息
const linkInfoUrl = url + '/guide_detail/relationServiceInfo';

//引导解绑信息
const unLinkInfoUrl = url + '/guide_detail/removeRelation';

//引导关联信息列表
const infoRelationsUrl = url + '/guide_detail/relations';

//引导未联信息列表
const infoNotRelationsUrl = url + '/guide_detail/notRelations';

//引导已关联信息排序
const sortServiceInfoUrl = url + '/guide_detail/sortServiceInfo';

//获取活动清单
const partyListUrl = url + '/guide/queryListByWhere';

//编辑活动信息
const partyEditUrl = url + '/guide/saveOrUpdate';

//删除活动
const partyDeleteUrl = url + '/guide/deleteById';

//活动关联引导
const linkGuideUrl = url + '/guide/relationGudetail';

//活动解绑引导
const unLinkGuideUrl = url + '/guide/removeRelation';

//活动关联引导列表
const guideRelationsUrl = url + '/guide/relations';

//活动未关联引导列表
const guideNotRelationsUrl = url + '/guide/notRelations';

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
	ip,
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
	informationListUrl,
	informationEditUrl,
	informationDeleteUrl,
	guideListUrl,
	guideEditUrl,
	guideDeleteUrl,
	partyListUrl,
	partyEditUrl,
	partyDeleteUrl,
	linkInfoUrl,
	unLinkInfoUrl,
	infoRelationsUrl,
	infoNotRelationsUrl,
	sortServiceInfoUrl,
	linkGuideUrl,
	unLinkGuideUrl,
	guideRelationsUrl,
	guideNotRelationsUrl
}


