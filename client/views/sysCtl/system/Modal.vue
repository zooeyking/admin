<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">

    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong>系统名称</strong></td><td class="rightCol"><input v-model="newSystem['sacName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>有效时间</strong></td><td class="rightCol"><input v-model="newSystem['sacLnvalidTime']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>服务器地址</strong></td><td class="rightCol"><input v-model="newSystem['serviceUrl']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>

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
      newSystem: {}
    }
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.newSystem = {};
    },

    open () {
    
    },

    //关闭操作面板
    close () {
      this.$emit('close');
      this.newSystem = {};
    },

    //确定操作
    ok () {
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
</style>
