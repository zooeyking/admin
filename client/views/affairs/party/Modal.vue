<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">

    <div class="map-container" v-if="modalConfig.add || modalConfig.modify">
      <table class="table">
        <tbody>
          <tr>
            <td class="leftCol"><strong class="is-must">活动名称:</strong></td><td class="rightCol"><input v-model="newParty['name']" type="text" class="input is-primary" maxlength="15"></td>
          </tr>
          <tr>
            <td class="leftCol"><strong class="is-must">logo图标:</strong></td>
            <td class="rightCol">
              <input @change="getFile($event)"  type="file" accept="image/*">
              <img class="avatar" :src="imgUrl"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <party-tabs v-if="modalConfig.process || modalConfig.detail" :tabType="modalConfig.tabType"></party-tabs>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>名称:</strong></td><td class="rightCol">{{currentParty.name}}</td>
        </tr>
        <tr>
            <td class="leftCol"><strong>logo图标:</strong></td>
            <td class="rightCol">
              <img class="avatar" :src="imgUrl"/>
            </td>
          </tr>
        <tr>
          <td class="leftCol"><strong>描述:</strong></td><td class="rightCol">{{currentParty.descp}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import PartyTabs from './Tabs'

export default {
  components: {
    CardModal,
    PartyTabs
  },

  props: {
    visible: Boolean,
    modalType: {
      type: String,
      default: 'modal-card'
    },
    modalConfig: Object
  },

  data () {
    return {
      infoShow: false,
      message: '',
      imgUrl: '',
      newParty: {},
    }
  },

  mounted() {
    
  },

  methods: {

    //获取文件
    getFile(event) {
      let file = event.target.files[0];
      let windowURL = window.URL || window.webkitURL;
      this.imgUrl = windowURL.createObjectURL(file);

      this.$emit('upimg', file);
      
    },

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
      this.newParty = {};
    },

    //确认操作
    ok () {
      let finnal = {};
      if(this.modalConfig.modify) {
        finnal = Object.assign({}, this.currentParty, this.newParty, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnal = Object.assign({}, this.currentParty, {delFlag: 1});
      }else {
        finnal = Object.assign({}, this.currentParty, this.newParty, {addFlag: 1});
      }

      if(!finnal.name) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentParty(finnal);
      this.$emit('ok');
    },

    //vuex引入设置活动方法
    ...mapMutations({
      setCurrentParty : 'SET_CURRENTPARTY',
    })
  },

  computed: {
    
    //vuex引入活动数据
    ...mapGetters({
      partyList : 'partyData',
      currentParty : 'party',
      linkGuideList : 'linkGuideData',
      unLinkGuideList : 'unLinkGuideData'
    })
  },

  watch: {

    //当前操作活动监听
    currentParty(newVal, oldVal){
      if(this.modalConfig.modify) {

        this.newParty = Object.assign({}, newVal);
        this.imgUrl = this.newParty.imagePath;

      }

      if(this.modalConfig.del) {
        this.imgUrl = this.currentParty.imagePath;
      }

      if(this.modalConfig.add) {
        this.imgUrl = newVal['imagePath'] ? newVal['imagePath'] : '';
      }
    }
  }
}
</script>

<style scoped>
.my-btn {
  margin-right: 0.4em;
  margin-bottom: 0.6em;
}
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
.map-container:after {
  display: block;
  content: '';
  clear: both;
}
.info-content {
  width: 35%;
  float: left;
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
