<template>
  <div>
    <user-table :tableConfig="tableConfig" @paramsSearch="search" @enableUpdate="enableUpdate" @delUser="delUser" @ok="renew" :confirmClose="confirmClose"></user-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import UserTable from './user/Table'
import MyMessage from 'components/common/message/Message'

import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
import { CommonParams, options, userListUrl, userUpdateUrl, userSaveUrl } from 'base/askUrl'
import { authority } from 'base/author'

export default {
  components: {
    UserTable,
    MyMessage
  },

  data () {
    return {
      isShow: false,
      showMessage: false,
      messageType: 0,
      confirmClose: true,
      tableConfig: {
        tableName: 'users',
        listData: []
      }
    }
  },

  methods: {
    search(params) {
      let me = this;
      let searchParams = Object.assign({}, CommonParams, params);
      this._getUsersData(searchParams).then((res)=>{
        if(res.value.list) {
          let result = res.value.list;
          me.tableConfig.listData = result
        }else{
          me.tableConfig.listData = []
        }
      })
    },

    delUser(user) {
      let updateParams = Object.assign({}, CommonParams, {userId: user.userId, delFlag: user.delFlag});
      jsonp(userUpdateUrl, user, options).then((res)=>{
        this.showMessage = true
        if(res.status == true) {
          this.messageType = 0
          this.search({})
        }else{
          this.messageType = 1
        }
      })
    },

    enableUpdate(user) {
      let me = this;
      
      let updateParams = Object.assign({}, CommonParams, {userId: user.userId, userEnable: user.userEnable});
      jsonp(userUpdateUrl, updateParams, options).then((res)=>{
        this.showMessage = true
        if(res.status == true) {
          this.messageType = 0
        }else{
          this.messageType = 1
        }
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
        this.showMessage = true
        if(res.status == true) {
          this.messageType = 0
          this.confirmClose = !this.confirmClose
          this._initDate()
        }else {
          this.messageType = 1
        }
      })
    },

    dispear() {
      this.showMessage = false
    },

    _getUsersData(params) {
      let url = userListUrl
      console.log(userListUrl)
      console.log(params)
      return jsonp(url, params, options)
    },

    _initDate() {
      let me = this; 
      this._getUsersData(CommonParams).then((res)=>{
        let result = res.value.list;
        
        me.tableConfig.listData = result;
        me.setUserList(result);
        
      })
    },
    
    ...mapMutations(
      { setUserList : 'SET_SYS_USERUSERLIST' }
    )
  },
  created() {
    authority()
  },
  mounted() {
    this.$nextTick(()=>{
        this._initDate()
      })
  },
  watch: {
    
    'userList' : {
      handler(val, oldval) {
        if(val != oldval) {
          //console.log(val)
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
