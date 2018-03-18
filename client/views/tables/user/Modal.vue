<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <table class="table" v-if="modalConfig.detail">
      <tbody>
        <tr>
          <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{user.userName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>姓名</strong></td><td class="rightCol">{{user.userRealName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>性别</strong></td><td class="rightCol">{{user.userGenderString}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>创建时间</strong></td><td class="rightCol">{{user.createDate}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>邮箱</strong></td><td class="rightCol">{{user.userMail}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>联系方式</strong></td><td class="rightCol">{{user.userMobilePhone}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>地址</strong></td><td class="rightCol">{{user.userAddress}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>是否启用</strong></td><td class="rightCol">{{user.userEnable}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol">{{user.userRemark}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.modify">
      <tbody>
        <tr>
          <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{user.userName}}</td>
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
        <tr>
          <td class="leftCol"><strong>是否启用</strong></td><td class="rightCol"><my-switch :user="newUser"></my-switch></td>
        </tr>
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
        <tr>
          <td class="leftCol"><strong>是否启用</strong></td><td class="rightCol"><my-switch :user="newUser"></my-switch></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><input v-model="newUser['userRemark']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{user.userName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>姓名</strong></td><td class="rightCol">{{user.userRealName}}</td>
        </tr>
      </tbody>
    </table>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal'
import { mapGetters, mapMutations } from 'vuex'
import MySwitch from 'components/common/MySwitch/MySwitch'

export default {
  components: {
    CardModal,
    MySwitch
  },

  props: {
    visible: Boolean,
    modalConfig: Object,
    url: String
  },

  data () {
    return {
      user: {},
      newUser: {
        userEnable: 1,
        userGender: 1
      }
    }
  },

  mounted() {
    
  },

  methods: {
    cancel () {
      this.$emit('close')
      this.newUser = {
        userEnable: 1,
        userGender: 1
      }
    },
    open () {
    /*
      this.newUser = {
        userEnable: 1
      }
      */
    },
    close () {
      this.$emit('close')
      this.newUser = {
        userEnable: 1,
        userGender: 1
      }
    },
    ok () {
      let finnalUser = {}
      if(this.modalConfig.modify) {
        finnalUser = Object.assign({}, this.user, this.newUser)
      }else if(this.modalConfig.del) {
        let index = this.modalConfig.delIndex
        
        finnalUser = Object.assign({}, this.user, {delFlag: 1, index: index})
        this.$emit('close')
      }else {
        finnalUser = this.newUser
      }
      this.$emit('ok', finnalUser)
    },

    Zname(args) {
      let str = ''
      switch (args) {
        case 'userName' :
          str = '用户名'
          break;
        case 'userRealName' :
          str = '姓名'
          break;
        case 'userPassWord' :
          str = '密码'
          break;
        case 'createDate' :
          str = '创建时间'
          break;
        case 'userGenderString' :
        case 'userGender' :
          str = '性别'
          break;
        case 'userMobilePhone' :
          str = '联系方式'
          break;
        case 'userAddress' :
          str = '地址'
          break;
        case 'userId' :
          str = '用户id'
          break;
        case 'userMail' :
          str = '邮箱'
          break;
        case 'userEnable' :
          str = '是否启用'
          break;
        case 'userRemark' :
          str = '备注'
          break;
        }
      return str;
    }
  },

  computed: {
    userList(){
      return this.$store.getters.listData;
    },
    ...mapGetters([
      'systemControl/listData'
    ])
  },

  mounted() {
    console.log(this.userList)
    //console.log(this['systemControl/listData'])
  },

  watch: {
    userList(val) {
      this.newUser = {
        userEnable: 1,
        userGender: 1
      }
    },
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
.is-must {
  color: red
}
.rightCol {
  width: 70%
}
</style>
