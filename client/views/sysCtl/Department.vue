<template>
  <div>

    <my-table

    @paramsSearch="search"
    @userSearch="userSearch"
    @ok="ok"
    :confirmClose="confirmClose"
    :userSearchResult="userSearchResult" 
    :totalNum="totalNum"

    ></my-table>

    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import { authority } from 'base/author';
import { unitCall, unbindedPartmentUsersUrl, partmentListUrl, partmentSaveUrl, partmentUserUrl, partmentBindUrl, partmentUnbindUrl, partmentDelUrl } from 'base/askUrl';
import { mapGetters, mapMutations } from 'vuex';
import MyMessage from 'components/common/message/Message';
import MyTable from './department/Table';
import Confirm from './department/Modal';
import { __treesData } from 'tools/js/util';

export default {
  components: {
    Confirm,
    MyTable,
    MyMessage
  },

  data () {
    return {
      isShow: false,
      confirmShow: false,
      confirmClose: true,
      showMessage: false,
      messageType: 0,
      totalNum: 0,
      userSearchResult: [],
      modalConfig: {},
      searchParams: {}
    }
  },

  methods: {

    //职员搜索
    userSearch(user) {
      let partment = this.currentDepartmet;
      console.log(user);
      let url = user.optionType == 0 ? unbindedPartmentUsersUrl : partmentUserUrl;
      console.log(url);
      delete user.optionType;
      let params = Object.assign({}, user, { dId : partment.dId });
      unitCall(this.__searchSuccess, this.__failed, url, params);
    },

    //页面部门列表数据搜索
    search(args) {

      if (args.dName) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);

      unitCall(this.__pageDataSuccess, this.__failed, partmentListUrl, params);
    },

    //关闭编辑面板
    closeDetail() {
      this.confirmShow = false
    },

    //确认修改
    ok() {
      let url = '';
      let partment = this.currentDepartmet;

      if(partment.dId && partment.delFlag === 1) {

        url = partmentDelUrl;
        partment = Object.assign({}, partment);
        delete partment.delFlag;

      }else if(partment.dId && partment.userIds) {

        url = partment.optionType === 0 ? partmentBindUrl : partmentUnbindUrl;
        partment = Object.assign({}, partment);
        delete partment.optionType;

      }else {
        url = partmentSaveUrl;
      }

      unitCall(this.__addSuccess, this.__failed, url, partment);
    },

    // 点击节点
    nodeClick:function(m){
       //console.log(JSON.parse(JSON.stringify(m)));
    },

    //提示框
    dispear() {
      this.showMessage = false
    },

    //搜索成功回调
    __searchSuccess(data) {
      if(data.value.list) {
        this.userSearchResult = data.value;
      }else{
        this.userSearchResult = '查无此用户';
      }
    },

    //用户解绑/绑定成功回调
    __bindToggle() {
      let partment = this.currentDepartmet;
      this.__partmentUserList(partment);
    },

    //添加成功回调
    __addSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
      this.__init();
    },

    //初始化数据成功回调
    __pageDataSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.totalNum = data.value.total;
        this.setDepartments(result);
      }else{
        this.setDepartments([]);
      }
    },

    //失败回调
    __failed(err) {
      console.log(err);
      this.showMessage = true;
      this.messageType = 1;
    },

    //查询用户成功回调
    __userListSuccess(data) {
      this.modalConfig.userList = data.value ? data.value : [];
    },

    //初始化部门数据列表
    __init() {
      unitCall(this.__pageDataSuccess, this.__failed, partmentListUrl);
    },

    //查询选取部门下绑定的用户
    __partmentUserList(partment) {
      let params = { dId : partment.dId };
      unitCall(this.__userListSuccess, this.__failed, partmentUserUrl, params);
    },
    
    //vuex引入设置部门方法
    ...mapMutations({
      setDepartments : 'SET_SYS_DEPARTMENTLIST',
      setCurrentDepartment : 'SET_SYS_CURRENTDEPARTMENT'
    })
  },

  created() {
    authority()
  },

  mounted() {
    this.__init()
  },

  //vuex引入部门数据
  computed: {
    ...mapGetters({
      departments : 'departmentData',
      appList : 'appList',
      currentDepartmet : 'department'
    })
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
