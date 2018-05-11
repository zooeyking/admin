<template>
  <div class="components-container">
    测试
  </div>
</template>
<style>
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
</style>
<script>
  import UE from 'components/common/ueditor/Ueditor';
  
  export default {

    components: {
      UE
    },

    data() {
      return {

        defaultMsg: '这里是UE测试',

        
      }
    },
    methods: {

      
    }
  };
</script>