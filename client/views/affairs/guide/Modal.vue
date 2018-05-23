<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <guide-tabs v-if="modalConfig.config || modalConfig.detail" :tabType="modalConfig.tabType" ref="bindInfo"></guide-tabs>

    <div v-if="modalConfig.add || modalConfig.modify" class="map-container">
      <table class="table">
        <tbody>
          <tr>
            <td class="leftCol"><strong class="is-must">名称:</strong></td><td class="rightCol"><input v-model="newGuide['name']" type="text" class="input is-primary" maxlength="30"></td>
          </tr>
          
          <tr>
            <td class="leftCol"><strong class="is-must">内容:</strong></td><td class="rightCol"></td>
          </tr>
          <tr>
            <td colspan="2">
              <ueditor class="ueditor-content" ref="ueditor" :defaultMsg="defaultMsg" :config="config"></ueditor>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>名称:</strong></td><td class="rightCol">{{currentGuide.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>引导:</strong></td><td class="rightCol">{{currentGuide.descp}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import Ueditor from 'components/common/ueditor/Ueditor';
import GuideTabs from './Tabs';

export default {
  components: {
    CardModal,
    GuideTabs,
    Ueditor,
  },

  props: {
    visible: Boolean,
    modalType: String,
    modalConfig: Object
  },

  data () {
    return {
      defaultMsg: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 200
      },
      infoShow: false,
      message: '',
      newGuide: {},
      tabType: '',
      imgUrl: ''
    }
  },

  mounted() {
    
  },

  methods: {

    tabSelected(index) {
      if(index === 1) {
        Bus.$emit('getInfoType');
      }
    },

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
    },

    open () {},

    //确认操作
    ok () {

      let final = {};

      if(this.modalConfig.modify) {

        let ueText = this.$refs.ueditor.getUEContent();
        this.newGuide['context'] = ueText;
        final = Object.assign({}, this.currentGuide, this.newGuide, {modifyFlag: 1});

      }else if(this.modalConfig.del) {

        final = Object.assign({}, this.currentGuide, {delFlag: 1});

      }else {
        let ueText = this.$refs.ueditor.getUEContent();
        this.newGuide['context'] = ueText;
        final = Object.assign({}, this.newGuide, {addFlag: 1});
      }

      if(!final.name || !final.context) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentGuide(final);
      this.$emit('ok');
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentGuide : 'SET_CURRENTGUIDE'
    })
  },

  computed: {
    
    //vuex引入建筑类别数据
    ...mapGetters({
      serviceTypeList : 'serviceTypeData',
      currentServiceType : 'serviceType',
      informationList : 'informationData',
      guideList : 'guideData',
      currentGuide : 'guide'
    })
  },

  watch: {

    //当前操作建筑类别监听
    currentGuide(newVal, oldVal){

      if(this.modalConfig.modify) {
        this.newGuide = Object.assign({}, newVal);
        this.defaultMsg = this.newGuide.context;
      }

      if(this.modalConfig.add) {
        this.newGuide = {};
        this.defaultMsg = '';
      }
    }
    
  }
}
</script>

<style scoped>
.leftCol {
  width: 20%;
}
.is-must {
  color: red;
}
.rightCol {
  width: 70%;
}
.rightCol:after {
  display: block;
  content: '';
  clear: both;
}
.short-input {
  width: 45%;
}
.rightCol .short-input:first-child {
  float: left;
}
.rightCol .short-input:last-child {
  float: right;
}
.check-info {
  margin-left: 0.75em;
}
.container:after {
  display: block;
  content: '';
  clear: both;
}
.info-content {
  width: 45%;
  float: left;
}
.option-content {
  width: 50%;
  float: right;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}
.split-line {
  margin-left: 30px;
  float: left;
  height: 500px;
  width: 1px;
  background: #dbdbdb;
}
.textarea {
  height: 150px;
  resize: none;
}
.avatar {
  vertical-align: top;
  max-width: 180px;
}




</style>
