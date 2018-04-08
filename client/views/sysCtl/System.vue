<template>
  <div>
    <system-table  @addSystem="addSystem" @paramsSearch="search" :totalNum="totalNum" :confirmClose="confirmClose"></system-table>
    <my-message v-if="showMessage" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import SystemTable from './system/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, systemListUrl, systemSaveUrl } from 'base/askUrl';
import { authority } from 'base/author';

export default {
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
    search(args) {
      if (args.sacName || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall(this.__searchSuccess, this.__failed, systemListUrl, params);
    },

    //添加成功回调
    __addSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
      this.__initDate();
    },

    //初始化数据成功回调
    __searchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.totalNum = data.value.total;
        this.setSystems(result);
      }else{
        this.setSystems([]);
      }
    },

    //失败回调
    __failed(err) {
      console.log(err);
      this.showMessage = true;
      this.messageType = 1;
    },

    //初始化系统数据
    __initDate() {
      unitCall(this.__searchSuccess, this.__failed, systemListUrl, { pageNum : 1});
    },

    //vuex中引入系统数据设置方法
    ...mapMutations({
      setSystems : 'SET_SYS_SYSTEMLIST'
    })
  },

  created() {
    authority();
  },

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
