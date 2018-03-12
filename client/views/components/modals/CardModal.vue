<template>
  <card-modal :visible="visible" @close="close" :modalConfig="modalConfig" transition="zoom">
    <table class="table">
      <tbody @click = "open">
        <tr v-for="(k,v,index) in user">
          <td class="leftCol">
            <strong>{{v}}</strong>
          </td>
          <td class="rightCol">{{k}}</td>
        </tr>
      </tbody>
    </table>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'

export default {
  components: {
    CardModal
  },

  props: {
    visible: Boolean,
    modalConfig: Object,
    url: String
  },

  data () {
    return {
      user: {}
    }
  },

  mounted() {
    
  },

  methods: {
    open () {
      console.log(this.modalConfig)
    },

    close () {
      this.$emit('close')
    }
  },

  watch: {
    modalConfig(newVal, oldVal){
      this.user = newVal.userMessage;
    }
  }
}
</script>

<style scoped>
.leftCol {
  width: 20%
}
.rightCol {
  width: 80%
}
</style>
