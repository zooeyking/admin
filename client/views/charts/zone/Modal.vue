<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <zone-tabs ref="tabs" v-if="modalConfig.detail || modalConfig.modify" :tabType="modalConfig.tabType"></zone-tabs>
    
    <div class="map-container" v-if="modalConfig.add">
      <div class="info-content">
        <table class="table">
          <tbody>
            <tr>
              <td class="leftCol"><strong class="is-must">校区名称</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
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
              <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><textarea v-model="newZone['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="map-content">
        <zone-map ref="campus" :centerPoint="centerPoint"></zone-map>
      </div>
    </div>


    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>校区名称</strong></td><td class="rightCol">{{currentZone.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>校区描述</strong></td><td class="rightCol">{{currentZone.descp}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import ZoneMap from 'components/common/map/Map';
import ZoneTabs from './Tabs';
import MySwitch from './Switch';

export default {
  components: {
    CardModal,
    ZoneTabs,
    ZoneMap
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
      centerPoint: {lng: 121.601268, lat: 31.18331},
      newZone: {
        
      }
    }
  },

  mounted() {
    
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
      this.newZone = {};
    },

    open () {},

    //确认操作
    ok () {
      let finnalZone = {};
      if(this.modalConfig.modify) {
        let tabs = this.$refs.tabs;
        let map = tabs.$refs.map;
        let tempZone = tabs.newZone;
        let tempPosition = JSON.stringify(map.polygon.paths);
        tempZone.position = tempPosition;
        finnalZone = Object.assign({}, this.currentZone, tempZone, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnalZone = Object.assign({}, this.currentZone, {delFlag: 1});
        //finnalUser = Object.assign({}, {delFlag: 1});
      }else {
        let paths = this.$refs.campus.polygon.paths;
        let str = JSON.stringify(paths);
        this.newZone.position = str;
        finnalZone = Object.assign({}, this.newZone, {addFlag: 1});
      }

      if(!finnalZone.name || !finnalZone.position) {
        this.message = '名称和位置信息不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentZone(finnalZone);
      this.$emit('ok');
    },

    //vuex引入设置校区方法
    ...mapMutations({
      setCurrentZone : 'SET_CURRENTZONE'
    })
  },

  computed: {

    //vuex引入校区数据
    ...mapGetters({
      zoneList : 'zoneData',
      currentZone : 'zone'
    })
  },

  watch: {

    zoneList(val) {
      this.newZone = {
        
      }
    },

    currentZone(newVal, oldVal){
      if(this.modalConfig.modify) {
        this.newZone = Object.assign({}, newVal);
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
.map-container:after {
  display: block;
  content: '';
  clear: both;
}
.info-content {
  width: 35%;
  float: left;
}
.map-content {
  width: 60%;
  float: right;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}
.textarea {
  height: 150px;
  resize: none;
}


</style>
