<template>
  <div>
    <guide-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch" 
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></guide-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import GuideTable from './guide/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, buildingTypeListUrl, buildingTypeEditUrl, buildingTypeDeleteUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

  components: {
    GuideTable,
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

    //建筑类别按参数查询方法
    paramsSearch(args) {
      if (args.name || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall( buildingTypeListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
    },

    //建筑类别按页码查询方法
    pageSearch(args) {
      let params = Object.assign({}, this.searchParams, args);
      unitCall(buildingTypeListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //建筑类别信息更新
    ok() {
      let url = '';
      let type = {...this.currentType};
      if(type.addFlag) {
        url = buildingTypeEditUrl;
        delete type.addFlag;
      }else if(type.modifyFlag) {
        url = buildingTypeEditUrl;
        delete type.modifyFlag;
      }else if(type.delFlag) {
        url = buildingTypeDeleteUrl;
        delete type.delFlag;
      }
      
      unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      unitCall( buildingTypeListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setBuildingTypeList(result);
      }else{
        this.setBuildingTypeList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setBuildingTypeList(result);
      }else{
        this.setBuildingTypeList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
      this.initPage = !this.initPage;
    },

    //建筑类别修改操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },
    
    //vuex引入设置类别数据方法
    ...mapMutations({ 
      setBuildingTypeList : 'SET_BUILDINGTYPELIST',
      setCurrentType : 'SET_CURRENTTYPE',
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
  },

  //vuex中引入建筑类别数据
  computed: {
    ...mapGetters({
      typeList : 'buildingTypeData',
      currentType : 'buildingType'
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
