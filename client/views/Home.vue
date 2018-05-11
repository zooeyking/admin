<template>
  <div class="content has-text-centered">
    <p>
      <img width="200" src="~assets/logo.svg" :alt="description">
    </p>

    <h1 class="is-title is-bold">联鹏</h1>

    <p>
      <strong>GIS后台管理系统</strong>
    </p>

    <p>©联鹏应用软件(上海)有限公司</p>
  </div>
</template>

<script>
import { authority, UserInfo } from 'base/author';

export default {

  data () {
    return this.$store.state.pkg;
  },

  created() {
    UserInfo();

    authority();

    window.location.search = "";
    this.$router.push({path: '/'});
    
  },

  mounted() {
    
  },

  methods : {

  }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
