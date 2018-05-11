<template>
  <div>
    <user-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch" 
    @enableUpdate="enableUpdate" 
    @delUser="delUser" 
    @ok="renew"
    @getUserInfo="getUserInfo" 
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></user-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import UserTable from './user/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
//import { unitCall, userListUrl, userUpdateUrl, userSaveUrl, userRoleUrl, userDepartmentUrl } from 'base/askUrl';
import { authority } from 'base/author';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

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
      totalNum: 0,
      searchParams: {}
    }
  },

  methods: {

    //用户查询方法
    paramsSearch(args) {
      if (args.userName || args.userRealName || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      console.log(params);
      unitCall(this.__paramsSearchSuccess, this.__failed, userListUrl, params);
    },

    //用户查询方法
    pageSearch(args) {
      if (args.userName || args.userRealName || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      console.log(params);
      unitCall(this.__pageSearchSuccess, this.__failed, userListUrl, params);
    },

    //删除用户
    delUser() {
      let user = this.currentUser;
      unitCall(this.__operaSuccess, this.__failed, userUpdateUrl, user);
    },

    //用户是否禁用
    enableUpdate() {
      let user = this.currentUser;
      unitCall(this.__operaSuccess, this.__failed, userUpdateUrl, user);
    },

    //用户信息更新
    renew() {
      let url = '';
      let user = this.currentUser;
      if(user.userId) {
        url = userUpdateUrl;
      }else {
        url = userSaveUrl;
      }
      unitCall(this.__operaSuccess, this.__failed, url, user);
    },

    //用户信息获取
    getUserInfo() {
      let user = this.currentUser;
      unitCall(this.__userRoleInfoSuccess, this.__failed, userRoleUrl, { userId: user.userId });
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      unitCall(this.__pageSearchSuccess, this.__failed, userListUrl, { pageNum : 1});
    },

    //用户查询成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setUserList(result);
      }else{
        this.setUserList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //用户查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setUserList(result);
      }else{
        this.setUserList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //用户角色信息查询回调
    __userRoleInfoSuccess(data) {
      let result = data.value ? data.value : [];
      this.setUserRoleInfo(result);
      this.__getUserPartments();
    },

    //用户部门信息查询
    __getUserPartments() {
      let user = this.currentUser;
      unitCall(this.__userPartmentInfoSuccess, this.__failed, userDepartmentUrl, { userId: user.userId });
    },

    //用户部门信息查询回调
    __userPartmentInfoSuccess(data) {
      let result = data.value ? data.value : [];
      this.setUserDepartmentInfo(result);
    },

    //单个用户操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
      this.__initDate();
    },
    
    //vuex引入设置用户数据方法
    ...mapMutations({ 
      setUserList : 'SET_SYS_USERUSERLIST',
      setCurrentUser : 'SET_SYS_CURRENTUSER',
      setUserRoleInfo : 'SET_SYS_USERROLEINFO',
      setUserDepartmentInfo : 'SET_SYS_USERDEPARTMENTINFO'
    })
  },

  //权限校验
  created() {},

  //挂载后初始化列表数据
  mounted() {
    //this.__initDate();
  },

  //用户数据监听
  watch: {
    userList(newval) {
      
    }
  },

  //vuex中引入用户数据
  computed: {
    ...mapGetters({
      userList : 'userData',
      currentUser : 'user'
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
