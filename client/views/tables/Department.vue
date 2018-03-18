<template>
  <div>
    <ztree :list='ztreeDataSource' :func='nodeClick' :expand='expandClick' :contextmenu='contextmenuClick' :is-open='true' @addPartment="addPartment" @remove="remove"></ztree>
  </div>
</template>


<script>
import { partmentListUrl, partmentSaveUrl } from 'base/askUrl'

import UserTable from 'components/common/table/Table'
import Ztree from 'components/common/tree/Ztree.vue'
import Confirm from 'views/components/modals/Modal'

import jsonp from 'tools/js/jsonp'
import axios from 'axios'

const options = {
  param: 'callback'
}

const CommonParams = {
  "ssoAppKey": "122",
  "ssoTimestamp": "123",
  "ssoNonce": "aaa",
  "ssoSinatrue": "4fe34eb88a20d87703bf6230779426700397a8a5",
  "ssoUserId": "admin",
  "pageNum":1,
  "pageSize": 100,
}


export default {
  components: {
    Confirm,
    UserTable,
    Ztree
  },
  data () {
    return {
      isShow: false,
      rawData: [],
      // tree数据
      ztreeDataSource:[{
                        dId:1,
                        name:"音乐",
                        url:"http://www.baidu.com" 
                        },

                        {
                          dId:2,
                          name:"视频",
                          children:[{
                                     dId:3,
                                     name:"电影",
                                     children:[{
                                                dId:4,
                                                name:"国产电影",
                                                url:""
                                              },
                                              {
                                                dId:5,
                                                name:"好莱坞电影",
                                                url:""
                                              },
                                              {
                                                dId:6,
                                                name:"小语种电影",
                                                url:""
                                              }]
                                    },{
                                       dId:7,
                                       name:"短片",
                                       children:[{
                                                  dId:9,
                                                  name:"电视剧",
                                                  url:""
                                                },
                                                {
                                                  dId:10,
                                                  name:"短片",
                                                  url:""
                                                }]
                                    }]
                        }],
      // 设置项
      options: {},
      currentIndex: 0,
      tableConfig: {
        tableName: 'department',
        tHeader: ['用户名', '姓名', '性别', '创建时间', '系统来源', '操作'],
        listData: []
      },
      allUsers: [ 
        {"dId":"4","parentId":"1","dName":"大家电"},  
        {"dId":"5","parentId":"1","dName":"生活电器"},  
        {"dId":"1","parentId":"0","dName":"家用电器"},  
        {"dId":"2","parentId":"0","dName":"服饰"},  
        {"dId":"3","parentId":"0","dName":"化妆"},  
        {"dId":"7","parentId":"4","dName":"空调"},  
        {"dId":"8","parentId":"4","dName":"冰箱"},  
        {"dId":"9","parentId":"4","dName":"洗衣机"},  
        {"dId":"10","parentId":"4","dName":"热水器"},  
        {"dId":"11","parentId":"3","dName":"面部护理"},  
        {"dId":"12","parentId":"3","dName":"口腔护理"},  
        {"dId":"13","parentId":"2","dName":"男装"},  
        {"dId":"14","parentId":"2","dName":"女装"},  
        {"dId":"15","parentId":"7","dName":"海尔空调"},  
        {"dId":"16","parentId":"7","dName":"美的空调"},  
        {"dId":"19","parentId":"5","dName":"加湿器"},  
        {"dId":"20","parentId":"5","dName":"电熨斗"}  
      ]
    }
  },
  methods: {
    //添加部门
    addPartment(newPart) {
      console.log(newPart)
      /*
      this.__addPart(newPart).then((res)=>{
        console.log(res)
      })
      */
    },
    remove(item) {
      //console.log(item)
      let rawData = JSON.parse(JSON.stringify(this.rawData))
      console.log(rawData)
      for(let i=0; i<rawData.length; i++) {
        if(item.dId == rawData[i].dId ){
          rawData.splice(i,1)
          this.rawData = rawData
          console.log(rawData)
          console.log(this.rawData)
        }
      }
    },
    //添加部门方法
    __addPart(data) {
      return jsonp(partmentSaveUrl, data, options)
    },
    //初始化部门数据列表
    __init(data) {
      return jsonp(partmentListUrl, data, options)
    },
    //格式化树形结构数据
    __transData(data, idStr, pidStr, chindrenStr) {    
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
    },
    // 点击节点
    nodeClick:function(m){
       //console.log(JSON.parse(JSON.stringify(m)));
    },
    // 右击事件
    contextmenuClick:function(m){
       console.log(m)
       console.log("触发了自定义的contextmenuClick事件");
    },
    // 点击展开收起
    expandClick:function(m){
       console.log(JSON.parse(JSON.stringify(m)));
       // 点击异步加载
       /*
       if(m.isExpand) {
          // 动态加载子节点, 模拟ajax请求数据
         // 请注意 id 不能重复哦。
         if(m.hasOwnProperty("children")){
            
            m.loadNode = 1; // 正在加载节点

            setTimeout(()=>{

              m.loadNode = 2; // 节点加载完毕

              m.isFolder = !m.isFolder; 

              m.children.push({
                  id:+new Date(),
                  name:"动态加载节点1",
                  path:"",
                  clickNode:false,
                  isFolder:false,
                  isExpand:false,
                  loadNode:0,
                  children:[{
                        id:+new Date()+1,
                        name:"动态加载末节点",
                        path:"",
                        clickNode:false,
                        isExpand:false,
                        isFolder:false,
                        loadNode:0
                  }]
              })
            },1000)
            
         }
       }
       */
    }
  },
  created() {
    this.__init(CommonParams).then((res)=>{
      
      //备份原始数据
      //this.rawData = res.value

      this.rawData = JSON.parse(JSON.stringify(this.allUsers));
      console.log(this.rawData)
      let final = this.__transData(this.allUsers, 'dId', 'parentId', 'children')
      this.ztreeDataSource = final
      console.log(this.rawData)
      
      this.$watch('rawData', function(newVal, oldVal) {
        console.log(oldVal)
        console.log(newVal)
        let final = this.__transData(newVal, 'dId', 'parentId', 'children')
        this.ztreeDataSource = final
      })
      
      
      //let final = this.__transData(res.value, 'dId', 'parentId', 'children')
      //this.ztreeDataSource = final
    })
    this.tableConfig.listData = this.allUsers
  },
  /*
  watch: {
    'rawData': {
      handler(newVal) {
        //console.log(newVal)
        //let final = this.__transData(newVal, 'dId', 'parentId', 'children')
        //this.ztreeDataSource = final
        //console.log(final)
        //this.initTreeData();
      },
      deep:true
    }
  }
  */
}
</script>

<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
.tableContent {
  height: 470px;
  overflow: auto;
  margin-top: -20px;
}
.pageHeader {
  display: flex;
  justify-content: space-between;
}

.box {
  position: relative;
}
.loadingWrapper {
  position: absolute;
  z-index: 10;
  top: 10%;
  left: 0;
  width: 100%;
  height: 80%;
}
</style>
