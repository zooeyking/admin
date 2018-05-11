<template>
  <div>
    <zone-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch" 
    @ok="ok"
    @getZoneInfo="getZoneInfo" 
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></zone-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import ZoneTable from './zone/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, zoneListUrl, zoneEditUrl, zoneDeleteUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

  components: {
    ZoneTable,
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

    //校区搜索方法
    paramsSearch(args) {
      if (args.name || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, args);
      unitCall(zoneListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed)
    },

    //校区分页数据获取方法
    pageSearch(args) {
      let params = Object.assign({}, this.searchParams, args);
      unitCall(zoneListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //校区信息更新
    ok() {
      let url = '';
      let zone = {...this.currentZone};
      if(zone.delFlag === 1) {

        url = zoneDeleteUrl;
        delete zone.delFlag;

      }else if(zone.addFlag) {

        url = zoneEditUrl;
        delete zone.addFlag;

      }else if(zone.modifyFlag) {

        url = zoneEditUrl;
        delete zone.modifyFlag;

      }
      
      unitCall(url, zone).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //校区信息获取
    getZoneInfo() {
      let zone = this.currentZone;
      unitCall( zoneEditUrl, { zoneId: zone.zoneId }).then(this.__zoneInfoSuccess).catch(this.__failed);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      unitCall( zoneListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //初始化校区查询成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setZoneList(result);
      }else{
        this.setZoneList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setZoneList(result);
      }else{
        this.setZoneList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //校区信息查询回调
    __zoneInfoSuccess(data) {
      let result = data.value ? data.value : [];
      this.setZoneInfo(result);
    },

    //单个校区数据更新操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },
    
    //vuex引入设置校区数据方法
    ...mapMutations({ 
      setZoneList : 'SET_ZONELIST',
      setCurrentZone : 'SET_CURRENTZONE',
      setZoneInfo : 'SET_CURRENTZONEINFO'
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
  },

  //vuex中引入用户数据
  computed: {
    ...mapGetters({
      zoneList : 'zoneData',
      currentZone : 'zone'
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
