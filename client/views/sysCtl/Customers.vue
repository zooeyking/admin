<template>
  <div>
    <customers-table :totalNum="totalNum"></customers-table>
    <my-message v-if="showMessage" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import CustomersTable from './customers/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { authority } from 'base/author';
import { unitCall, customersUrl } from 'base/askUrl';

export default {
  components: {
    CustomersTable,
    MyMessage
  },

  data () {
    return {
      isShow: false,
      showMessage: false,
      messageType: 0,
      totalNum: 0
    }
  },

  methods: {

    //初始化列表成功回调
    __initDateSuccess(data) {
      let result = data.value.list;
      this.totalNum = data.value.total;
      this.setCustomers(result);
    },

    //失败回调
    __failed(err) {
      this.showMessage = true;
      this.messageType = 1;
    },

    //初始化数据
    __initDate() {
      unitCall(this.__initDateSuccess, this.__failed, customersUrl, { pageNum : 1});
    },

    //vuex引入列表数据存储方法
    ...mapMutations(
      { 
        setCustomers : 'SET_SYS_CUSTOMERLIST'
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
