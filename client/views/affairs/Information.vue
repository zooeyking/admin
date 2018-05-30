<template>
  <div>
    <information-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></information-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType" :errInfo="errInfo"></my-message>
  </div>
</template>

<script>
import InformationTable from './information/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, zoneListUrl,  buildingListUrl, serviceTypeListUrl, informationListUrl, informationEditUrl, informationDeleteUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';
import Bus from 'base/bus';

export default {

  mixins: [Mixin],

  components: {
    InformationTable,
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

    //按照参数查询方法
    paramsSearch(args) {
      if (args.title || args.cid || args.scid || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      
      unitCall( informationListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
      
    },

    //按照页码查询方法
    pageSearch(args) {
      
      let params = Object.assign({}, this.searchParams, args);
      
      unitCall( informationListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //管理信息更新
    ok() {
      let url = '';
      let information = {...this.currentInformation};
      if(information.addFlag) {
        url = informationEditUrl;
        delete information.addFlag;
      }else if(information.modifyFlag) {
        url = informationEditUrl;
        delete information.serviceCategory;
        delete information.campus;
        delete information.architeEntuty;
        delete information.modifyFlag;
      }else if(information.delFlag) {
        url = informationDeleteUrl;
        delete information.serviceCategory;
        delete information.campus;
        delete information.architeEntuty;
        delete information.position;
        delete information.delFlag;
      }
      
      unitCall(url, information).then(this.__operaSuccess).then(this.__getInformation).then(this.__getInfoSuccess).catch(this.__failed);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      this.__getInformation()
      .then(this.__getInfoSuccess)
      .then(this.__getCampus)
      .then(this.__getCampusSuccess)
      .then(this.__getInfoType)
      .then(this.__getInfoTypeSuccess)
      .catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setBuildingList(result);
      }else{
        this.setBuildingList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
    },

    //获取信息列表
    __getInformation() {
      return unitCall(informationListUrl, { pageNum : 1 });
    },

    //获取建筑列表
    __getBuildings(cid) {
      unitCall(buildingListUrl, { pageNum : 1 , cid}).then(this.__getBuildingSuccess).catch(this.__failed);
    },

    //获取校区列表
    __getCampus() {
      return unitCall(zoneListUrl, { pageNum : 1 });
    },

    //获取信息类别列表
    __getInfoType() {
      return unitCall(serviceTypeListUrl, { pageNum : 1 });
    },

    //获取信息数据成功回调
    __getInfoSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setInformationList(result);
      }else{
        this.setInformationList([]);
      }
    },

    //获取校区成功回调
    __getCampusSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setZoneList(result);
      }else{
        this.setZoneList([]);
      }
    },

    //获取建筑成功回调
    __getBuildingSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setBuildingList(result);
      }else{
        this.setBuildingList([]);
      }
    },

    //获取信息类别成功回调
    __getInfoTypeSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setServiceTypeList(result);
      }else{
        this.setServiceTypeList([]);
      }
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {

      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setInformationList(result);
      }else{
        this.setInformationList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
      this.initPage = !this.initPage;
    },

    //单个建筑更新操作成功回调
    __operaSuccess(data) {
      
      if(!data.status) {
        this.showMessage = true;
        this.messageType = 1;
        this.errInfo = data.value || data.message;
        return;
      }
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },
    
    //vuex引入设置用户数据方法
    ...mapMutations({ 
      setBuildingList : 'SET_BUILDINGLIST',
      setZoneList : 'SET_ZONELIST',
      setServiceTypeList : 'SET_SERVICETYPELIST',
      setInformationList : 'SET_INFORMATIONLIST',
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
    Bus.$on('getBuildings', this.__getBuildings);
  },

  //清除Bus监听
  beforeDestroy() {
    Bus.$off('getBuildings');
  },

  //vuex中引入建筑数据
  computed: {
    ...mapGetters({
      currentInformation : 'information'
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
