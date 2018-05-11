<template>
  <div>
    <party-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"
    @getZone="getZone"
    @bind="bind"
    @unBind="unBind" 
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></party-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import PartyTable from './party/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, organizationListUrl, organizationEditUrl, organizationDeleteUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

  components: {
    PartyTable,
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

    //机构类别按参数查询方法
    paramsSearch(args) {
      if (args.name || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall( organizationListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
    },

    //机构类别按页码查询方法
    pageSearch(args) {
      let params = Object.assign({}, this.searchParams, args);
      unitCall(organizationListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //机构类别信息更新
    ok() {
      let url = '';
      let type = {...this.currentOrganization};
      if(type.addFlag) {
        url = organizationEditUrl;
        delete type.addFlag;
      }else if(type.modifyFlag) {
        url = organizationEditUrl;
        delete type.modifyFlag;
      }else if(type.delFlag) {
        url = organizationDeleteUrl;
        delete type.delFlag;
      }
      unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    getZone() {
      console.log(100);
      /*
      this.__getLinkZone()
      .then(this.__linkZoneSuccess)
      .then(this.__getUnLinkZone)
      .then(this.__unLinkZoneSuccess)
      .catch(this.__failed)
      */
      //unitCall( linkZoneUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    bind() {
      console.log(1111)
      //unitCall( linkZoneUrl, { pageNum : 1}).then(this.__linkZoneSuccess).catch(this.__failed);
    },

    unBind() {
      console.log(222)
      //unitCall( linkZoneUrl, { pageNum : 1}).then(this.__unLinkZoneSuccess).catch(this.__failed);
    },

    //初始化列表数据
    __initDate() {
      unitCall( organizationListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setOrganizationList(result);
      }else{
        this.setOrganizationList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setOrganizationList(result);
      }else{
        this.setOrganizationList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //机构类别修改操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },

    //获取已关联的校区
    __getLinkZone() {
      return unitCall( linkZoneUrl, { pageNum : 1});
    },

    //获取未关联的校区
    __getUnLinkZone() {
      return unitCall( unLinkZoneUrl, { pageNum : 1});
    },

    //机构类别关联操作成功回调
    __linkZoneSuccess() {
      if(data.value.list) {
        let result = data.value.list;
        this.setLinkZoneList(result);
      }else{
        this.setLinkZoneList([]);
      }
    },

    //机构类别解除关联操作成功回调
    __unLinkZoneSuccess() {
      if(data.value.list) {
        let result = data.value.list;
        this.setUnLinkZoneList(result);
      }else{
        this.setUnLinkZoneList([]);
      }
    },
    
    //vuex引入设置类别数据方法
    ...mapMutations({ 
      setOrganizationList : 'SET_ORGANIZATIONLIST',
      setLinkZoneList : 'SET_LINKZONELIST',
      setUnLinkZoneList : 'SET_UNLINKZONELIST',
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
  },

  //vuex中引入机构类别数据
  computed: {
    ...mapGetters({
      organizationList : 'organizationData',
      currentOrganization : 'organization'
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
