<template>
  <div class="content has-text-centered">
    <p>
      <img width="200" src="~assets/logo.svg" :alt="description">
    </p>

    <h1 class="is-title is-bold">SSO</h1>

    <p>
      <strong>单点登录系统</strong>
    </p>

    <p>©联鹏应用软件(上海)有限公司</p>
  </div>
</template>

<script>
import { authority, UserInfo } from 'base/author'

export default {

  data () {
    return this.$store.state.pkg
  },

  created() {
    UserInfo()

    authority()

    //let request = this.GetRequest()
    //console.log(request)
  },

  methods : {
    GetRequest() {   
        let url = window.location.search;   //获取url中"?"符后的字串   
        let theRequest = new Object();   
        if (url.indexOf("?") != -1) {   
          let str = url.substr(1);   
          let strs = str.split("&");   
          for(let i = 0; i < strs.length; i ++) {   
             theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);   
          }   
        }   
        return theRequest;   
    }
  }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
