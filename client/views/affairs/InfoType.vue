<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <div class="pageHeader">
      
          <!--<button v-if="userPermission.infoType_add" class="button is-primary"  @click="showAdd">添加分类</button>-->
            <button class="button is-primary" @click="showAdd">添加分类</button>
          </div>
        </article>
      </div>
    </div>
    
    <div class="tile is-ancestor my-container">
      <div v-for="(item, index) in serviceTypeList" :key="index" class="tile is-parent is-2">
        <article class="tile is-child box">
          <h4 class="subtitle">{{item.name}}</h4>
          <img class="logo-box" :src="(imgHeader + item.logoUrl)">
          <div class="control is-grouped btn-box">
            <!--<p class="control"><a class="button is-primary" v-if="userPermission.infoType_modify" @click="showModify(item)">修改</a></p>--> 
            <!--<p class="control"><a class="button is-danger" v-if="userPermission.infoType_delete" @click="showDel(item)">删除</a></p>--> 
            <p class="control"><a class="button is-primary" @click="showModify(item)">修改</a></p> 
            <p class="control"><a class="button is-danger" @click="showDel(item)">删除</a></p>
          </div>
        </article>
      </div>
    </div>

    <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" :modalType="modalType" @ok="ok" @upimg="upimg"></confirm>

    <my-message :errInfo="errInfo" v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import confirm from './InfoType/Modal';
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { ip, unitCall, serviceTypeListUrl, serviceTypeEditUrl, serviceTypeDeleteUrl, uploadLogoUrl } from 'base/askUrl';
import { Mixin } from 'base/mixin';
import axios from 'axios';

export default {
  components: {
    confirm,
    MyMessage
  },

  data () {
    return {
      confirmShow: false,
      showMessage: false,
      messageType: 0,
      modalConfig: {},
      errInfo: '',
      modalType: 'modal-card',
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
        let newServiceType = {...this.currentServiceType, ...{ logoUrl: url }};
        this.setCurrentServiceType(newServiceType);
      }).catch(err=>{
        this.__failed;
      })
      
    },

    //服务类别信息更新
    ok() {
      let url = '';
      let type = {...this.currentServiceType};

      if(type.addFlag) {
        url = serviceTypeEditUrl;
        delete type.addFlag;
      }else if(type.modifyFlag) {
        url = serviceTypeEditUrl;
        delete type.modifyFlag;
      }else if(type.delFlag) {
        url = serviceTypeDeleteUrl;
        //url = 'qweqweqwe'
        delete type.delFlag;
      }
      
      return unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
    },

    //添加分类
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加分类',
        footerShow: true
      };
      this.setCurrentServiceType({});
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //分类资料修改
    showModify(item) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
      };
      this.setCurrentServiceType(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //删除分类
    showDel(item) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该服务类别吗？',
        footerShow: true
      };
      this.setCurrentServiceType(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //操作面板消失
    dispear() {
      this.showMessage = false;
    },

    //初始化列表数据
    __initDate() {
      return unitCall( serviceTypeListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value[0].list) {
        let result = data.value[0].list;
        this.setServiceTypeList(result);
      }else{
        this.setServiceTypeList([]);
      }
    },

    //机构类别修改操作成功回调
    __operaSuccess(data) {
      
      if(!data.status) {
        this.showMessage = true;
        this.messageType = 1;
        this.errInfo = data.value || data.message;
        return;
      }
      this.showMessage = true;
      this.messageType = 0;
      this.confirmShow = false;
      this.setCurrentServiceType({});
    },

    //vuex引入设置类别数据方法
    ...mapMutations({ 
      setServiceTypeList : 'SET_SERVICETYPELIST',
      setCurrentServiceType : 'SET_CURRENTSERVICETYPE',
    })
  },

  
  computed: {

    //图片url地址头部
    imgHeader() {
      return ip;
    },

    //vuex中引入机构类别数据
    ...mapGetters({
      serviceTypeList : 'serviceTypeData',
      currentServiceType : 'serviceType',
    })
  },

  mounted() {
    this.__initDate()
  }
}
</script>

<style scoped>
.my-container {
  flex-wrap: wrap;
}

.btn-box {
  display: flex;
  justify-content: space-between;
}

.logo-box {
  max-height: 150px;
}
</style>
