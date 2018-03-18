<template>
  <vb-switch type="success" :checked="value" v-model="value" size="medium" @input="toggle"></vb-switch>
</template>

<script>
// do not use below code, because `Switch` is svg tag.
// import Switch from 'vue-bulma-switch'
import VbSwitch from 'vue-bulma-switch'

export default {
  components: {
    VbSwitch
  },

  props: {
    user: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data () {
    return {
      value: this.user.userEnable === 1 ? true : false
    }
  },

  mounted() {
    //console.log( this.user)
  },

  methods: {
    toggle(val) {
      if(val) {
        this.user.userEnable = 1
      }else {
        this.user.userEnable = 0
      }
      
      //this.$emit('toggle', val)
    }
  },

  computed: {
    switchStat () {
      return this.value ? 'On' : 'Off'
    }
  },

  watch: {
    value () {
      this.$emit('toggleChange')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
