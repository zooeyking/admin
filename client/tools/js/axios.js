import originAXIOS from 'axios'
import querystring from 'querystring'

originAXIOS.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default function jsonp(url, data, config={}){
	let params = querystring(data);
	//console.log(url);
	return originAXIOS.post(url, params, config);
}


function param(data){
	let url = '';
	for(let k in data){
		let value = data[k] !== undefined ? data[k] : '';
		
		url += `&${k}=${encodeURIComponent(value)}`;
	}
	return url ? url.substring(1) : '';
}