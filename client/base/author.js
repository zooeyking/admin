import goodStorage from 'good-storage';
import { logInUrl, logOutUrl, unitCall, _refreshCommonParams } from 'base/askUrl';
import jsonp from 'tools/js/jsonp';

//验证权限方法
const authority = function() {
	let token = goodStorage.get('APPTOKEN');

	if(token){
		UserInfo();
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