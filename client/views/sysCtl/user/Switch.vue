<template>
  <vb-switch type="success" :checked="value" v-model="value" size="medium" @input="toggle"></vb-switch>
</template>

<script>
// do not use below code, because `Switch` is svg tag.
// import Switch from 'vue-bulma-switch'
import VbSwitch from 'vue-bulma-switch';
import { mapMutations } from 'vuex';

export default {
  components: {
    VbSwitch
  },

  props: {
    user: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data () {
    return {
      value: this.user.userEnable === 0 ? true : false ,
      newUser: {
        userEnable: 0
      }
    }
  },

  mounted() {
    //console.log( this.user)
  },

  methods: {

    toggle(val) {
      this.value = val;
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentUser : 'SET_SYS_CURRENTUSER'
    })
  },

  computed: {
    switchStat () {
      return this.value ? 'On' : 'Off';
    }
  },

  watch: {
    //监听开启与禁用
    value (newVal) {
      this.newUser.userEnable = newVal === true ? 0 : 1 ;
      let finnalUser = Object.assign({}, this.user, this.newUser);
      this.setCurrentUser(finnalUser);
      this.$emit('toggleChange');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
