<template>
  <div>
    <agency-tabs @tabChange="tabChange" @open="open"  :confirmClose="confirmClose" :totalNum="totalNum"></agency-tabs>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import AgencyTabs from './agency/Tabs';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, agencyListUrl, agencyEditUrl, agencyDeleteUrl, organizationListUrl, zoneListUrl, buildingListUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';
import Bus from 'base/bus';
 
export default {

  mixins: [Mixin],

  components: {
    AgencyTabs,
    MyMessage
  },

  data () {
    return {
      isShow: false,
      firstGetBuild: true,
      showMessage: false,
      messageType: 0,
      confirmClose: true,
      totalNum: 0,
      searchParams: {}
    }
  },

  methods: {

    //校区切换
    tabChange() {
      this.__getOrganizationGroup().then(this.__getGroupSuccess).catch(this.__failed);
    },

    //机构按参数查询方法
    paramsSearch(args) {
      if (args.name || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall( agencyListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
    },

    //机构按页码查询方法
    pageSearch(args) {
      let params = Object.assign({}, this.searchParams, args);
      unitCall( agencyListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },


    //机构信息更新
    __handlerOk() {
      let url = '';
      let agency = {...this.currentAgency};
      
      if(agency.addFlag) {
        url = agencyEditUrl;
        delete agency.addFlag;
      }else if(agency.modifyFlag) {
        url = agencyEditUrl;
        delete agency.architeEntity;
        delete agency.organization;
        delete agency.modifyFlag;
      }else if(agency.delFlag) {
        url = agencyDeleteUrl;
        delete agency.delFlag;
      }
      
      unitCall(url, agency).then(this.__operaSuccess).catch(this.__failed).then(this.open);
    },

    //展开切换
    open() {
      this.__getAgency()
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      this.__getCampus()
      .then(this.__getCampusSuccess)
      .catch(this.__failed);
    },

    //获取校区
    __getCampus() {
      return unitCall( zoneListUrl, { pageNum : 1});
    },

    //获取建筑物
    __getBuildings() {
      if(this.firstGetBuild) {
        unitCall( buildingListUrl, { pageNum : 1}).then((data)=>{
          if(data.value[0].list) {
            let result = data.value[0].list;
            this.setBuildingList(result);
          }else{
            this.setBuildingList([]);
          }
          this.firstGetBuild = false;
        }).catch(this.__failed);
      }
    },

    //校区成功回调
    __getCampusSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setZoneList(result);
      }else{
        this.setZoneList([]);
      }
    },

    //获取校区拥有的机构类
    __getOrganizationGroup() {
      let zone = this.currentZone;
      return unitCall( organizationListUrl, { pageNum : 1, cid : zone.id });
    },

    //校区机构类成功回调
    __getGroupSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setAgencyGroupList(result);
      }else{
        this.setAgencyGroupList([]);
      }
    },

    //获取机构
    __getAgency(page=1) {
      let cid = this.currentZone.id;
      let group = this.currentAgencyGroup ? this.currentAgencyGroup : {};
      return unitCall( agencyListUrl, { pageNum : page, oid : group.id, cid }).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setAgencyList(result);
      }else{
        this.setAgencyList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setAgencyList(result);
      }else{
        this.setAgencyList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
      this.initPage = !this.initPage;
    },

    //机构修改操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },
    
    //vuex引入设置类别数据方法
    ...mapMutations({ 
      setAgencyList : 'SET_AGENCYLIST',
      setCurrentAgency : 'SET_CURRENTAGENCY',
      setZoneList : 'SET_ZONELIST',
      setBuildingList : 'SET_BUILDINGLIST',
      setAgencyGroupList : 'SET_AGENCYGROUPLIST',
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
    Bus.$on('ok', this.__handlerOk);
    Bus.$on('getAgencys', (index)=>{this.__getAgency(index)});
    Bus.$on('getBuildings', this.__getBuildings);
  },

  beforeDestroy () {
    Bus.$off('ok');
    Bus.$off('getAgencys');
    Bus.$off('getBuildings');
  },

  //vuex中引入建筑类别数据
  computed: {
    ...mapGetters({
      agencyList : 'agencyData',
      currentAgency : 'agency',
      zoneList : 'zoneData',
      currentZone : 'zone',
      currentAgencyGroup : 'agencyGroup',
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
