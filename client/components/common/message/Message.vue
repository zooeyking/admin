<template>
  <message @dispear="dispear"></message>
</template>

<script>
import Vue from 'vue'
import Message from 'vue-bulma-message'

const MessageComponent = Vue.extend(Message)

const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    Message
  },

  props: {
    messageType: {
      type: Number,
      default: 0
    }
  },

  mounted () {
    if(this.messageType === 0) {
      openMessage({
        message: '-----------操作成功----------',
        type: 'success',
        duration: 2000
      })
    }else if(this.messageType === 1) {
      openMessage({
        message: '-----------请求失败,必要参数为空----------',
        type: 'danger',
        duration: 2000
      })
    }else if(this.messageType === 2) {
      openMessage({
        message: '-----------重复添加/操作失败----------',
        type: 'danger',
        duration: 2000
      })
    }else if(this.messageType === 3 ) {
      openMessage({
        message: '-----------操作失败----------',
        type: 'danger',
        duration: 2000
      })
    }else if(this.messageType === 4) {
      openMessage({
        message: '网络异常，请求失败，请稍后重试',
        type: 'danger',
        duration: 2000
      })
    }
  },

  methods: {
    openMessageWithType (type) {
      openMessage({
        title: 'This is a title',
        message: 'This is the message.',
        type: type
      })
    },
    dispear () {
      //console.log(11111)
      this.$emit('dispear');
    }
  }

}
</script>

<style lang="scss" scoped>
.styles-box .message-box {
  margin-bottom: 20px;
}

.button {
  margin: 5px 0 0;
}
</style>
