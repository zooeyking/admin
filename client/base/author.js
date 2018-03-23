import goodStorage from 'good-storage'
import { logOutUrl, options } from 'base/askUrl'
import jsonp from 'tools/js/jsonp'

//goodStorage.session.set('APPTOKEN', 153567845)
//goodStorage.session.set('USERINFO', 153567845)
//let token = goodStorage.session.get('APPTOKEN')


const authority = function() {
	let token = goodStorage.session.get('APPTOKEN')

	if(token){
		console.log(token)
		UserInfo()
	}else{
	    window.location.href = 'http://192.168.1.80:8092/sso_login/login?serviceUrl=http://192.168.1.138:8080&ssoAppKey=46b70e45ee2d40cbb30431f89b032247'
	}

}


const logOut = function() {
	let user = goodStorage.session.get('USERINFO')
	console.log(user)
	console.log(logOutUrl)

	jsonp(logOutUrl, user, options).then((res)=>{
		console.log(res)
		if(res.status == true) {
			goodStorage.session.remove('APPTOKEN')
			goodStorage.session.remove('USERINFO')
			authority()
		}
	})
}


const UserInfo = function () {
	let request = GetRequest()
	if(request.ssoToken) {
		let userInfo = Object.assign({}, request)
		console.log(userInfo)
		goodStorage.session.set('APPTOKEN', request.ssoToken)
		goodStorage.session.set('USERINFO', userInfo)
	}
}


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