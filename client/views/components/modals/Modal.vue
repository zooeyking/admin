<template>
  <modal :visible="visible" @close="close">
    <div class="box">
      <article class="table">
        
      </article>
    </div>
  </modal>
</template>

<script>
import { Modal } from 'vue-bulma-modal'

export default {
  components: {
    Modal
  },

  props: {
    visible: Boolean
  },

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
