<template>
  <div>
    <my-table

    @pageSearch="search"
    @paramsSearch="search"
    @ok="ok"
    :confirmClose="confirmClose"
    :totalNum="totalNum"

    ></my-table>

    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import { authority } from 'base/author';
import { unitCall, appSrcListUrl, operateAddUrl, operateSearchUrl, operateDelUrl } from 'base/askUrl';
import { mapGetters, mapMutations } from 'vuex';
import MyMessage from 'components/common/message/Message';
import MyTable from './power/Table';
import Confirm from './power/Modal';

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
      searchParams: {}
    }
  },

  methods: {

    //页面部门列表数据搜索
    search(args) {

      if (args.sacId) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      
      unitCall(this.__searchSuccess, this.__failed, operateSearchUrl, params);
    },

    //关闭编辑面板
    closeDetail() {
      this.confirmShow = false
    },

    //确认修改
    ok() {
      let url = '';
      let power = this.currentPower;

      if(power.operateId && power.delFlag === 1) {

        url = operateDelUrl;
        power = Object.assign({}, power);
        delete power.delFlag;

      }else {

        url = operateAddUrl;

      }

      unitCall(this.__operateSuccess, this.__failed, url, power);
    },

    //提示框
    dispear() {
      this.showMessage = false;
    },

    //初始化系统配置列表成功回调
    __initAppSuccess(data) {
      let result = data.value ? data.value : [];
      //let sacId = result[0]['sacId'];
      //this.__init();
      this.setAppList(result);
    },

    //初始化系统配置列表数据
    __initAppList() {
      unitCall(this.__initAppSuccess, this.__failed, appSrcListUrl);
    },

    //添加成功回调
    __operateSuccess() {
      let searchParams = this.searchParams;
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
      this.search(searchParams);
    },

    //初始化数据成功回调
    __searchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.totalNum = data.value.total;
        this.setPowers(result);
      }else{
        this.setPowers([]);
      }
    },

    //失败回调
    __failed(err) {
      console.log(err);
      this.showMessage = true;
      this.messageType = 1;
    },
    
    //vuex引入设置部门方法
    ...mapMutations({
      setPowers : 'SET_SYS_POWERLIST',
      setCurrentPower : 'SET_SYS_CURRENTPOWER',
      setAppList : 'SET_SYS_APPSRCLIST',
    })
  },

  created() {
    authority();
  },

  mounted() {
    this.__initAppList();
  },

  //vuex引入部门数据
  computed: {
    ...mapGetters({
      powers : 'powerData',
      appList : 'appList',
      currentPower : 'power'
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
