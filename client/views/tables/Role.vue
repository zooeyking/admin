<template>
  <div>
    <role-table :tableData="tableData" @paramsSearch="search" @delRole="delRole" @ok="renew" :confirmClose="confirmClose"></role-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import RoleTable from './role/Table'
import MyMessage from 'components/common/message/Message'
import systemModule from 'vuex-store/modules/systemControl'


import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'

import { roleListUrl, roleUpdateUrl, roleSaveUrl, appSrcListUrl} from 'base/askUrl'


const options = {
  param: 'callback'
}
const InitParams = {
        "ssoAppKey": "122",
        "ssoTimestamp": "123",
        "ssoNonce": "aaa",
        "ssoSinatrue": "4fe34eb88a20d87703bf6230779426700397a8a5",
        "ssoUserId": "admin",
        "pageNum":1,
        "pageSize": 100
      }

const CommonParams = {
        "ssoAppKey": "122",
        "ssoTimestamp": "123",
        "ssoNonce": "aaa",
        "ssoSinatrue": "4fe34eb88a20d87703bf6230779426700397a8a5",
        "ssoUserId": "admin",
        "pageNum": 1,
        "pageSize": 100,
      }

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
      messageType: 'success',
      confirmClose: true,
      tableData: []
    }
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    search(params) {
      let me = this;
      let searchParams = Object.assign({}, CommonParams, params);
      this._getRolesData(searchParams).then((res)=>{
        let result = res.value.list;
        me.tableData = result
      })
    },
    delRole(role) {
      let updateParams = Object.assign({}, CommonParams, {roleId: role.roleId, delFlag: role.delFlag});
      jsonp(roleUpdateUrl, role, options).then((res)=>{
        console.log(res);
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
        if(res.value == 1) {
          this.showMessage = true
          this.messageType = 0
          this.confirmClose = !this.confirmClose
          this._initDate()
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

    _getRolesData(params) {
      let url = roleListUrl
      console.log(url)
      return jsonp(url, params, options)
    },
    _getAppList(params) {
      let url = appSrcListUrl
      console.log(url)
      return jsonp(url, params, options)
    },
    _initDate() {
      let me = this; 
      this._getRolesData(InitParams).then((res)=>{
        let result = res.value.list;
        me.tableData = result;
        me.setRoleList(result);
      })
    },
    _initAppList() {
      let me = this; 
      this._getAppList(InitParams).then((res)=>{
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
    this._initAppList()
  },
  mounted() {
    this._initDate()
    //this._initAppList()     //一个生命周期  同时jsonp请求报错
  },
  watch: {
    
    roleList : {
      handler(val, oldval) {
        if(val != oldval) {
          
          this.search({})
        }  
      },  
      deep:true     //对象内部的属性监听
    }
    
  },
  computed: {
    
    roleList(){
      return this.$store.getters.rolesData;
    }
    /*
    ...mapGetters([
      store.getters.listData
    ])
    */

  }
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
