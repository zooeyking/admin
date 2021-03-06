<template>
  <div>
    <guide-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"
    @getLinkInfo="getLinkInfo"
    @getUnLinkInfo="getUnLinkInfo"
    @getInfoType="getInfoType" 
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></guide-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType" :errInfo="errInfo"></my-message>
  </div>
</template>

<script>
import GuideTable from './guide/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, guideListUrl, guideEditUrl, guideDeleteUrl, serviceTypeListUrl, informationListUrl, linkInfoUrl, unLinkInfoUrl, infoRelationsUrl, infoNotRelationsUrl, sortServiceInfoUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';
import Bus from 'base/bus';

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

    //引导按参数查询方法
    paramsSearch(args) {
      if (args.name || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall( guideListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
    },

    //引导按页码查询方法
    pageSearch(args) {
      let params = Object.assign({}, this.searchParams, args);
      unitCall(guideListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //已关联信息按参数查询方法
    linkInfoSearch(args) {
      let currentId = this.currentGuide.id;
      let params = Object.assign({id : currentId, pageSize : 10, pageNum : 1}, args);
      return unitCall( infoRelationsUrl, params).then(this.__getLinkInfoSuccess).catch(this.__failed);
    },

    //未关联信息按参数查询方法
    unLinkInfoSearch(args) {
      let currentId = this.currentGuide.id;
      let params = Object.assign({id : currentId, pageSize : 10, pageNum : 1}, args);
      return unitCall( infoNotRelationsUrl, params).then(this.__getUnLinkInfoSuccess).catch(this.__failed);
    },

    //引导信息更新
    ok() {
      let url = '';
      let type = {...this.currentGuide};
      
      if(type.addFlag) {
        url = guideEditUrl;
        delete type.addFlag;
      }else if(type.modifyFlag) {
        url = guideEditUrl;
        delete type.guide;
        delete type.serviceInfoList;
        delete type.modifyFlag;
      }else if(type.delFlag) {
        url = guideDeleteUrl;
        delete type.guide;
        delete type.serviceInfoList;
        delete type.delFlag;
      }
      
      unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //查询已绑定信息方法
    getLinkInfo(pageNum=1) {
      let currentId = this.currentGuide.id;
      return unitCall( infoRelationsUrl, { pageNum : pageNum, id : currentId, pageSize : 10}).then(this.__getLinkInfoSuccess).catch(this.__failed);
    },

    //查询所有已绑定信息方法
    getAllLinkInfo(pageNum=1) {
      let currentId = this.currentGuide.id;
      return unitCall( infoRelationsUrl, { pageNum : pageNum, id : currentId, sortPage: true, pageSize : 10}).then(this.__getLinkInfoSuccess).catch(this.__failed);
    },

    //查询未绑定信息方法
    getUnLinkInfo(pageNum=1) {
      let currentId = this.currentGuide.id;
      return unitCall( infoNotRelationsUrl, { pageNum : pageNum, id : currentId, pageSize : 10}).then(this.__getUnLinkInfoSuccess).catch(this.__failed);
    },

    //获取信息类型
    getInfoType() {
      unitCall( serviceTypeListUrl, { pageNum : 1}).then(this.__getInfoTypeSuccess).catch(this.__failed);
    },

    //初始化列表数据
    __initDate() {
      unitCall( guideListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setGuideList(result);
      }else{
        this.setGuideList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setGuideList(result);
      }else{
        this.setGuideList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
      this.initPage = !this.initPage;
    },

    //引入信息操作
    __doLink(selectedInfos) {
      let url = linkInfoUrl;
      let type = {...this.currentGuide};
      delete type.guide;
      delete type.serviceInfoList;
      let selectedStr = selectedInfos.join();
      
      let final = Object.assign({}, type, { siid: selectedStr});
      
      unitCall(url, final).then(this.__operaBindSuccess).catch(this.__failed).then(this.getUnLinkInfo).then(this.getLinkInfo).then(this.__initDate);
    },

    //移除信息操作
    __doUnLink(selectedInfos) {
      let url = unLinkInfoUrl;
      let type = {...this.currentGuide};
      delete type.guide;
      delete type.serviceInfoList;
      let selectedStr = selectedInfos.join();
      
      let final = Object.assign({}, type, { siid: selectedStr});
      
      unitCall(url, final).then(this.__operaBindSuccess).catch(this.__failed).then(this.getLinkInfo).then(this.getUnLinkInfo).then(this.__initDate);
    },

    //排序已关联信息操作
    __sortLink(selectedInfos) {
      let url = sortServiceInfoUrl;
      let type = {...this.currentGuide};
      delete type.guide;
      delete type.serviceInfoList;
      let selectedStr = selectedInfos.join();
      
      let final = Object.assign({}, type, { siid: selectedStr});
      
      unitCall(url, final).then(this.__operaBindSuccess).then(this.getAllLinkInfo).catch(this.__failed);
    },

    //修改操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },

    //引入、移除、排序信息成功回调
    __operaBindSuccess() {
      this.showMessage = true;
      this.messageType = 0;
    },

    //获取信息类型成功回调
    __getInfoTypeSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setServiceTypeList(result);
      }else{
        this.setServiceTypeList([]);
      }
    },

    //获取已关联信息成功回调
    __getLinkInfoSuccess(data) {
      let totalItems = data.value[0].total || 0;
      Bus.$emit('getLinkInfoNums', totalItems);

      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setLinkInfoList(result);
      }else{
        this.setLinkInfoList([]);
      }

    },

    //获取未关联信息成功回调
    __getUnLinkInfoSuccess(data) {
      let totalItems = data.value[0].total || 0;
      Bus.$emit('getUnLinkInfoNums', totalItems);

      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setUnLinkInfoList(result);
      }else{
        this.setUnLinkInfoList([]);
      }

    },
    
    //vuex引入设置引导数据方法
    ...mapMutations({ 
      setServiceTypeList : 'SET_SERVICETYPELIST',
      setGuideList : 'SET_GUIDELIST',
      setLinkInfoList : 'SET_LINKINFOLIST',
      setUnLinkInfoList : 'SET_UNLINKINFOLIST',
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
    Bus.$on('doLink', this.__doLink);
    Bus.$on('doUnLink', this.__doUnLink);
    Bus.$on('saveOrder', this.__sortLink);
    Bus.$on('getAllLinkInfos', this.getAllLinkInfo);
    Bus.$on('unLinkInfoSearch', (searchArgs)=>{this.unLinkInfoSearch(searchArgs)});
    Bus.$on('linkInfoSearch', (searchArgs)=>{this.linkInfoSearch(searchArgs)});
    Bus.$on('getUnLinkPages', (index)=>{this.getUnLinkInfo(index)});
    Bus.$on('getLinkPages', (index)=>{this.getLinkInfo(index)});
  },

  //清除Bus监听
  beforeDestroy() {
    Bus.$off('doLink');
    Bus.$off('doUnLink');
    Bus.$off('saveOrder');
    Bus.$off('getAllLinkInfos');
    Bus.$off('getUnLinkPages');
    Bus.$off('unLinkInfoSearch');
    Bus.$off('linkInfoSearch');
    Bus.$off('getLinkPages');
  },

  //vuex中引入引导数据
  computed: {
    ...mapGetters({
      currentGuide : 'guide',
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
