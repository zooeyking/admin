<template>
  <div>
    <user-table :tableConfig="tableConfig" @paramsSearch="search" @enableUpdate="enableUpdate" @delUser="delUser" @ok="renew" :confirmClose="confirmClose"></user-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import UserTable from './user/Table'
import MyMessage from 'components/common/message/Message'
import systemModule from 'vuex-store/modules/systemControl'


import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
//import axios from 'axios'
import { userListUrl, userUpdateUrl, userSaveUrl } from 'base/askUrl'


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
        "pageSize": 100,
        "userName":"",
        "userRealName":"",
        "startDate":"",
        "endDate":"",
        "fromSacId":""
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
    UserTable,
    MyMessage
  },
  data () {
    return {
      isShow: false,
      currentIndex: 0,
      showMessage: false,
      messageType: 'success',
      confirmClose: true,
      tableConfig: {
        tableName: 'users',
        listData: []
      }
    }
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    search(params) {
      let me = this;
      let searchParams = Object.assign({}, CommonParams, params);
      this._getUsersData(searchParams).then((res)=>{
        let result = res.value.list;
        me.tableConfig.listData = result
      })
    },
    delUser(user) {
      let updateParams = Object.assign({}, CommonParams, {userId: user.userId, delFlag: user.delFlag});
      jsonp(userUpdateUrl, user, options).then((res)=>{
        console.log(res);
      })
    },
    enableUpdate(user) {
      let me = this;
      
      let updateParams = Object.assign({}, CommonParams, {userId: user.userId, userEnable: user.userEnable});
      jsonp(userUpdateUrl, updateParams, options).then((res)=>{
        console.log(res);
      })
    },
    renew(user) {
      let url = ''
      if(user.userId) {
        url = userUpdateUrl
      }else {
        url = userSaveUrl
      }
      let params = Object.assign({}, CommonParams, user);

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

    /*  
    格式化请求的数据，已经无用
    const ITEMKEY = ['userName','userRealName','userGenderString','createDate','userMail','userMobilePhone','userAddress','userId','userEnable','userRemark']
    _formatData(data) {
      let arr = [];
      for (let i=0; i<data.length; i++) {
        let keyArr = ITEMKEY;
        let item = {};
        for(let j=0; j<keyArr.length; j++){
          let key = keyArr[j];
          item[key] = data[i][key];
        }
        arr.push(item);
      }
      return arr;
    },
    */
    _getUsersData(params) {
      let url = userListUrl
      return jsonp(url, params, options)
    },
    _initDate() {
      let me = this; 
      this._getUsersData(InitParams).then((res)=>{
        let result = res.value.list;
        
        me.tableConfig.listData = result;
        me.setUserList(result);
        
      })
    },
    ...mapMutations(
      { setUserList : 'SET_SYS_USERUSERLIST' }
    )
  },
  mounted() {
    this._initDate()
    //this.userList = systemModule.state.systems/userList
    
  },
  watch: {
    
    userList : {
      handler(val, oldval) {
        if(val != oldval) {
          
          this.search({})
        }  
      },  
      deep:true     //对象内部的属性监听，也叫深度监听
    }
    
  },
  computed: {
    
    userList(){
      return this.$store.getters.listData;
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
