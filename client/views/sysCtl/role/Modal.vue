<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <table class="table" v-if="modalConfig.copy">
      <tbody>
        <tr>
          <td class="leftCol is-must"><strong class="is-must">新角色名</strong></td><td class="rightCol"><input v-model="newRole['roleName']" type="text" maxlength="15" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol is-must"><strong class="is-must">系统来源</strong></td>
          <td class="rightCol">
            <div class="control is-horizontal">
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="newRole['sacId']">
                    <option v-for="item in appList" :value="item.sacId" >{{item.sacName}}</option>
                  </select>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="leftCol"><strong>角色描述</strong></td><td class="rightCol"><input v-model="newRole['roleRemark']" type="text" maxlength="50" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol" colspan="2"><p class="is-must">新角色自动拥有原角色所有权限</p></td>
        </tr>
      </tbody>
    </table>
    
    <ztree v-if="modalConfig.power" :list='ztreeDataSource' :func='nodeClick' :is-open='false' @setPowers="setPowers"></ztree>

    <role-tabs ref="tabs" v-if="modalConfig.user" @userSearch="userSearch" :searchResult="searchResult"></role-tabs>

    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">角色名称</strong></td><td class="rightCol"><input v-model="newRole['roleName']" type="text" maxlength="15" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">系统来源</strong></td>
          <td class="rightCol">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newRole['sacId']">
                  <option v-for="item in appList" :value="item.sacId" >{{item.sacName}}</option>
                </select>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="leftCol"><strong >角色描述</strong></td><td class="rightCol"><input v-model="newRole['roleRemark']" type="text" maxlength="50" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>

    <table class="table" v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>角色名</strong></td><td class="rightCol">{{currentRole.roleName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>角色描述</strong></td><td class="rightCol">{{currentRole.roleRemark}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>

<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import Ztree from './Ztree';
import RoleTabs from './Tabs';
import jsonp from 'tools/js/jsonp';
import { CommonParams, options, powerListUrl, roleUserUrl } from 'base/askUrl';

import { __treesData, __flatData } from 'tools/js/util';

export default {
  components: {
    CardModal,
    Ztree,
    RoleTabs
  },

  props: {
    visible: Boolean,
    modalConfig: Object,
    url: String
  },

  data () {
    return {
      infoShow: false,
      message: '',
      ztreeDataSource: [],
      searchResult: {},
      searchUser: {
        pageNum: 1
      },
      powerStr: '',
      newRole: {
        //sacId: this.appList != undefined ? this.appList[0]['sacId'] : ''
        //sacId: this.appList[0]['sacId']
      }
    }
  },

  methods: {
    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
    },

    open () {},

    //确认操作
    ok () {
      let finnalRole = {};
      if(this.modalConfig.copy) {

        finnalRole = Object.assign({}, this.currentRole, this.newRole);
        if(!finnalRole.roleName || !finnalRole.sacId) {
          this.message = '角色名和系统来源不能为空!';
          this.infoShow = true;
          return;
        }

      }else if(this.modalConfig.del) {

        finnalRole = Object.assign({}, this.currentRole, {delFlag: 1});

      }else if(this.modalConfig.power) {
        
        let operaStr = this.powerStr;
        finnalRole = Object.assign({}, this.currentRole, { operateIds: operaStr});

      }else if(this.modalConfig.user) {
        
        let users = this.$refs.tabs.selectedUsers;
        let userIds = users.join();
        let optionType = this.$refs.tabs.optionType;
        finnalRole = Object.assign({}, this.currentRole, { userIds: userIds, optionType: optionType});
        
        if(finnalRole.userIds == '') {
          this.$emit('close');
          this.infoShow = false;
          return;
        }

      }else {

        finnalRole = this.newRole;
        if(!finnalRole.roleName || !finnalRole.sacId) {
          this.message = '角色名和系统来源不能为空!';
          this.infoShow = true;
          return;
        }
      }

      this.setRole(finnalRole);
      this.$emit('ok');
    },

    //用户绑定界面发出的权限列表更改后对象
    setPowers(obj) {
      let sourceData = JSON.parse(JSON.stringify(obj));
      let list = __flatData(sourceData);
      let operats = this.__configOperats(list);
      this.powerStr = operats.join();
    },

    //用户绑定界面搜索
    userSearch(user) {
      let optionType = this.$refs.tabs.optionType;
      let typeUser = Object.assign({}, user, { optionType: optionType});
      this.$emit('userSearch', typeUser);
    },

    // 点击节点
    nodeClick:function(m){
       //console.log(JSON.parse(JSON.stringify(m)));
    },

    //用户权限格式化方法
    __configOperats(arr) {
      let finalArr = [];
      
      let temp = arr.filter((item)=>{
        return item.checked === true;
      });

      for(let i=0; i<temp.length; i++) {
        finalArr.push(temp[i]['operateId']);
      }

      return finalArr;
    },

    //引入vuex设置当前选取角色方法
    ...mapMutations({
      setRole : 'SET_SYS_CURRENTROLE'
    })
  },

  computed: {
    //引入vuex当前选取角色
    ...mapGetters({
      currentRole : 'role',
      appList : 'appList'
    })
  },

  mounted() {
    
  },

  updated() {
    
  },

  watch: {
    //角色添加系统来源列表数据监听
    appList(val) {
      this.newRole['sacId']= val[0]['sacId']
    },

    //当前操作角色监听
    currentRole(newVal) {
      this.newRole = Object.assign({}, newVal);
      
      if(this.modalConfig.add) {
        this.newRole['sacId']= this.appList[0]['sacId'];
      }
      
    },

    //操作面板配置数据监听
    'modalConfig': {
      handler: function(newVal){

        if(newVal.powerList) {
          let treeData = __treesData(newVal.powerList, 'operateId', 'parentOperateId', 'children');
          this.ztreeDataSource = treeData;
        }

        if(newVal.searchResult) {
          this.searchResult = newVal.searchResult;
        }
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.leftCol {
  width: 20%
}
.is-must{
  color: red !important
}
.rightCol {
  width: 70%
}
.myHeader {
  display: block !important
}
.search {
  display: flex
}
.search .content {
  margin-right: 20px
}

.binded {
  font-size: 1rem;
  padding-bottom: 20px;
}

.check-info {
  margin-left: 0.75em;
}

</style>
