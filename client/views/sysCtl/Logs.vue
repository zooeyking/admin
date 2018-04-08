<template>
  <div>
    <logs-table @paramsSearch="search" :totalNum="totalNum"></logs-table>
    <my-message v-if="showMessage" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import LogsTable from './logs/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { authority } from 'base/author';
import { unitCall, appSrcListUrl, logListUrl } from 'base/askUrl';

export default {
  components: {
    LogsTable,
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

    //日志搜索
    search(args) {
      if (args.userName || args.sacId || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      
      unitCall(this.__searchSuccess, this.__failed, logListUrl, params);
    },

    //搜索成功回调
    __searchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.totalNum = data.value.total;
        this.setLogs(result);
      }else{
        this.setLogs([]);
      }
    },

    //初始化列表成功回调
    __initDateSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.totalNum = data.value.total;
        this.setLogs(result);
      }else{
        this.setLogs([]);
      }
      this.__initAppList();
    },

    //初始化系统下拉列表成功回调
    __initAppListSuccess(data) {
      let result = data.value;
      this.setAppList(result);
    },

    //失败回调
    __failed(err) {
      this.showMessage = true;
      this.messageType = 1;
    },

    //初始化数据
    __initDate() {
      unitCall(this.__initDateSuccess, this.__failed, logListUrl, { pageNum : 1});
    },

    
    //系统来源下拉列表数据
    __initAppList() {
      unitCall(this.__initAppListSuccess, this.__failed, appSrcListUrl);
    },

    //vuex引入列表数据存储方法
    ...mapMutations(
      { 
        setAppList : 'SET_SYS_APPSRCLIST',
        setLogs : 'SET_SYS_LOGLIST'
      }
    )
  },

  created() {
    //权限验证
    authority();
  },
  
  mounted() {
    //初始化页面数据
    this.__initDate();
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
