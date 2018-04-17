<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">

    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">系统名称</strong></td><td class="rightCol"><input v-model="newSystem['sacName']" type="text" class="input is-primary" maxlength="15"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">有效时间</strong></td><td class="rightCol"><input v-model="newSystem['sacLnvalidTime']" type="number" class="input is-primary" maxlength="15"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">服务器地址</strong></td><td class="rightCol"><input v-model="newSystem['serviceUrl']" type="text" class="input is-primary" maxlength="50"></td>
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
    modalConfig: Object
  },

  data () {
    return {
      newSystem: {},
      infoShow: false,
      message: ''
    }
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.newSystem = {};
      this.infoShow = false;
    },

    open () {
    
    },

    //确定操作
    ok () {
      let finalSys = this.newSystem;
      if(!finalSys.sacName || !finalSys.sacLnvalidTime || !finalSys.serviceUrl) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }
      this.$emit('ok', this.newSystem);
    }
  },

  watch: {
    'modalConfig': {
      handler: function(newVal){

      },
      deep:true
    }
  }
}
</script>

<style scoped>
.leftCol {
  width: 20%
}
.is-must {
  color: red
}
.rightCol {
  width: 70%
}
.myHeader {
  display: block !important
}
.search {
  display: flex
}
.search .content {
  margin-right: 20px
}
.addUser {
  margin-bottom: 2rem
}
.userBtn {
  margin-right: 20px;
  margin-bottom: 20px
}
.binded {
  font-size: 1rem;
  padding-bottom: 20px;
}
.check-info {
  margin-left: 0.75em;
}
</style>
