<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch" :appList="appList"></search>
            <button class="button is-primary"  @click="showAdd">添加角色</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>角色名称</th>
                <th>角色描述</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(role, index) in currentRoles">
                <td>
                  <input type="checkbox">
                </td>
                <td>{{role.roleName}}</td>
                <td>{{role.roleRemark}}</td>
                <td>{{role.createDate}}</td>
                <td>
                  <div class="optionWrapper">
                    <button class="button is-primary is-small"  @click="showCopy(role)">复制角色</button>
                    <button class="button is-primary is-small"  @click="showModify(role)">绑定权限</button>
                    <button class="button is-primary is-small"  @click="showModify(role)">绑定用户</button>
                    <button class="button is-danger is-small" @click="showDel(role, index)">删除</button>
                    
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :allItems = "tableData" @changeIndex="getIndex"></pagination>
          
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
    Confirm
  },
  props: {
    tableData: {
      type: Array,
      dafault() {
        return []
      }
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
      appList: [],
      modalConfig: {}
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
        footerShow: false,
        roleMessage: role
      }
      
      this.confirmShow = true
    },
    showModify(role) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
        roleMessage: role
      }
      
      
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
      
      this.confirmShow = true
    },
    showDel(role, index) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该用户吗？',
        footerShow: true,
        roleMessage: role,
        delIndex: index
      }
      
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
      this.currentRoles.splice(index, 1)
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
    }
  },
  computed: {
    currentRoles() {
      let arr = [];
      let listData = this.tableData.length > 0 ? this.tableData : [];
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
