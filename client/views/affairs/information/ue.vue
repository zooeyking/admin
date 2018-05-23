<template>
  <div class="components-container">
    <div class="editor-container">
      <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
    </div>
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

        defaultMsg: '这里输入内容',

        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    methods: {

      getUEContent() {
        let content = this.$refs.ue.getUEContent();

        /*
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        */
        console.log(content)
      }
    }
  };
</script>