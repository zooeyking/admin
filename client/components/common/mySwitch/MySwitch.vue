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

  data () {
    return {
      value: false
    }
  },

  methods: {
    toggle(val) {
      this.$emit('toggle', val)
    }
  },

  computed: {
    switchStat () {
      return this.value ? 'On' : 'Off'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
