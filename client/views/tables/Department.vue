<template>
  <div>
    <ztree :list='ztreeDataSource' :func='nodeClick' :is-open='true' @addPartment="addPartment" :allPartments="rawData" @remove="remove" @editUser="editUser"></ztree>
    <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" @ok="ok" @search="search"></confirm>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import { authority } from 'base/author'
import { CommonParams, userListUrl, options, partmentListUrl, partmentSaveUrl } from 'base/askUrl'

import MyMessage from 'components/common/message/Message'
import Ztree from './department/Ztree'
import Confirm from './department/Modal'

import jsonp from 'tools/js/jsonp'

export default {
  components: {
    Confirm,
    Ztree,
    MyMessage
  },
  data () {
    return {
      isShow: false,
      rawData: [],
      confirmShow: false,
      showMessage: false,
      messageType: 0,
      modalConfig : {},
      // tree数据
      ztreeDataSource:[],
    }
  },
  methods: {
    //添加部门
    addPartment(newPart) {
      let me = this
      this.__addPart(newPart).then((res)=>{
        this.showMessage = true
        if(res.status == true){
          this.messageType = 0
          me.__init(CommonParams)
        }else{
          this.messageType = 1
        }
      })
    },
    //删除部门
    remove(item) {
      //console.log(item)
      this.confirmShow = true
      this.modalConfig = {
        remove: 1,
        title: '确认删除该部门吗？',
        footerShow: true,
        partment: item
      }
      this.modalConfig.allPartments = this.rawData
    },
    //修改部门信息
    edit(item) {
      //console.log(item)
      this.confirmShow = true
      this.modalConfig = {
        edit: 1,
        title: '编辑部门信息',
        footerShow: true,
        partment: item
      },
      this.modalConfig.allPartments = this.rawData
    },
    //管理部门职员
    editUser(item) {
      //console.log(item)
      this.confirmShow = true
      this.modalConfig = {
        editUser: 1,
        title: '管理部门职员',
        footerShow: false,
        partment: item,
        searchResult: []
      }
    },
    //职员搜索
    search(user) {
      let params = Object.assign({}, CommonParams, user)
      jsonp(userListUrl, params, options).then((res)=>{

        this.showMessage = true
        if(res.status == true) {
          if(res.value.list) {
            this.modalConfig.searchResult = res.value.list

          }else{
            this.modalConfig.searchResult = '查无此用户'
          }
        }else{
          this.messageType = 1
        }
      })
    },
    //关闭编辑面板
    closeDetail() {
      this.confirmShow = false
    },
    //确认修改
    ok(data) {
      console.log(data)
    },
    //提示框
    dispear() {
      this.showMessage = false
    },
    //添加部门方法
    __addPart(data) {
      let params = Object.assign({}, CommonParams, data)
      return jsonp(partmentSaveUrl, params, options)
    },
    //初始化部门数据列表
    __init(data) {
      jsonp(partmentListUrl, data, options).then((res)=>{
      
        //备份原始数据(深度复制)
        this.rawData = JSON.parse(JSON.stringify(res.value));

        //this.rawData = JSON.parse(JSON.stringify(this.allUsers));
        //console.log(this.rawData)
        let final = this.__transData(res.value, 'dId', 'parentId', 'children')
        this.ztreeDataSource = final
        //console.log(this.rawData)
        
        /*
        this.$watch('rawData', function(newVal, oldVal) {
          console.log(oldVal)
          console.log(newVal)
          let final = this.__transData(newVal, 'dId', 'parentId', 'children')
          this.ztreeDataSource = final
        })
        */
        
        
        //let final = this.__transData(res.value, 'dId', 'parentId', 'children')
        //this.ztreeDataSource = final
      })
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
    }
  },
  created() {
    authority()
  },
  mounted() {
    this.__init(CommonParams)
  }
  /*
  watch: {
    'rawData': {
      handler(newVal) {
        this.__init(CommonParams)
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
