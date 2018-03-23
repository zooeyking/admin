<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    感谢您的支持！
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'
import MySwitch from 'components/common/MySwitch/MySwitch'

export default {
  components: {
    CardModal,
    MySwitch
  },

  props: {
    visible: Boolean,
    modalConfig: Object,
  },

  data () {
    return {
    }
  },

  mounted() {
    
  },

  methods: {
    cancel () {
      this.$emit('close')
    },
    open () {

    },
    close () {
      this.$emit('close')
    },
    ok () {
      this.$emit('ok')
    },
    
  },

  watch: {
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
</style>
