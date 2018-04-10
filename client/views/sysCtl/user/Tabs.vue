<template>
  
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <tabs type="boxed">
          <tab-pane label="个人信息">
            <table class="table" solt="privateInfo">
              <tbody>
                <tr>
                  <td class="leftCol"><strong>用户名</strong></td><td class="rightCol">{{currentUser.userName}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>姓名</strong></td><td class="rightCol">{{currentUser.userRealName}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>性别</strong></td><td class="rightCol">{{currentUser.userGenderString}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>创建时间</strong></td><td class="rightCol">{{currentUser.createDate}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>邮箱</strong></td><td class="rightCol">{{currentUser.userMail}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>联系方式</strong></td><td class="rightCol">{{currentUser.userMobilePhone}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>地址</strong></td><td class="rightCol">{{currentUser.userAddress}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>是否禁用</strong></td><td class="rightCol">{{currentUser.userEnable}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>备注</strong></td><td class="rightCol">{{currentUser.userRemark}}</td>
                </tr>
              </tbody>
            </table>
          </tab-pane>  
          <tab-pane label="角色信息">
            <a v-for="item in userRoleInfo" class=" is-outlined userBtn"> <span>{{item.roleName}}</span></a>
          </tab-pane>
          <tab-pane label="部门信息">
            <a v-for="item in userDeptInfo" class=" is-outlined userBtn"> <span>{{item.d_name}}</span></a>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
  
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs'
import { mapGetters } from 'vuex';

export default {
  components: {
    Tabs,
    TabPane
  },

  data () {
    return {
      
    }
  },

  mounted () {
    console.log(this.userRoleInfo)
  },

  watch: {
    
    userRoleInfo(val) {
      console.log(val);
    }
    
  },

  methods: {

  },

  computed: {
    ...mapGetters({
      currentUser : 'user',
      userRoleInfo : 'userRoleList',
      userDeptInfo : 'userDepartmentList'
    }) 
  }
}
</script>

<style lang="scss">
.tabs {
  margin: 30px;
  .tab-content {
    min-height: 50px;
  }
}

.userBtn {
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  cursor: text;
  color: #363636;
}

</style>
