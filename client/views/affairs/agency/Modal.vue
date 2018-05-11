<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">

    <div class="map-container" v-if="modalConfig.add || modalConfig.modify">
      <table class="table">
        <tbody>
          <tr>
            <td class="leftCol"><strong class="is-must">机构名称</strong></td><td class="rightCol"><input v-model="newAgency['name']" type="text" class="input is-primary" maxlength="15"></td>
          </tr>
          <tr>
            <td class="leftCol"><strong class="is-must">所属建筑</strong></td>
            <td class="rightCol">
                <div class="control is-horizontal">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="newAgency['aeid']">
                        <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
            </td>
          </tr>
          <tr>
            <td class="leftCol"><strong>机构描述</strong></td><td class="rightCol"><textarea v-model="newAgency['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>机构名称</strong></td><td class="rightCol">{{newAgency.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>机构描述</strong></td><td class="rightCol">{{newAgency.descp}}</td>
        </tr>
      </tbody>
    </table>
      
    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import Bus from 'base/bus';

export default {
  components: {
    CardModal,
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
      centerPoint:{},
      infoShow: false,
      message: '',
      newAgency: {
        
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

    open () {},

    //确认操作
    ok () {
      let finnal = {};
      let {name, id} = this.currentAgency;
      let cid = this.currentZone.id;
      let oid = this.currentAgencyGroup.id;
      if(this.modalConfig.modify) {
        finnal = Object.assign({}, this.currentAgency, this.newAgency, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnal = Object.assign({}, {name, id}, {delFlag: 1});
      }else {
        finnal = Object.assign({}, this.newAgency, {addFlag: 1, oid, cid});
      }

      if(!finnal.name) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentAgency(finnal);
      Bus.$emit('ok');
      //this.$emit('ok');
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentAgency : 'SET_CURRENTAGENCY'
    })
  },

  computed: {

    //vuex引入用户数据
    ...mapGetters({
      zoneList : 'zoneData',
      currentZone : 'zone',
      buildingList : 'buildingData',
      currentAgency : 'agency',
      currentAgencyGroup : 'agencyGroup',
    })
  },

  watch: {

    //当前操作机构
    currentAgency(newVal, oldVal){

      this.newAgency = Object.assign({}, newVal);

      if(this.modalConfig.add) {
        this.newAgency.aeid = this.buildingList[0] ? this.buildingList[0].id : '';
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
