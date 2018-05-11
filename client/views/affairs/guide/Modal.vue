<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    
    <div class="container" v-if="modalConfig.add || modalConfig.modify">
     
      <table class="table">
        <tbody>
          <tr>
            <td class="leftCol"><strong class="is-must">活动名称</strong></td><td class="rightCol"><input v-model="newParty['name']" type="text" class="input is-primary" maxlength="15"></td>
          </tr>
          <tr>
            <td class="leftCol"><strong class="is-must">logo图标</strong></td>
            <td class="rightCol">
              <input @change.stop.prevent="getFile($event)"  type="file" accept="image/*">
              <img class="avatar" :src="imgUrl"/>
              
              <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
            </td>
          </tr>
          <tr>
            <td class="leftCol"><strong>描述</strong></td><td class="rightCol"><textarea v-model="newParty['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="container" v-if="modalConfig.process">

      <div class="info-content">
        <table class="table">
          <tbody>
            <tr>
              <td class="leftCol"><strong class="is-must">校区名称</strong></td><td class="rightCol"><input v-model="newParty['name']" type="text" class="input is-primary" maxlength="30"></td>
            </tr>

            <!--
            <tr>
              <td class="leftCol"><strong>左上坐标</strong></td>
              <td class="rightCol">
                  <input v-model="newUser['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="经度">
                  <input v-model="newUser['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="纬度">
              </td>
            </tr>
            <tr>
              <td class="leftCol"><strong>右下坐标</strong></td>
              <td class="rightCol">
                  <input v-model="newUser['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="经度">
                  <input v-model="newUser['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="纬度">
              </td>
            </tr>
            <tr>
              <td class="leftCol"><strong>校区尺寸</strong></td>
              <td class="rightCol">
                  <input v-model="newUser['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="长度">
                  <input v-model="newUser['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="宽度">
              </td>
            </tr>
            -->

            <tr>
              <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><textarea v-model="newParty['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="split-line"></div>

      <div class="option-content">
        <table class="table">
          <tbody>
            <tr>
              <td class="leftCol"><strong class="is-must">活动名称</strong></td><td class="rightCol"><input v-model="newParty['name']" type="text" class="input is-primary" maxlength="15"></td>
            </tr>
            <tr>
              <td class="leftCol"><strong class="is-must">logo图标</strong></td>
              <td class="rightCol">
                <input @change.stop.prevent="getFile($event)"  type="file" accept="image/*">
                <img class="avatar" :src="imgUrl"/>
                
                <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
              </td>
            </tr>
            <tr>
              <td class="leftCol"><strong>描述</strong></td><td class="rightCol"><textarea v-model="newParty['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>类别名称</strong></td><td class="rightCol">{{currentType.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>类别描述</strong></td><td class="rightCol">{{currentType.descp}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';

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
      newParty: {},
      imgUrl: ''
    }
  },

  mounted() {
    
  },

  methods: {

    //获取文件
    getFile(event) {
      event.preventDefault();
      var windowURL = window.URL || window.webkitURL;
      this.imgUrl = windowURL.createObjectURL(event.target.files[0]);
      console.log(this.imgUrl);

      let file = event.target.files[0];
      this.$emit('upimg', event, file);
      console.log(file);
      
    },

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
      this.newParty = {}
    },

    open () {},

    //确认操作
    ok () {
      let finnalType = {};
      if(this.modalConfig.modify) {
        finnalType = Object.assign({}, this.currentType, this.newParty, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnalType = Object.assign({}, this.currentType, {delFlag: 1});
      }else {
        finnalType = Object.assign({}, this.newParty, {addFlag: 1});
      }

      if(!finnalType.name) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentType(finnalType);
      this.$emit('ok');
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentType : 'SET_CURRENTTYPE'
    })
  },

  computed: {
    
    //vuex引入建筑类别数据
    ...mapGetters({
      typeList : 'buildingTypeData',
      currentType : 'buildingType'
    })
  },

  watch: {

    //当前操作建筑类别监听
    currentType(newVal, oldVal){
      if(this.modalConfig.modify) {
        this.newParty = Object.assign({}, newVal);
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
