<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <user-tabs v-if="modalConfig.detail"></user-tabs>
    
    <table class="table" v-if="modalConfig.modify">
      <tbody>
        <tr>
          <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{currentUser.userName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>密码</strong></td><td class="rightCol"><input v-model="newUser['userPassWord']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>姓名</strong></td><td class="rightCol"><input v-model="newUser['userRealName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>性别</strong></td><td class="rightCol">
            <label class="radio"><input v-model="newUser['userGender']" type="radio" value="1">
              男
            </label> <label class="radio"><input v-model="newUser['userGender']" type="radio" value="2" >
              女
            </label>
          </td>
        </tr>
        <tr>
          <td class="leftCol"><strong>邮箱</strong></td><td class="rightCol"><input v-model="newUser['userMail']" type="email" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>联系方式</strong></td><td class="rightCol"><input v-model="newUser['userMobilePhone']" type="tel" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>地址</strong></td><td class="rightCol"><input v-model="newUser['userAddress']" type="text" class="input is-primary"></td>
        </tr>
        <!--
        <tr>
          <td class="leftCol"><strong>是否启用</strong></td><td class="rightCol"><my-switch :user="newUser"></my-switch></td>
        </tr>
        -->
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><input v-model="newUser['userRemark']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">用户名</strong></td><td class="rightCol"><input v-model="newUser['userName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">密码</strong></td><td class="rightCol"><input v-model="newUser['userPassWord']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">姓名</strong></td><td class="rightCol"><input v-model="newUser['userRealName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>性别</strong></td><td class="rightCol">
            <label class="radio"><input v-model="newUser['userGender']" type="radio" value="1">
              男
            </label> <label class="radio"><input v-model="newUser['userGender']" type="radio" value="2" >
              女
            </label>
          </td>
        </tr>
        <tr>
          <td class="leftCol"><strong>邮箱</strong></td><td class="rightCol"><input v-model="newUser['userMail']" type="email" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>联系方式</strong></td><td class="rightCol"><input v-model="newUser['userMobilePhone']" type="tel" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>地址</strong></td><td class="rightCol"><input v-model="newUser['userAddress']" type="text" class="input is-primary"></td>
        </tr>
        <!--
        <tr>
          <td class="leftCol"><strong>是否启用</strong></td><td class="rightCol"><my-switch :user="newUser"></my-switch></td>
        </tr>
        -->
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><input v-model="newUser['userRemark']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{currentUser.userName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>姓名</strong></td><td class="rightCol">{{currentUser.userRealName}}</td>
        </tr>
      </tbody>
    </table>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import UserTabs from './Tabs';
import MySwitch from './Switch';

export default {
  components: {
    CardModal,
    MySwitch,
    UserTabs
  },

  props: {
    visible: Boolean,
    modalConfig: Object
  },

  data () {
    return {
      newUser: {
        userEnable: 1,
        userGender: 1
      }
    }
  },

  mounted() {
    
  },

  methods: {
    //取消操作
    cancel () {
      this.$emit('close');
      if(this.modalConfig.modify) {
        this.newUser = Object.assign({}, this.currentUser);
      }else {
        this.newUser = {
          userEnable: 1,
          userGender: 1
        }
      }
    },

    open () {},

    //关闭操作
    close () {
      this.$emit('close')
      if(this.modalConfig.modify) {
        this.newUser = Object.assign({}, this.currentUser);
      }else {
        this.newUser = {
          userEnable: 1,
          userGender: 1
        }
      }
    },

    //确认操作
    ok () {
      let finnalUser = {};
      if(this.modalConfig.modify) {
        finnalUser = Object.assign({}, this.currentUser, this.newUser);
      }else if(this.modalConfig.del) {
        let index = this.modalConfig.delIndex;
        finnalUser = Object.assign({}, this.currentUser, {delFlag: 1});
      }else {
        finnalUser = this.newUser;
      }
      this.setCurrentUser(finnalUser);
      this.$emit('ok');
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setSysUser : 'SET_SYS_USER',
      setCurrentUser : 'SET_SYS_CURRENTUSER'
    })
  },

  computed: {
    //vuex引入用户数据
    ...mapGetters({
      userList : 'userData',
      currentUser : 'user'
    })
  },

  watch: {
    userList(val) {
      this.newUser = {
        userEnable: 1,
        userGender: 1
      }
    },

    currentUser(newVal, oldVal){
      if(this.modalConfig.modify) {
        this.newUser = Object.assign({}, newVal);
      }
    }
    
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
