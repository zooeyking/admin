<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    
    <div class="map-container" v-if="modalConfig.add || modalConfig.modify">
      <div class="info-content">
        <table class="table">
          <tbody>
            <tr>
              <td class="leftCol"><strong class="is-must">建筑名称</strong></td><td class="rightCol"><input v-model="newBuilding['name']" type="text" class="input is-primary" maxlength="15"></td>
            </tr>
            <tr>
              <td class="leftCol"><strong class="is-must">类型</strong></td>
              <td class="rightCol">
                <div class="control is-horizontal">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="newBuilding.acid">
                        <option v-for="item in typeList" :value="item.id" >{{item.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="leftCol"><strong class="is-must">校区</strong></td>
              <td class="rightCol">
                  <div class="control is-horizontal">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="newBuilding.cid" @change="selectZone">
                          <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
              </td>
            </tr>
            
            <tr>
              <td class="leftCol"><strong>介绍</strong></td><td class="rightCol"><textarea v-model="newBuilding['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="map-content">
        <zone-map :centerPoint="centerPoint" :pathData="pathData" ref="campus"></zone-map>
      </div>
    </div>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>建筑名称</strong></td><td class="rightCol">{{currentBuilding.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>建筑描述</strong></td><td class="rightCol">{{currentBuilding.info}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import ZoneMap from 'components/common/map/Map';
import { mapGetters, mapMutations } from 'vuex';
import { __getCenter } from 'tools/js/util';

export default {
  components: {
    CardModal,
    ZoneMap
  },

  props: {
    visible: Boolean,
    modalType: String,
    modalConfig: Object
  },

  data () {
    return {
      centerPoint: {},
      infoShow: false,
      message: '',
      pathData: [],
      newBuilding: {
        
      }
    }
  },

  mounted() {
    let str = this.zoneList[0] ? this.zoneList[0].position : '[]';
    let pathData = JSON.parse(str);
    this.centerPoint = __getCenter(pathData);
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
    },

    //确认操作
    ok () {
      let finnalBuilding = {};
      if(this.modalConfig.modify) {
        let paths = this.$refs.campus.polygon.paths;
        let str = JSON.stringify(paths);
        this.newBuilding.position = str;
        finnalBuilding = Object.assign({}, this.currentBuilding, this.newBuilding, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnalBuilding = Object.assign({}, this.currentBuilding, {delFlag: 1});
      }else {
        let paths = this.$refs.campus.polygon.paths;
        let str = JSON.stringify(paths);
        this.newBuilding.position = str;
        finnalBuilding = Object.assign({}, this.newBuilding, {addFlag: 1});
      }
      
      if(!finnalBuilding.name || !finnalBuilding.cid || !finnalBuilding.acid || finnalBuilding.position.length < 100) {
        this.message = '所填必要信息不合法!';
        this.infoShow = true;
        return;
      }

      this.setCurrentBuilding(finnalBuilding);
      this.$emit('ok');
      this.infoShow = false;
    },

    //选取校区
    selectZone() {
      let cid = this.newBuilding.cid;
      let zone = this.zoneList.find((item)=>{
        return item.id === cid;
      })
      let str = zone.position;
      let pathData = JSON.parse(str);
      
      this.centerPoint = __getCenter(pathData);
    },

    //vuex引入设置建筑方法
    ...mapMutations({
      setCurrentBuilding : 'SET_CURRENTBUILDING'
    })
  },

  computed: {

    //vuex引入建筑数据
    ...mapGetters({
      buildingList : 'buildingData',
      zoneList : 'zoneData',
      typeList : 'buildingTypeData',
      currentBuilding : 'building'
    })
  },

  watch: {

    //校区列表数据
    zoneList(newVal, oldVal) {
      if(newVal.length>0) {
        this.newBuilding.cid = newVal[0].id;
      }
    },

    //建筑种类列表数据
    typeList(newVal, oldVal) {
      if(newVal.length>0) {
        this.newBuilding.acid = newVal[0].id
      }
    },

    //当前操作建筑
    currentBuilding(newVal, oldVal){
      
      if(this.modalConfig.modify) {
        
        this.newBuilding = Object.assign({}, newVal);
        this.newBuilding.cid = newVal.campus.id;
        this.newBuilding.acid = newVal.architeCategory.id;
        let str = this.newBuilding.position;
        let pathData = JSON.parse(str);
        this.centerPoint = __getCenter(pathData);
        this.pathData = JSON.parse(str);
      }

      if(this.modalConfig.add) {
        let campusPos = this.zoneList[0] ? this.zoneList[0].position : '[]';
        let pathData = JSON.parse(campusPos);
        this.centerPoint = __getCenter(pathData);

        this.newBuilding = Object.assign({}, newVal);
        this.newBuilding.cid = this.zoneList.length > 0 ? this.zoneList[0].id : '';
        this.newBuilding.acid = this.typeList.length > 0 ? this.typeList[0].id : '';
        this.newBuilding.position = '[]';
        let str = this.newBuilding.position;
        this.pathData = JSON.parse(str);
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
