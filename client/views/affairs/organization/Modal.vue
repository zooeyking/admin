<template>
  <card-modal :modalType="modalType" :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    
    <div class="tile is-ancestor" v-if="modalConfig.bind">
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="subtitle">未关联校区</h4>
          <div>
            <a class="button is-primary my-btn" @click="bind(item)" v-for="(item,index) in unLinkZoneList" :key="index"><span class="icon"><i class="fa fa-check"></i></span><span>{{item.name}}</span></a>
          </div>
        </article>
      </div>
      <div class="tile is-parent is-6">
        <article class="tile is-child box">
          <h4 class="subtitle">已关联校区</h4>
          <div>
            <a class="button is-danger is-outlined my-btn" @click="unBind(item)" v-for="(item,index) in linkZoneList" :key="index"><span class="icon"><i class="fa fa-times"></i></span><span>{{item.name}}</span></a>
          </div>
        </article>
      </div>
    </div>

    <div class="map-container" v-if="modalConfig.add || modalConfig.modify">
     
      <table class="table">
        <tbody>
          <tr>
            <td class="leftCol"><strong class="is-must">名称</strong></td><td class="rightCol"><input v-model="newOrganization['name']" type="text" class="input is-primary" maxlength="15"></td>
          </tr>
          
          <tr>
            <td class="leftCol"><strong>描述</strong></td><td class="rightCol"><textarea v-model="newOrganization['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
          </tr>
        </tbody>
      </table>
      
    </div>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>名称</strong></td><td class="rightCol">{{currentOrganization.name}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>描述</strong></td><td class="rightCol">{{currentOrganization.descp}}</td>
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
      newOrganization: {}
    }
  },

  mounted() {
    
  },

  methods: {

    //关联操作
    bind(item) {
      this.setCurrentZone(item);
      this.$emit('bind'); 
    },

    //解除关联操作
    unBind(item) {
      this.setCurrentZone(item);
      this.$emit('unBind'); 
    },

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
    },

    open () {},

    //确认操作
    ok () {
      let finnalOrganization = {};
      if(this.modalConfig.modify) {
        finnalOrganization = Object.assign({}, this.currentOrganization, this.newOrganization, {modifyFlag: 1});
      }else if(this.modalConfig.del) {
        finnalOrganization = Object.assign({}, this.currentOrganization, {delFlag: 1});
      }else {
        finnalOrganization = Object.assign({}, this.newOrganization, {addFlag: 1});
      }

      if(!finnalOrganization.name) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentOrganization(finnalOrganization);
      this.$emit('ok');
    },

    //vuex引入设置机构类别方法
    ...mapMutations({
      setCurrentOrganization : 'SET_CURRENTORGANIZATION',
      setCurrentZone : 'SET_CURRENTZONE',
    })
  },

  computed: {
    
    //vuex引入机构组数据
    ...mapGetters({
      organizationList : 'organizationData',
      currentOrganization : 'organization',
      linkZoneList : 'linkZoneData',
      unLinkZoneList : 'unLinkZoneData'
    })
  },

  watch: {

    //当前操作机构组监听
    currentOrganization(newVal, oldVal){
      if(this.modalConfig.modify) {
        this.newOrganization = Object.assign({}, newVal);
      }

      if(this.modalConfig.add) {
        this.newOrganization = {};
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


</style>
