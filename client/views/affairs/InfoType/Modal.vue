<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    
    <div class="map-container" v-if="modalConfig.add || modalConfig.modify">
     
      <table class="table">
        <tbody>
          <tr>
            <td class="leftCol"><strong class="is-must">类别名称:</strong></td><td class="rightCol"><input v-model="newType['name']" type="text" class="input is-primary" maxlength="15"></td>
          </tr>
          <tr>
            <td class="leftCol"><strong class="is-must">logo图标:</strong></td>
            <td class="rightCol">
              <input @change="getFile($event)"  type="file" accept="image/*">
              <img class="avatar" :src="imgUrl"/>
            </td>
          </tr>
          <tr>
            <td class="leftCol"><strong>描述:</strong></td><td class="rightCol"><textarea v-model="newType['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>类别名称:</strong></td><td class="rightCol">{{currentType.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>类别描述:</strong></td><td class="rightCol">{{currentType.descp}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import { ip } from 'base/askUrl';
import { uploadLogoUrl } from 'base/askUrl';
import axios from 'axios';

export default {
  components: {
    CardModal
  },

  props: {
    visible: Boolean,
    modalType: String,
    modalConfig: Object
  },

  data () {
    return {
      infoShow: false,
      message: '',
      newType: {},
      imgUrl: ''
    }
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
      this.newType = {};
      this.imgUrl = '';
      this.setCurrentType({});
    },

    //获取文件
    getFile(event) {
      let file = event.target.files[0];
      let windowURL = window.URL || window.webkitURL;
      this.imgUrl = windowURL.createObjectURL(file);
      this.$emit('upimg', file);
    },

    //确认操作
    ok () {
      let finnalType = {};
      if(this.modalConfig.modify) {
        finnalType = Object.assign({}, this.currentType, this.newType, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnalType = Object.assign({}, this.currentType, {delFlag: 1});
      }else {
        finnalType = Object.assign({}, this.newType, {addFlag: 1});
      }

      if(!finnalType.name || !finnalType.logoUrl) {
        this.message = '必要信息不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentType(finnalType);
      this.$emit('ok');
      this.infoShow = false;
    },

    //vuex引入设置信息类型方法
    ...mapMutations({
      setCurrentType : 'SET_CURRENTSERVICETYPE',
    })
  },

  computed: {
    
    //vuex引入信息类别数据
    ...mapGetters({
      currentType : 'serviceType'
    })
  },

  watch: {

    //当前操作类别监听
    currentType(newVal, oldVal){
      if(newVal.logoUrl) {
        this.newType = Object.assign(this.newType, newVal);
      }else{
        this.newType = {};
      }
      this.imgUrl = newVal.logoUrl ? (ip + newVal.logoUrl): '';
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
