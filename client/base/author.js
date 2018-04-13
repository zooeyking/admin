import goodStorage from 'good-storage';
import store from '../store';
import router from '../router';
import lazyLoading from 'tools/js/lazyLoading';
import jsonp from 'tools/js/jsonp';
import { logInUrl, logOutUrl, unitCall, userPowerUrl, _refreshCommonParams } from 'base/askUrl';

//验证权限方法
const authority = function() {
	let token = goodStorage.get('APPTOKEN');

	if(token){
		UserInfo();
		unitCall(__powerSuccess, __failed, userPowerUrl);
	}else{
	    window.location.href = logInUrl;
	}

}


//退出成功回调
function __logOutSuccess() {
	goodStorage.remove('APPTOKEN');
	goodStorage.remove('USERINFO');
	authority();
}

//退出失败回调
function __logOutFailed(err) {
	alert('退出失败，请稍候重试！');
}

var isSetMenu = false;

const allMenu = [
    {
      name: '用户管理',
      path: '/sysCtl/user',
      meta: {
        label: '用户管理',
        link: 'sysCtl/User.vue'
      },
      component: lazyLoading('sysCtl/User')
    },
    {
      name: '角色功能',
      path: '/sysCtl/role',
      meta: {
        label: '角色功能',
        link: 'sysCtl/Role.vue'
      },
      component: lazyLoading('sysCtl/Role')
    },
    {
      name: '部门功能',
      path: '/sysCtl/department',
      meta: {
        label: '部门功能',
        link: 'sysCtl/Department.vue'
      },
      component: lazyLoading('sysCtl/Department')
    },
    {
      name: '权限管理',
      path: '/sysCtl/power',
      meta: {
        label: '权限管理',
        link: 'sysCtl/Power.vue'
      },
      component: lazyLoading('sysCtl/Power')
    },
    {
      name: '系统配置',
      path: '/sysCtl/system',
      meta: {
        label: '系统配置',
        link: 'sysCtl/System.vue'
      },
      component: lazyLoading('sysCtl/System')
    },
    {
      name: '操作日志',
      path: '/sysCtl/logs',
      meta: {
        label: '操作日志',
        link: 'sysCtl/Logs.vue'
      },
      component: lazyLoading('sysCtl/Logs')
    },
    {
      name: '流量统计',
      path: '/sysCtl/requests',
      meta: {
        label: '流量统计',
        link: 'sysCtl/Requests.vue'
      },
      component: lazyLoading('sysCtl/Requests')
    },
    {
      name: '用户统计',
      path: '/sysCtl/customers',
      meta: {
        label: '用户统计',
        link: 'sysCtl/Customers.vue'
      },
      component: lazyLoading('sysCtl/Customers')
    }
  ]

//获取当前登录用户的权限
function __powerSuccess(res) {
  let power = res.value ? res.value : [];

  if(!isSetMenu) {
  	__setMenus(power);
  }
  
}

function __setMenus(arr) {
  let power = arr;
  let finallMenu = [];
  let tempList = [];
  //tempList.push(allMenu[1]);
  for(let i=0; i<power.length; i++) {
  	let text = power[i].operateText;
  	switch(text) {

  		case 'user':
  		tempList.push(allMenu[0]);
  		break;

  		case 'role':
  		tempList.push(allMenu[1]);
  		break;

  		case 'department':
  		tempList.push(allMenu[2]);
  		break;

  		case 'power':
  		tempList.push(allMenu[3]);
  		break;

  		case 'system':
  		tempList.push(allMenu[4]);
  		break;

  		case 'logs':
  		tempList.push(allMenu[5]);
  		break;

  		case 'requests':
  		tempList.push(allMenu[6]);
  		break;

  		case 'customers':
  		tempList.push(allMenu[7]);
  		break;
  	}
  }
  
  //设置路由
  store.commit('SET_SYS_MENU',tempList);
  router.addRoutes(tempList);

  //存储登陆者拥有的权限
  let final = [];
  for(let i=0; i<power.length; i++) {
  	final[power[i]['operateText']] = 1;
  }
 /* final['role'] = 1;
  final['role_add'] = 1;
  final['role_copy'] = 1;
  final['role_bind_power'] = 1;
  final['role_bind_user'] = 1;
  final['role_delete'] = 1;*/
  store.commit('SET_SYS_PERMISSION',final);

  isSetMenu = true;
}

function __failed(err) {
  console.log(err)
}

//退出方法
const logOut = function() {
	let user = goodStorage.get('USERINFO');
	unitCall(__logOutSuccess, __logOutFailed, logOutUrl, user);
}

//本地设置admin公共参数
const UserInfo = function () {
	let request = GetRequest();
	if(request.ssoToken) {
		let userInfo = Object.assign({}, request);
		goodStorage.set('APPTOKEN', request.ssoToken);
		goodStorage.set('USERINFO', userInfo);
	}
}

//从url中获得admin公共对象
function GetRequest() {   
   let url = window.location.search;   //获取url中"?"符后的字串   
   let theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      let str = url.substr(1);   
      let strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);   
      }   
   }
   return theRequest;   
}


export {
	authority,
	UserInfo,
	logOut
}