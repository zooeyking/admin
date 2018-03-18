<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search :searchConfig="searchConfig" @paramsSearch="paramsSearch"></search>
            <button class="button is-primary"  @click="showAdd">添加用户</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>用户名</th>
                <th>姓名</th>
                <th>性别</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in currentUsers">
                <td>
                  <input type="checkbox">
                </td>
                <td>{{user.userName}}</td>
                <td>{{user.userRealName}}</td>
                <td>{{user.userGenderString}}</td>
                <td>{{user.createDate}}</td>

                <td>
                  <div class="optionWrapper">
                    <button class="button is-primary is-small"  @click="showDetail(user)">详情</button>
                    <button class="button is-warning is-small"  @click="showModify(user)">修改</button>
                    <button class="button is-danger is-small" @click="showDel(user, index)">删除</button>
                    <my-switch :user="user" @toggleChange="enableUpdate(user, index)"></my-switch>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :allItems = "tableConfig.listData" @changeIndex="getIndex"></pagination>
          
          <div class="loadingWrapper" v-show="isShow">
            <loading></loading>
          </div>
          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" @ok="ok"></confirm>
          
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/Pagination'
import Loading from 'components/common/loading/Loading'
import MySwitch from 'components/common/MySwitch/MySwitch'
import Search from './Search'
import Confirm from './Modal'

import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
import axios from 'axios'

const PERNUM = 10

const options = {
  param: 'callback'
}

export default {
  components: {
    Pagination,
    Search,
    Loading,
    Confirm,
    MySwitch
  },
  props: {
    tableConfig: {
      type: Object,
      dafault: {}
    },
    confirmClose: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      searchConfig: [],
      modalConfig: {}
    }
  },
  mounted(){
    //搜索组件配置
    this._setConfig(this.tableConfig)
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    enableUpdate(user) {
      this.$emit('enableUpdate', user)
    },
    showDetail(user) {
      this.modalConfig = {
        detail: 1,
        title: '用户详情',
        footerShow: false,
        userMessage: user
      }
      
      this.confirmShow = true
    },
    showModify(user) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
        userMessage: user
      }
      //vuex 系统管理选中的用户
      //this.setSysUser(user)
      this.confirmShow = true
    },
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加用户',
        footerShow: true,
        userMessage: {
          "userName":"userName1",
          "userRealName": "userRealName",
          "userPassWord": "userPassWord",
          "userGender": 1,
          "userMobilePhone": "userMobilePhone",
          "userMail": "userMail",
          "fromSacId": "fromSacId",
          "userEnable": 1,
          "userMail": "userMail",
          "userRemark": "userRemark"
        }
      }
      //vuex 系统管理选中的用户
      //this.setSysUser(user)
      this.confirmShow = true
    },
    showDel(user, index) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该用户吗？',
        footerShow: true,
        userMessage: user,
        delIndex: index
      }
      //vuex 系统管理选中的用户
      //this.setSysUser(user)
      this.confirmShow = true
    },
    closeDetail() {
      this.confirmShow = false
    },
    paramsSearch(params) {
      this.$emit('paramsSearch', params)
    },
    ok(data) {
      if(data.delFlag == '1') {
        this._del(data, data.index)
      }
      this.$emit('ok', data)
    },
    _del(user,index) {
      this.$emit('delUser', user),
      this.currentUsers.splice(index, 1)
    },
    _setConfig(obj) {
      switch(obj.tableName){
        case 'users':
          this.searchConfig = {userName:'用户名', userRealName:'姓名', date:'选择时间段', flag: true};
          break;
        case 'role':
          this.searchConfig = {role:'角色名', system:'操作系统', flag: true};
          break;
        case 'logs':
          this.searchConfig = {optioner:'操作人', date:'选择时间段', system:'操作系统', flag: true};
          break;
        default:
          this.searchConfig = {}
      }
    },
    ...mapMutations({
      setSysUser: 'SET_SYS_USER'
    })
  },
  watch: {
    confirmClose() {
      this.confirmShow = false
    }
  },
  computed: {
    currentUsers() {
      let arr = [];
      let listData = this.tableConfig.listData;
      if(listData.length <= PERNUM) {
        arr = listData;
        return arr;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(listData[i + cut]) {
            arr.push(listData[i + cut])
          }else {
            break
          }
        }
        return arr;
      }
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
