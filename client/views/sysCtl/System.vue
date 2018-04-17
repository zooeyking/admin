<template>
  <div>
    <system-table  @addSystem="addSystem" @paramsSearch="paramsSearch" @pageSearch="pageSearch" :totalNum="totalNum" :confirmClose="confirmClose" :initPage="initPage"></system-table>
    <my-message v-if="showMessage" :messageType="messageType" :errInfo="errInfo"></my-message>
  </div>
</template>

<script>
import SystemTable from './system/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, systemListUrl, systemSaveUrl } from 'base/askUrl';
import { authority } from 'base/author';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

  components: {
    SystemTable,
    MyMessage
  },

  data () {
    return {
      showMessage: false,
      messageType: 0,
      totalNum: 0,
      confirmClose: false,
      searchParams: {}
    }
  },

  methods: {

    //添加系统
    addSystem(newSystem) {
      unitCall(this.__addSuccess, this.__failed, systemSaveUrl, newSystem);
    },

    //页面系统列表数据搜索
    pageSearch(args) {
      if (args.sacName || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__pageSearchSuccess, this.__failed, systemListUrl, params);
    },

    //页面系统列表数据搜索
    paramsSearch(args) {
      if (args.sacName || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__paramsSearchSuccess, this.__failed, systemListUrl, params);
    },

    //添加成功回调
    __addSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
      this.__initDate();
    },

    //初始化数据成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setSystems(result);
      }else{
        this.setSystems([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //初始化数据成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setSystems(result);
      }else{
        this.setSystems([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //初始化系统数据
    __initDate() {
      unitCall(this.__pageSearchSuccess, this.__failed, systemListUrl, { pageNum : 1});
    },

    //vuex中引入系统数据设置方法
    ...mapMutations({
      setSystems : 'SET_SYS_SYSTEMLIST'
    })
  },

  created() {},

  mounted() {
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
