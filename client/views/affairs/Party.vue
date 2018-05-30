<template>
  <div>
    <party-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"
    @getLinkGuide="getLinkGuide"
    @getUnLinkGuide="getUnLinkGuide"
    @upimg="upimg" 
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></party-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType" :errInfo="errInfo"></my-message>
  </div>
</template>

<script>
import PartyTable from './party/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { ip, unitCall, uploadLogoUrl, partyListUrl, partyEditUrl, partyDeleteUrl, linkGuideUrl, unLinkGuideUrl, guideRelationsUrl, guideNotRelationsUrl, guideListUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';
import axios from 'axios';
import Bus from 'base/bus';

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

    //图片上传
    upimg(file) {
      
      let formData=new FormData();

      formData.append('file',file);
      
      // 服务器只需按照正常的上传程序代码即可
      axios.post(uploadLogoUrl,formData).then(res=>{
        let header = '/gis-service/files';
        let url = header + res.data.value.url;
        let newParty = {...this.currentParty, ...{ imagePath: url }};
        this.setCurrentParty(newParty);
      }).catch(err=>{
        console.log(err);
      })
      
    },

    //参数查询方法
    paramsSearch(args) {
      if (args.name || args.startDate) {
        this.searchParams = args;
      }
      let params = Object.assign({}, this.searchParams, args);
      unitCall( partyListUrl, params).then(this.__paramsSearchSuccess).catch(this.__failed);
    },

    //页码查询方法
    pageSearch(args) {
      let params = Object.assign({}, this.searchParams, args);
      unitCall(partyListUrl, params).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //信息更新
    ok() {
      let url = '';
      let type = {...this.currentParty};
      console.log(type);
      if(type.addFlag) {
        url = partyEditUrl;
        delete type.addFlag;
      }else if(type.modifyFlag) {
        url = partyEditUrl;
        delete type.guideDetailList;
        delete type.modifyFlag;
      }else if(type.delFlag) {
        url = partyDeleteUrl;
        delete type.guideDetailList;
        delete type.delFlag;
      }
      unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //获取已关联的引导
    getLinkGuide() {
      let currentId = this.currentParty.id;
      return unitCall( guideRelationsUrl, { pageNum : 1, id: currentId}).then(this.__getLinkGuideSuccess).catch(this.__failed);
    },

    //获取未关联的引导
    getUnLinkGuide() {
      let currentId = this.currentParty.id;
      return unitCall( guideNotRelationsUrl, { pageNum : 1, id: currentId}).then(this.__getUnLinkGuideSuccess).catch(this.__failed);
    },

    //引入引导操作
    __doLink(arr) {
      let url = linkGuideUrl;
      let type = {...this.currentParty};
      delete type.guideDetailList;
      let selectedStr = arr.join();
      
      let final = Object.assign({}, type, { gdids: selectedStr});
      
      unitCall(url, final).then(this.__operaBindSuccess).catch(this.__failed).then(this.getUnLinkGuide).then(this.getLinkGuide).then(this.__initDate);
    },

    //移除引导操作
    __doUnLink(arr) {
      let url = unLinkGuideUrl;
      let type = {...this.currentParty};
      delete type.guideDetailList;
      let selectedStr = arr.join();
      
      let final = Object.assign({}, type, { gdids: selectedStr});
      
      unitCall(url, final).then(this.__operaBindSuccess).catch(this.__failed).then(this.getLinkGuide).then(this.getUnLinkGuide).then(this.__initDate);
    },

    //初始化列表数据
    __initDate() {
      unitCall( partyListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setPartyList(result);
      }else{
        this.setPartyList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setPartyList(result);
      }else{
        this.setPartyList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
      this.initPage = !this.initPage;
    },

    //修改操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },

    //引入、移除操作成功回调
    __operaBindSuccess() {
      this.showMessage = true;
      this.messageType = 0;
    },

    //获取已关联引导成功回调
    __getLinkGuideSuccess(data) {

      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setLinkGuideList(result);
      }else{
        this.setLinkGuideList([]);
      }
      
    },

    //获取未关联引导成功回调
    __getUnLinkGuideSuccess(data) {

      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setUnLinkGuideList(result);
      }else{
        this.setUnLinkGuideList([]);
      }

    },

    //机构类别关联操作成功回调
    __linkGuideSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setLinkGuideList(result);
      }else{
        this.setLinkGuideList([]);
      }
    },

    //机构类别解除关联操作成功回调
    __unLinkGuideSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setUnLinkGuideList(result);
      }else{
        this.setUnLinkGuideList([]);
      }
    },
    
    //vuex引入设置活动数据方法
    ...mapMutations({ 
      setPartyList : 'SET_PARTYLIST',
      setCurrentParty : 'SET_CURRENTPARTY',
      setLinkGuideList : 'SET_LINKGUIDELIST',
      setUnLinkGuideList : 'SET_UNLINKGUIDELIST',
    })
  },

  //挂载后初始化列表数据
  mounted() {
    this.__initDate();
    Bus.$on('doLink', this.__doLink);
    Bus.$on('doUnLink', this.__doUnLink);
  },

  //清除Bus监听
  beforeDestroy() {
    Bus.$off('doLink');
    Bus.$off('doUnLink');
  },

  //vuex中引入活动数据
  computed: {
    ...mapGetters({
      currentParty : 'party'
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
