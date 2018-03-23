<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <table class="table" v-if="modalConfig.copy">
      <tbody>
        <tr>
          <td class="leftCol"><strong>新角色名</strong></td><td class="rightCol"><input v-model="newRole['roleName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>姓名</strong></td><td class="rightCol"><input v-model="newRole['roleRealName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>角色描述</strong></td><td class="rightCol"><input v-model="newRole['roleRemark']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol" colspan="2"><p class="is-must">新角色自动拥有原角色所有权限</p></td>
        </tr>
      </tbody>
    </table>
    
    <ztree v-if="modalConfig.power" :list='ztreeDataSource' :func='nodeClick' :is-open='true'></ztree>

    <div class="pageHeader myHeader"  v-if="modalConfig.user">
      <div class="search">
        <ul class="content">
          
          <li class="item text">
            <input class="input is-primary" @keyup.enter="search" v-model="searchUser['userName']" placeholder="用户名"/>
          </li>
          
        </ul>
        <span class="button is-primary" @click="search"><i class="fa fa-search"></i></span>
      </div>
      <div class="addUser" v-show="typeof searchResult == 'object'">
        <a v-for="item in searchResult" class="button is-success userBtn"><span class="icon"><i class="fa fa-check"></i></span> <span>{{item.userName}}</span></a>
      </div>
      <div class="addUser" v-show="typeof searchResult == 'string'">
        {{ searchResult }}
      </div>
      <div class="removeUser">
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
      </div>
    </div>

    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">角色名称</strong></td><td class="rightCol"><input v-model="newRole['roleName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">姓名</strong></td><td class="rightCol"><input v-model="newRole['roleRealName']" type="text" class="input is-primary"></td>
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
import Ztree from './Ztree'

import { __transData } from 'tools/js/util'

export default {
  components: {
    CardModal,
    Ztree
  },

  props: {
    visible: Boolean,
    modalConfig: Object,
    url: String
  },

  data () {
    return {
      ztreeDataSource: [],
      role: {},
      searchResult: [],
      searchUser: {},
      newRole: {}
    }
  },

  methods: {
    cancel () {
      this.$emit('close')
      this.newRole = {
        
      }
    },
    open () {
    /*
      this.newRole = {
        
      }
      */
    },
    close () {
      this.$emit('close')
      this.newRole = {
        
      }
    },
    ok () {
      
      let finnalRole = {}
      if(this.modalConfig.copy) {
        finnalRole = Object.assign({}, this.role, this.newRole)

      }else if(this.modalConfig.del) {
        
        finnalRole = Object.assign({}, this.role, {delFlag: 1})
        this.$emit('close')
      }else if(this.modalConfig.power) {
        let operaStr = this.operats.join()
        
        finnalRole = Object.assign({}, this.role, { operateIds: operaStr})
        this.$emit('ok', finnalRole)
      }else {
        finnalRole = this.newRole
      }
      
      this.$emit('ok', finnalRole)
    },
    //用户绑定界面搜索
    search() {
      this.$emit('userSearch', this.searchUser)
    },
    // 点击节点
    nodeClick:function(m){
       //console.log(JSON.parse(JSON.stringify(m)));
    },
    
    _configOperats(arr) {
      let finalArr = [];
      
      let temp = arr.filter((item)=>{
        return item.checked === true
      });
      console.log(temp)
      for(let i=0; i<temp.length; i++) {
        finalArr.push(temp[i]['operateId'])
      }
      console.log(finalArr)
      return finalArr 
    },
    ...mapMutations({
      setOperats: 'SET_SYS_OPERATS'
    })
  },

  computed: {
    ...mapGetters({
      roleList : 'rolesData',
      operats : 'operats',
    })
  },

  mounted() {
    
  },

  watch: {
    roleList(val) {
      this.newRole = {
        
      }
    },
    'modalConfig': {
      handler: function(newVal){
        this.role = newVal.roleMessage;
        if(newVal.powerList) {
          let sourceData = JSON.parse(JSON.stringify(newVal.powerList))
          let operats = this._configOperats(sourceData)
          this.setOperats(operats)
          let treeData = __transData(sourceData, 'operateId', 'parentOperateId', 'children')
          this.ztreeDataSource = treeData
        }
        if(newVal.searchResult) {
          this.searchResult = newVal.searchResult
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
.is-must {
  color: red
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
.addUser {
  margin-bottom: 2rem
}
.userBtn {
  margin-right: 20px;
  margin-bottom: 20px
}

</style>
