<template>
  <div>
    <role-table @paramsSearch="search" @delRole="delRole" @ok="renew" :confirmClose="confirmClose" :userSearchResult="userSearchResult" @userSearch="userSearch"></role-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import RoleTable from './role/Table'
import MyMessage from 'components/common/message/Message'
import systemModule from 'vuex-store/modules/systemControl'


import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'

import { authority } from 'base/author'
import { CommonParams, options, userListUrl, roleListUrl, roleUpdateUrl, roleSaveUrl, roleDelUrl, appSrcListUrl} from 'base/askUrl'


export default {
  components: {
    RoleTable,
    MyMessage
  },
  data () {
    return {
      isShow: false,
      currentIndex: 0,
      showMessage: false,
      messageType: 0,
      confirmClose: true,
      userSearchResult: []
    }
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    //角色列表搜索
    search(params) {
      let me = this;
      let searchParams = Object.assign({}, CommonParams, params);
      //console.log(searchParams)
      this.__getRolesData(searchParams).then((res)=>{
        console.log(res)
        if(res.value.list) {
          let result = res.value.list;
          me.setRoleList(result);
        }else{
          me.setRoleList([]);
        }
      })
    },
    //用户绑定搜索
    userSearch(user) {
      let params = Object.assign({}, CommonParams, user)

      jsonp(userListUrl, params, options).then((res)=>{
        
        this.showMessage = true
        if(res.status == true) {
          if(res.value.list) {
            this.userSearchResult = res.value.list
          }else{
            this.userSearchResult = '查无此用户'
          }
        }else{
          this.messageType = 1
        }
      })
    },
    delRole(role) {
      
      let delParams = Object.assign({}, CommonParams, role);

      jsonp(roleDelUrl, delParams, options).then((res)=>{
        
        if(res.value == 1) {
          this.showMessage = true
          this.messageType = 0
          //this.confirmClose = !this.confirmClose
          this.__initDate()
        }else {
          this.showMessage = true
          this.messageType = 1
        }
      })
    },
    renew(role) {
      
      let url = ''
      if(role.roleId) {
        url = roleUpdateUrl
      }else {
        url = roleSaveUrl
      }
      
      let params = Object.assign({}, CommonParams, role);
      
      jsonp(url, params, options).then((res)=>{
        
        if(res.status == true) {
          this.showMessage = true
          this.messageType = 0
          this.confirmClose = !this.confirmClose
          this.__initDate()
        }else {
          this.showMessage = true
          this.messageType = 1
        }

        console.log(res);
      })
      
    },
    dispear() {
      this.showMessage = false
    },

    __getRolesData(params) {
      let url = roleListUrl
      
      return jsonp(url, params, options)
    },
    __getAppList(params) {
      let url = appSrcListUrl
      
      return jsonp(url, params, options)
    },
    __initDate() {
      let me = this; 
      this.__getRolesData(CommonParams).then((res)=>{
        let result = res.value.list;
            me.setRoleList(result);
      }).then(()=>{
        this.__initAppList()
      })
    },
    __initAppList() {
      let me = this; 
      this.__getAppList(CommonParams).then((res)=>{
        me.setAppList(res.value)
      })
    },
    ...mapMutations(
      { 
        setRoleList : 'SET_SYS_ROLELIST', 
        setAppList : 'SET_SYS_APPSRCLIST'
      }
    )
  },
  created() {
    authority()
  },
  mounted() {
    this.__initDate()
    //this.__initAppList()     //一个生命周期  同时jsonp请求报错
  },
  watch: {
    
    roleList : {
      handler(val, oldval) {
        if(val != oldval) {
          
          //this.search({})
        }  
      },  
      deep:true     //对象内部的属性监听
    }

    
  },
  computed: {
    /*
    roleList(){
      return this.$store.getters.rolesData;
    }
    */
    ...mapGetters({
      roleList : 'rolesData',
      operats : 'operats',
    })

  }
}
</script>

<style lang="scss" scoped>
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
