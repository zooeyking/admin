<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <table class="table" v-if="modalConfig.copy">
      <tbody>
        <tr>
          <td class="leftCol"><strong>角色名</strong></td><td class="rightCol">{{role.roleName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>角色描述</strong></td><td class="rightCol">{{role.roleRemark}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.modify">
      <tbody>
        <tr>
          <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{user.userName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>密码</strong></td><td class="rightCol"><input v-model="newRole['userPassWord']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>姓名</strong></td><td class="rightCol"><input v-model="newRole['userRealName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>性别</strong></td><td class="rightCol">
            <label class="radio"><input v-model="newRole['userGender']" type="radio" value="1">
              男
            </label> <label class="radio"><input v-model="newRole['userGender']" type="radio" value="2" >
              女
            </label>
          </td>
        </tr>
        <tr>
          <td class="leftCol"><strong>邮箱</strong></td><td class="rightCol"><input v-model="newRole['userMail']" type="email" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>联系方式</strong></td><td class="rightCol"><input v-model="newRole['userMobilePhone']" type="tel" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>地址</strong></td><td class="rightCol"><input v-model="newRole['userAddress']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>是否启用</strong></td><td class="rightCol"><my-switch :user="newRole"></my-switch></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><input v-model="newRole['userRemark']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">角色名称</strong></td><td class="rightCol"><input v-model="newRole['roleName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">姓名</strong></td><td class="rightCol"><input v-model="newRole['userRealName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">角色描述</strong></td><td class="rightCol"><input v-model="newRole['roleRemark']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>角色名</strong></td><td class="rightCol">{{role.roleName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>角色描述</strong></td><td class="rightCol">{{role.roleRemark}}</td>
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
      role: {},
      newRole: {
        userEnable: 1,
        userGender: 1
      }
    }
  },

  methods: {
    cancel () {
      this.$emit('close')
      this.newRole = {
        userEnable: 1,
        userGender: 1
      }
    },
    open () {
    /*
      this.newRole = {
        userEnable: 1
      }
      */
    },
    close () {
      this.$emit('close')
      this.newRole = {
        userEnable: 1,
        userGender: 1
      }
    },
    ok () {
      let finnalUser = {}
      if(this.modalConfig.modify) {
        finnalUser = Object.assign({}, this.user, this.newRole)
      }else if(this.modalConfig.del) {
        let index = this.modalConfig.delIndex
        
        finnalUser = Object.assign({}, this.user, {delFlag: 1, index: index})
        this.$emit('close')
      }else {
        finnalUser = this.newRole
      }
      this.$emit('ok', finnalUser)
    }
  },

  computed: {
    roleList(){
      return this.$store.getters.rolesData;
    },
    ...mapGetters([
      'systemControl/listData'
    ])
  },

  mounted() {
    //console.log(this.userList)
    //console.log(this['systemControl/listData'])
  },

  watch: {
    userList(val) {
      this.newRole = {
        userEnable: 1,
        userGender: 1
      }
    },
    modalConfig(newVal, oldVal){
      this.role = newVal.roleMessage;
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
