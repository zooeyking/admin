<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch" :appList="searchList"></search>
            <button class="button is-primary"  @click="showAdd">添加角色</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>角色名称</th>
                <th>角色描述</th>
                <th>系统名称</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in currentRoles">
                
                <td>{{role.roleName}}</td>
                <td>{{role.roleRemark}}</td>
                <td>{{role.sacName}}</td>
                <td>{{role.createDate}}</td>
                <td>
                  <div class="optionWrapper">
                    <button class="button is-primary is-small"  @click="showCopy(role)">复制角色</button>
                    <button class="button is-primary is-small"  @click="showPower(role)">绑定权限</button>
                    <button class="button is-primary is-small"  @click="showUser(role)">绑定用户</button>
                    <button class="button is-danger is-small" @click="showDel(role)">删除</button>
                    
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :allItems = "roleList" @changeIndex="getIndex"></pagination>
          
          <div class="loadingWrapper" v-show="isShow">
            <loading></loading>
          </div>
          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" @ok="ok" @userSearch="userSearch"></confirm>
          
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/Pagination'
import Loading from 'components/common/loading/Loading'
import Search from './Search'
import Confirm from './Modal'

import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
import { CommonParams, options, powerListUrl } from 'base/askUrl'

const PERNUM = 10

export default {
  components: {
    Pagination,
    Search,
    Loading,
    Confirm
  },
  props: {
    confirmClose: {
      type: Boolean,
      default: true
    },
    userSearchResult: [Array, String]
  },
  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      searchList: [],
      modalConfig: {},
      currentRoles: []
    }
  },
  mounted(){
    
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    showCopy(role) {
      this.modalConfig = {
        copy: 1,
        title: '复制角色',
        footerShow: true,
        roleMessage: role
      }
      
      this.confirmShow = true
    },
    showPower(role) {
      let me = this
      this._getPowerList(role).then((res)=>{
        
        if(res.status == true) {
          console.log(res)
          me.modalConfig = {
            power: 1,
            title: '绑定权限',
            footerShow: true,
            roleMessage: role,
            powerList: res.value
          }
        }
      })
      
      this.confirmShow = true
    },
    showUser(role) {
      this.modalConfig = {
        user: 1,
        title: '绑定用户',
        footerShow: false,
        roleMessage: role,
        searchResult: []
      }
      
      this.confirmShow = true
    },
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加角色',
        footerShow: true
      }
      
      this.confirmShow = true
    },

    showDel(role) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该角色吗？',
        footerShow: true,
        roleMessage: role
      }
      this.confirmShow = true
    },

    closeDetail() {
      this.confirmShow = false
    },

    //角色列表搜索
    paramsSearch(params) {
      this.$emit('paramsSearch', params)
    },

    //用户绑定搜索
    userSearch(user) {
      this.$emit('userSearch', user)
    },

    ok(role) {
      
      if(role.delFlag === 1) {
        this._del(role)
      }else {
        this.$emit('ok', role)
      }
    
    },
    _del(role, index) {
      this.$emit('delRole', role)
    },
    _getPowerList(role) {
      let params = Object.assign({}, CommonParams, { roleId : role.roleId });
      
      return jsonp(powerListUrl, params, options)
    },
    /*
    ...mapMutations({
      setSysUser: 'SET_SYS_USER'
    })
    */
  },
  watch: {
    confirmClose() {
      this.confirmShow = false
    },
    appList(newVal) {
      //console.log(newVal)
      this.searchList = newVal
    },
    roleList(newVal) {
      let arr = [];

      if(newVal.length <= PERNUM) {
        arr = newVal;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(newVal[i + cut]) {
            arr.push(newVal[i + cut])
          }else {
            break
          }
        }
      }
      this.currentRoles = arr
    },
    userSearchResult(newVal) {
      this.modalConfig.searchResult = newVal
    }
  },
  computed: {
    appList(){
      return this.$store.getters.appList;
    },
    roleList(){
      return this.$store.getters.rolesData;
    }
  }
}
</script>

<style lang="scss" scoped>
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
.table th, .table td{
  text-align: center;
}
.tableContent {
  height: 470px;
  overflow: auto;
  margin-top: -20px;
}
.pageHeader {
  display: flex;
  justify-content: space-between;
}

.box {
  position: relative;
}
.loadingWrapper {
  position: absolute;
  z-index: 10;
  top: 10%;
  left: 0;
  width: 100%;
  height: 80%;
}
.optionWrapper {
  display: flex;
  justify-content: space-around;
}
</style>
