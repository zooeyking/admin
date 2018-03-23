import md5 from 'js-md5';

function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var maxPos = $chars.length;
	var pwd = '';
	for (let i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}


const safe = function(params) {

	var ssoTimestamp = new Date().getTime();
	var ssoNonce = randomString(10);
	var ssoAppkey = params['ssoAppKey'] || '';
	var ssoToken = params['ssoToken'] || '';
	var ssoSinatrue = md5(ssoAppkey + params['ssoUserId'] + ssoTimestamp + ssoNonce + ssoToken);

	let newParams = {
					ssoUserId : params['ssoUserId'],
					ssoAppKey : params['ssoAppKey'],
					ssoTimestamp : ssoTimestamp,
					ssoNonce : ssoNonce,
					ssoSinatrue : ssoSinatrue
					}

	return newParams
}

export { safe }