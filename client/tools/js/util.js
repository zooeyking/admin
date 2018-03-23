//格式化树形结构数据
const __transData = function(data, idStr, pidStr, chindrenStr) {    
    let r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = data.length;    
    for(; i < len; i++){    
        hash[data[i][id]] = data[i];    
    }    
    for(; j < len; j++){    
        var aVal = data[j], hashVP = hash[aVal[pid]];    
        if(hashVP){    
            !hashVP[children] && (hashVP[children] = []);    
            hashVP[children].push(aVal);    
        }else{    
            r.push(aVal);    
        }    
    }    
    return r;    
}

export {
	__transData
}