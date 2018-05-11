<template>
  <div>
    <requests-table @paramsSearch="paramsSearch" @pageSearch="pageSearch" :totalNum="totalNum" :initPage="initPage"></requests-table>
    <my-message v-if="showMessage" :messageType="messageType" :errInfo="errInfo"></my-message>
  </div>
</template>

<script>
import RequestsTable from './requests/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { authority } from 'base/author';
import { Mixin } from 'base/mixin';
//import { unitCall, requestsUrl, logListUrl, appSrcListUrl } from 'base/askUrl';

export default {

  mixins: [Mixin],

  components: {
    RequestsTable,
    MyMessage
  },
  data () {
    return {
      isShow: false,
      showMessage: false,
      messageType: 0,
      totalNum: 0,
      searchParams: {}
    }
  },
  methods: {

    //流量搜索
    paramsSearch(args) {
      if (args.sacId || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__paramsSearchSuccess, this.__failed, requestsUrl, params);
    },

    //流量搜索
    pageSearch(args) {
      if (args.sacId || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__pageSearchSuccess, this.__failed, requestsUrl, params);
    },

    //初始化列表成功回调
    __pageSearchSuccess(data) {

      if(data.value.list) {
        let result = data.value.list;
        this.setRequestList(result);
      }else{
        this.setRequestList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //初始化列表成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setRequestList(result);
      }else{
        this.setRequestList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //初始化列表成功回调
    __initDataSuccess(data) {

      if(data.value.list) {
        let result = data.value.list;
        this.setRequestList(result);
      }else{
        this.setRequestList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
      this.__initAppList();

    },

    //初始化系统下拉列表成功回调
    __initAppListSuccess(data) {
      let result = data.value;
      this.setAppList(result);
    },

    //初始化数据
    __initData() {
      unitCall(this.__initDataSuccess, this.__failed, requestsUrl, { pageNum : 1});
    },

    //系统来源下拉列表数据
    __initAppList() {
      unitCall(this.__initAppListSuccess, this.__failed, appSrcListUrl);
    },

    //vuex引入列表数据存储方法
    ...mapMutations(
      { 
        setAppList : 'SET_SYS_APPSRCLIST',
        setRequestList : 'SET_SYS_REQUESTLIST'
      }
    )
  },

  created() {},
  
  mounted() {
    //初始化页面数据
    //this.__initData();
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
