<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">

    <div v-if="modalConfig.add || modalConfig.modify" class="map-container">

      <div class="info-content">
        <table class="table">
          <tbody>
            <tr>
              <td class="leftCol"><strong class="is-must">标题</strong></td><td class="rightCol"><input v-model="newInformation['title']" type="text" class="input is-primary" maxlength="15"></td>
            </tr>
            
            <tr>
              <td class="leftCol"><strong class="is-must">开始时间</strong></td><td class="rightCol"><timepicker @sendValue="setStartTime"></timepicker></td>
            </tr>

            <tr>
              <td class="leftCol"><strong class="is-must">结束时间</strong></td><td class="rightCol"><timepicker @sendValue="setEndTime"></timepicker></td>
            </tr>

            <tr>
              <td class="leftCol"><strong class="is-must">信息类型</strong></td>
              <td class="rightCol">
                  <div class="control is-horizontal">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="newInformation.scid">
                          <option v-for="item in typeList" :value="item.id" >{{item.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
              </td>
            </tr>

            <tr>
              <td class="leftCol"><strong class="is-must">所属校区</strong></td>
              <td class="rightCol">
                  <div class="control is-horizontal">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="newInformation.cid" @change="selectZone">
                          <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
              </td>
            </tr>

            <tr>
              <td class="leftCol"><strong>标签</strong></td><td class="rightCol"><input v-model="newInformation['lable']" type="text" class="input is-primary" maxlength="30"></td>
            </tr>
            
          </tbody>
        </table>
      </div>

      <div class="map-content">
        <table class="table">
          <tbody>
            <tr>
              <td class="leftCol"><strong>定位</strong></td>
              <td class="rightCol">
                <label class="radio"><input v-model="newInformation['type']" name="pType" type="radio" value="1">
                  坐标点
                </label> 
                <label class="radio"><input v-model="newInformation['type']" name="pType" type="radio" value="2">
                  建筑
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <zone-map ref="campus" v-show="newInformation['type'] == 1" :initSize="mapSize" :drawType="drawType" :centerPoint="centerPoint"></zone-map>

        <div class="arc-select" v-show="newInformation['type'] == 2">
          <div class="subtitle leftCol option-box"><strong class="is-must">建筑</strong></div>

          <div class="option-box rightCol">
            <div class="control is-horizontal">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="newInformation.aeid">
                    <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ue :defaultMsg="defaultMsg" :config="config" class="ueditor-content" ref="ueditor"></ue>
      
    </div>

    <table class="table" v-if="modalConfig.detail">
      <tbody>
        <tr>
          <td class="leftCol"><strong>信息名称</strong></td><td class="rightCol">{{newInformation.title}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>信息类别</strong></td><td class="rightCol">{{newInformation.serviceCategory ? newInformation.serviceCategory.name : ''}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>所属校区</strong></td><td class="rightCol">{{newInformation.campus ? newInformation.campus.name : ''}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>有效时间</strong></td><td class="rightCol">{{newInformation.startedDate}} —— {{newInformation.endedDate}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>标签</strong></td><td class="rightCol">{{newInformation.lable}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>内容</strong></td><td class="rightCol">{{newInformation.content}}</td>
        </tr>
      </tbody>
    </table>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>信息名称</strong></td><td class="rightCol">{{newInformation.title}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>信息类别</strong></td><td class="rightCol">{{newInformation.serviceCategory.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>所属校区</strong></td><td class="rightCol">{{newInformation.campus.name}}</td>
        </tr>
      </tbody>
    </table>
    
    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import ZoneMap from 'components/common/map/Map';
import Timepicker from 'components/common/datepicker/Timepicker';
import Ue from 'components/common/ueditor/Ueditor';
import MyTabs from './Tabs';
import Bus from 'base/bus';
import { mapGetters, mapMutations } from 'vuex';
import { __getCenter } from 'tools/js/util'; 

export default {
  components: {
    CardModal,
    ZoneMap,
    MyTabs,
    Timepicker,
    Ue
  },

  props: {
    visible: Boolean,
    modalType: String,
    modalConfig: Object
  },

  data () {
    return {
      defaultMsg: '这里输入内容',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 300
      },
      startTimeValue: '2018-01-01 00:00',
      endTimeValue: '2018-01-01 00:00',
      centerPoint:{},
      infoShow: false,
      message: '',
      mapSize: 'bm-view-lower',
      drawType: 'position',
      newInformation: {
        
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
    },

    getUEContent() {
      let content = this.$refs.ueditor.getUEContent();
      return content;
    },

    //确认操作
    ok () {
      
      let finnalInforamation = {};

      if(this.modalConfig.modify) {
        finnalInforamation = Object.assign({}, this.currentInforamation, this.newInformation, {modifyFlag: 1});

        let ueText = this.getUEContent();
        finnalInforamation['content'] = ueText;
        let pType = finnalInforamation.type;

        if(pType == 1) {
          finnalInforamation['position'] = JSON.stringify(this.$refs.campus.position.point);
          delete finnalInforamation['aeid'];
        }

      }else if(this.modalConfig.del) {

        finnalInforamation = Object.assign({}, this.newInformation, {delFlag: 1});

      }else {
        finnalInforamation = Object.assign({}, this.newInformation, {addFlag: 1});

        let ueText = this.getUEContent();
        finnalInforamation['content'] = ueText;
        let pType = finnalInforamation.type;

        if(pType == 1) {
          finnalInforamation['position'] = JSON.stringify(this.$refs.campus.position.point);
          delete finnalInforamation['aeid'];
        }

      }

      

      // if(pType === 1) {
      //   let position = this.$refs.campus.
      // }
      console.log(finnalInforamation);

      if(!finnalInforamation.title || !finnalInforamation.cid || !finnalInforamation.scid) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentInformation(finnalInforamation);
      this.$emit('ok');
    },

   

    //设置开始时间
    setStartTime(value) {
      this.newInformation.startedDate = value+":00";
    },

    //设置结束时间
    setEndTime(value) {
      this.newInformation.endedDate = value+":00";
    },

    //根据校区定位地图
    selectZone() {

      let cid = this.newInformation.cid;
      let zone = this.zoneList.find((item)=>{
        return item.id === cid;
      })
      let str = zone.position ? zone.position : '';
      let pathData = JSON.parse(str);
      this.centerPoint = __getCenter(pathData);
      
      Bus.$emit('getBuildings', cid);
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentInformation : 'SET_CURRENTINFORMATION',
      setCurrentZone : 'SET_CURRENTZONE'
    })
  },

  computed: {

    //vuex引入用户数据
    ...mapGetters({
      buildingList : 'buildingData',
      zoneList : 'zoneData',
      typeList : 'serviceTypeData',
      currentInformation : 'information'
    })
  },

  watch: {

    //当前操作信息
    currentInformation(newVal, oldVal){

      if(this.modalConfig.modify) {
        this.newInformation = Object.assign({}, newVal);
        this.defaultMsg = this.newInformation.content;
        if( this.newInformation.type == 1) {
          let campus = this.newInformation.campus;
          let pathData = JSON.parse(campus.position);
          this.centerPoint = __getCenter(pathData);

          this.$nextTick(function () {
            let dot = JSON.parse(this.newInformation.position);
            this.$refs.campus.position.point = dot;
          })
        }
      }

      if( this.modalConfig.del || this.modalConfig.detail) {
        this.newInformation = Object.assign({}, newVal);
      }
      
      if(this.modalConfig.add) {
        this.newInformation = Object.assign({}, newVal);
        this.newInformation.cid = this.zoneList.length > 0 ? this.zoneList[0].id : '';
        this.newInformation.scid = this.typeList.length > 0 ? this.typeList[0].id : '';
        this.newInformation.aeid = this.buildingList.length > 0 ? this.buildingList[0].id : '';
        this.selectZone();
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
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
}
.ueditor-content {
  float: left;
  height: 180px;
}
.textarea {
  height: 150px;
  resize: none;
}
.arc-select {
  border-top: 1px solid #dedede;
  margin-top: 20px;
  padding-left: 10px;
  padding-top: 20px;
}
.option-box {
  float: left;
}
.arc-select .option-box:last-child {
  width: 40%;
}
.upfile-box {
  width: 160px;
} 
.avatar {
  vertical-align: top;
  max-width: 80px;
}


</style>
