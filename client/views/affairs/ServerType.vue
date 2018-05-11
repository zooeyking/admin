<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <div class="pageHeader">
      
          <!--<search @paramsSearch="paramsSearch"></search><button v-if="userPermission.user_add" class="button is-primary"  @click="showAdd">添加用户</button>-->
            <button class="button is-primary" @click="showAdd">添加分类</button>
          </div>
        </article>
      </div>
    </div>
    
    <div class="tile is-ancestor my-container">
      <div v-for="(item, index) in serviceTypeList" :key="index" class="tile is-parent is-2">
        <article class="tile is-child box">
          <h4 class="subtitle">{{item.name}}</h4>
          <img class="logo-box" :src="item.logoUrl">
          <div class="control is-grouped btn-box">
            <p class="control"><a class="button is-primary" @click="showModify(item)">修改</a></p> 
            <p class="control"><a class="button is-danger" @click="showDel(item)">删除</a></p>
          </div>
        </article>
      </div>
    </div>

    <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" :modalType="modalType" @ok="ok" @upimg="upimg"></confirm>

    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import confirm from './serverType/Modal'
import MyMessage from 'components/common/message/Message';
import { mapGetters, mapMutations } from 'vuex';
import { unitCall, serviceTypeListUrl, serviceTypeEditUrl, serviceTypeDeleteUrl, uploadLogoUrl } from 'base/askUrl';
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
        let header = 'http://192.168.1.15:8088/gis-service/files';
        let url = header + res.data.value.url;
        let newServiceType = {...this.currentServiceType, ...{ logoUrl: url }};
        this.setCurrentServiceType(newServiceType);
      }).catch(err=>{
        console.log(err);
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
        delete type.delFlag;
      }
      
      unitCall(url, type).then(this.__operaSuccess).catch(this.__failed).then(this.__initDate);
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
      unitCall( serviceTypeListUrl, { pageNum : 1}).then(this.__pageSearchSuccess).catch(this.__failed);
    },

    //根据页码查询成功回调
    __pageSearchSuccess(data) {
      if(data.value.list) {
        let result = data.value.list;
        this.setServiceTypeList(result);
      }else{
        this.setServiceTypeList([]);
      }
      this.totalNum = data.value.total ? data.value.total : 0;
    },

    //机构类别修改操作成功回调
    __operaSuccess() {
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

  //vuex中引入机构类别数据
  computed: {
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
