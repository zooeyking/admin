<template>
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar({opened: !sidebar.opened})">
            <i class="fa fa-bars" aria-hidden="true" v-show="!sidebar.hidden"></i>
          </a>
        </div>
        <div class="nav-center">
          <a class="nav-item hero-brand" href="/">
            <img src="~assets/logo.svg" :alt="pkginfo.description">
            <tooltip :label="'v' + pkginfo.version" placement="right" type="success" size="small" :no-animate="true" :always="true" :rounded="true">
              <div class="is-hidden-mobile">
                <span class="vue">联鹏</span><strong class="admin">统一身份认证系统</strong>
              </div>
            </tooltip>
          </a>
        </div>
        <div class="nav-right is-flex">
          <!--<router-link v-if="!$auth.check()" to="/login" class="nav-item">登录</router-link>
              <a v-if="$auth.check()" @click="logout" class="nav-item">退出</a>
          -->
          <a @click="goOut" class="nav-item">退出</a>
        </div>
      </nav>
    </div>
    <confirm :visible="visible" :modalConfig="modalConfig" @ok="ok" @close="close"></confirm> 
  </section>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'
import Confirm from 'components/common/modal/Modal'

import { mapGetters, mapActions } from 'vuex'
import { logOut } from 'base/author'

export default {
  data() {
    return {
      modalConfig: {
        logOut: 1,
        title: '确认退出吗？',
        footerShow: true
      },
      visible: false,
    }
  },

  components: {
    Tooltip,
    Confirm
  },

  mounted() {
    
  },

  props: {
    show: Boolean
  },

  computed: mapGetters({
    pkginfo: 'pkg',
    sidebar: 'sidebar'
  }),

  methods: {
    ...mapActions([
      'toggleSidebar'
    ]),

    goOut () {
      this.visible = true
      
      /*
      this.$auth.logout({
        redirect: 'Home',
        makeRequest: false
        // params: {},
        // success: function () {},
        // error: function () {},
        // etc...
      })
      */
    },

    ok() {
      logOut()
    },
    
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/variables';

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 124;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .container {
    margin: auto 10px;
  }

  .nav-right {
    align-items: stretch;
    align-items: stretch;
    flex: 1;
    justify-content: flex-end;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
}

.hero-brand {
  .vue {
    margin-left: 10px;
    color: #36AC70;
  }
  .admin {
    color: #28374B;
  }
}
</style>
