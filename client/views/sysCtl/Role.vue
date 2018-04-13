<template>
  <div>
    <role-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"  
    @delRole="delRole" 
    @ok="renew"
    @userSearch="userSearch"
    @getPowers="getPowers" 
    :confirmClose="confirmClose" 
    :userSearchResult="userSearchResult" 
    :rolePowerList="rolePowerList"
    :totalNum="totalNum"
    :initPage="initPage"  

    ></role-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import RoleTable from './role/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { authority } from 'base/author';
import { Mixin } from 'base/mixin';
import { unitCall, unbindedRoleUsersUrl, roleListUrl, roleUpdateUrl, roleSaveUrl, roleCopyUrl, roleDelUrl, appSrcListUrl, powerListUrl, roleUserUrl,  roleBindUrl, roleUnbindUrl } from 'base/askUrl';

export default {

  mixins: [Mixin],

  components: {
    RoleTable,
    MyMessage
  },

  data () {
    return {
      isShow: false,
      showMessage: false,
      messageType: 0,
      confirmClose: true,
      userSearchResult: {},
      rolePowerList: [],
      totalNum: 0,
      searchParams: {}
    }
  },

  methods: {

    //角色列表搜索
    paramsSearch(args) {
      if (args.roleName || args.sacId) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__paramsSearchSuccess, this.__failed, roleListUrl, params);
    },

    //角色列表搜索
    pageSearch(args) {
      if (args.roleName || args.sacId) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__pageSearchSuccess, this.__failed, roleListUrl, params);
    },

    //用户绑定搜索
    userSearch(user) {
      let role = this.currentRole;
      console.log(user);
      let url = user.optionType == 0 ? unbindedRoleUsersUrl : roleUserUrl;
      console.log(url);
      delete user.optionType;
      let params = Object.assign({}, user, { roleId : role.roleId });
      unitCall(this.__userSearchSuccess, this.__failed, url, params);
    },

    //删除角色
    delRole() {
      let role = this.currentRole;
      unitCall(this.__updateRoleSuccess, this.__failed, roleDelUrl, role);
    },

    //更新角色
    renew() {
      let url = '';
      let role = this.currentRole;
      if(role.roleId && role.operateIds) {
        url = roleUpdateUrl;
      }else if(role.roleId && role.userIds) {
        console.log(role.optionType);
        url = role.optionType === 0 ? roleBindUrl : roleUnbindUrl;
        role = Object.assign({}, role);
        delete role.optionType;
      }else if(role.roleId) {
        url = roleCopyUrl;
      }else {
        url = roleSaveUrl;
      }

      unitCall(this.__updateRoleSuccess, this.__failed, url, role);
    },

    //获得角色拥有的权限
    getPowers(role) {
      this.__getPowerList(role);
    },

    //关闭操作面板
    dispear() {
      this.showMessage = false;
    },

    //角色搜索成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setRoleList(result);
      }else{
        this.setRoleList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //角色搜索成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setRoleList(result);
      }else{
        this.setRoleList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //用户搜索成功回调
    __userSearchSuccess(data) {
      if(data.value.list) {
        this.userSearchResult = data.value;
      }else{
        this.userSearchResult = '查无此用户';
      }
    },

    //删除/更新角色成功回调
    __updateRoleSuccess(data) {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
      this.__initDate();
    },

    //移除/绑定单个用户成功回调
    __roleUserSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      let role = this.currentRole;
    },

    //角色权限数据成功回调
    __powerListSuccess(data) {
      this.rolePowerList = data.value;
    },

    //获取角色权限列表
    __getPowerList(role) {
      let params = { roleId : role.roleId };
      unitCall(this.__powerListSuccess, this.__failed, powerListUrl, params);
    },

    //初始化页面数据成功回调
    __initSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setRoleList(result);
      }else{
        this.setRoleList([]);
      }
      
      this.totalNum = data.value.total ? data.value.total : 0;
      this.__initAppList();
    },

    //初始化角色页面数据
    __initDate() {

      unitCall(this.__initSuccess, this.__failed, roleListUrl, { pageNum : 1});
    },

    //初始化系统配置列表成功回调
    __initAppSuccess(data) {
      let result = data.value ? data.value : [];
      this.setAppList(result);
    },

    //初始化系统配置列表数据
    __initAppList() {
      unitCall(this.__initAppSuccess, this.__failed, appSrcListUrl);
    },

    //vuex中引入设置方法
    ...mapMutations(
      { 
        setRoleList : 'SET_SYS_ROLELIST', 
        setAppList : 'SET_SYS_APPSRCLIST',
      }
    )
  },

  created() {
    
  },

  mounted() {
    //debugger
    this.__initDate();
  },

  watch: {
  
  },

  computed: {
    //vuex中引入所需数据
    ...mapGetters({
      roleList : 'roleData',
      currentRole : 'role',
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
