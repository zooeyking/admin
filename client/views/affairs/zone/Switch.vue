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
    zone: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data () {
    return {
      value: this.zone.zoneEnable === 0 ? true : false ,
      newZone: {
        zoneEnable: 0
      }
    }
  },

  mounted() {
    //console.log( this.user.userEnable, this.value);
  },

  methods: {

    toggle(val) {
      this.value = val;
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentZone : 'SET_SYS_CURRENTZONE'
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
      this.newZone.zoneEnable = newVal === true ? 0 : 1 ;
      let finnalZone = Object.assign({}, this.zone, this.newZone);
      this.setCurrentZone(finnalZone);
      this.$emit('toggleChange');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
