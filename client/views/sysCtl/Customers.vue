<template>
  <div>
    <customers-table :totalNum="totalNum" :initPage="initPage"></customers-table>
    <my-message v-if="showMessage" :messageType="messageType" :errInfo="errInfo"></my-message>
  </div>
</template>

<script>
import CustomersTable from './customers/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { authority } from 'base/author';
import { Mixin } from 'base/mixin';
import { unitCall, customersUrl } from 'base/askUrl';

export default {

  mixins: [Mixin],

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
      if(data.value.list) {
        let result = data.value.list;
        this.setCustomers(result);
      }else{
        this.setCustomers([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
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

  created() {},
  
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
