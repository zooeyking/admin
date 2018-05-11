<template>
  <div>
    <building-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></building-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import BuildingTable from './buildings/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, buildingListUrl, buildingEditUrl, buildingDeleteUrl, buildingTypeListUrl, zoneListUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

  components: {
    BuildingTable,
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
      if (args.userName || args.userRealName || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      
      unitCall( buildingListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
      
    },

    //按照页码查询方法
    pageSearch(args) {
      
      let params = Object.assign({}, this.searchParams, args);
      
      unitCall( buildingListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //建筑信息更新
    ok() {
      let url = '';
      let building = {...this.currentBuilding};
      if(building.addFlag) {
        url = buildingEditUrl;
        delete building.addFlag;
      }else if(building.modifyFlag) {
        url = buildingEditUrl;
        delete building.modifyFlag;
      }else if(building.delFlag) {
        url = buildingDeleteUrl;
        delete building.delFlag;
      }
      
      unitCall(url, building).then(this.__operaSuccess).catch(this.__failed).then(this.__getBuildings).then(this.__paramsSearchSuccess);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      this.__getBuildings()
      .then(this.__pageSearchSuccess)
      .then(this.__getCampus)
      .then(this.__getCampusSuccess)
      .then(this.__getBuildingTypes)
      .then(this.__getBuildingTypesSuccess)
      .catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setBuildingList(result);
      }else{
        this.setBuildingList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //获取建筑列表
    __getBuildings() {
      return unitCall(buildingListUrl, { pageNum : 1 });
    },

    //获取校区列表
    __getCampus() {
      return unitCall(zoneListUrl, { pageNum : 1 });
    },

    //获取建筑类别列表
    __getBuildingTypes() {
      return unitCall(buildingTypeListUrl, { pageNum : 1 });
    },

    //获取校区成功回调
    __getCampusSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setZoneList(result);
      }else{
        this.setZoneList([]);
      }
    },

    //获取建筑类别成功回调
    __getBuildingTypesSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setBuildingTypeList(result);
      }else{
        this.setBuildingTypeList([]);
      }
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {

      if(data.value.list) {
        let result = data.value.list;
        this.setBuildingList(result);
      }else{
        this.setBuildingList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //单个建筑更新操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },
    
    //vuex引入设置用户数据方法
    ...mapMutations({ 
      setBuildingList : 'SET_BUILDINGLIST',
      setZoneList : 'SET_ZONELIST',
      setBuildingTypeList : 'SET_BUILDINGTYPELIST',
      setCurrentBuilding : 'SET_CURRENTBUILDING'
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
  },

  //vuex中引入建筑数据
  computed: {
    ...mapGetters({
      buildingList : 'buildingData',
      typeList : 'buildingTypeData',
      zoneList : 'zoneData',
      currentBuilding : 'building'
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
