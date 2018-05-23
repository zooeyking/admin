<template>
  <div>
    <organization-table 

    @paramsSearch="paramsSearch"
    @pageSearch="pageSearch"
    @getZone="getZone"
    @bind="bind"
    @unBind="unBind" 
    @ok="ok"
    :confirmClose="confirmClose" 
    :totalNum="totalNum"
    :initPage="initPage"

    ></organization-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import OrganizationTable from './organization/Table';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, zoneListUrl, organizationListUrl, organizationEditUrl, organizationDeleteUrl, relationCampusUrl, relationAndNotUrl, removeRelationCampusUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';

export default {

  mixins: [Mixin],

  components: {
    OrganizationTable,
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
        delete type.campusList;
        delete type.modifyFlag;
      }else if(type.delFlag) {
        url = organizationDeleteUrl;
        delete type.campusList;
        delete type.delFlag;
      }
      unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    getZone() {
      this.__getLinkZone()
      .then(this.__linkZoneSuccess)
      //.then(this.__getUnLinkZone)
      //.then(this.__unLinkZoneSuccess)
      .catch(this.__failed)
      
      //unitCall( linkZoneUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    bind() {
      let zoneId = this.currentZone.id;
      let orgId = this.currentOrganization.id;
      unitCall( relationCampusUrl, { cid : zoneId, id : orgId }).then(this.__getLinkZone).then(this.__linkZoneSuccess).catch(this.__failed);
    },

    unBind() {
      let zoneId = this.currentZone.id;
      let orgId = this.currentOrganization.id;
      unitCall( removeRelationCampusUrl, { cid : zoneId, id : orgId }).then(this.__getLinkZone).then(this.__linkZoneSuccess).catch(this.__failed);
    },

    //初始化列表数据
    __initDate() {
      unitCall( organizationListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).then(this.__initGetZone).then(this.__initZoneSuccess).catch(this.__failed);
    },

    //获取全部校区
    __initGetZone() {
      return unitCall( zoneListUrl, { pageNum : 1})
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setOrganizationList(result);
      }else{
        this.setOrganizationList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
    },

    //根据参数查询成功回调
    __paramsSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setOrganizationList(result);
      }else{
        this.setOrganizationList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
      this.initPage = !this.initPage;
    },

    //初始化校区查询成功回调
    __initZoneSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setZoneList(result);
      }else{
        this.setZoneList([]);
      }
      this.totalNum = data.value[0].total ? data.value[0].total : 0;
    },

    //机构类别修改操作成功回调
    __operaSuccess() {
      this.showMessage = true;
      this.messageType = 0;
      this.confirmClose = !this.confirmClose;
    },

    //获取已关联的校区
    __getLinkZone() {
      let currentId = this.currentOrganization.id;
      return unitCall( relationAndNotUrl, { id : currentId});
    },

    //机构类别关联操作成功回调
    __linkZoneSuccess(data) {
      let linkArr = data.value.relation;
      let unlinkArr = data.value.notRel;
      if(linkArr) {
        let length = linkArr.length;
        let tempArr = [];
        for(let i=0; i<length; i++){
          let zone = this.zoneList.find((item)=>{
            return item.id === linkArr[i];
          })
          tempArr.push(zone);
        }
        this.setLinkZoneList(tempArr);
      }else{
        this.setLinkZoneList([]);
      }

      if(unlinkArr) {
        let length = unlinkArr.length;
        let tempArr = [];
        for(let i=0; i<length; i++){
          let zone = this.zoneList.find((item)=>{
            return item.id === unlinkArr[i];
          })
          tempArr.push(zone);
        }
        this.setUnLinkZoneList(tempArr);
      }else{
        this.setUnLinkZoneList([]);
      }
    },
    
    //vuex引入设置类别数据方法
    ...mapMutations({ 
      setZoneList : 'SET_ZONELIST',
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
      zoneList : 'zoneData',
      currentZone : 'zone',
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
