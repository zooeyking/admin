//格式化扁平数据结构为树形结构数据
const __treesData = function(data, idStr, pidStr, chindrenStr) {    
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

//格式化树形结构数据为扁平数据结构
const __flatData = function (arr) {
    let newArr = [];

    function plant(arr) {
        for (let i = 0; i<arr.length; i++) {
            if(arr[i].children && arr[i].children.length>0) {
                plant(arr[i].children);
                arr[i].children = [];    
            }
            newArr.push(arr[i]);
        }
    } 

    plant(arr);

    return newArr;
}

export {
	__treesData,
    __flatData
}