<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
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
              <tr v-for="(role, index) in roleList">
                
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

          <pagination :allItems="totalNum" @changeIndex="getIndex" :pernum="20"></pagination>

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
import Pagination from 'components/common/pagination/Pagination';
import Loading from 'components/common/loading/Loading';
import Search from './Search';
import Confirm from './Modal';
import { mapGetters, mapMutations } from 'vuex';
import { CommonParams, options, powerListUrl, roleUserUrl,  roleBindUrl, roleUnbindUrl } from 'base/askUrl';

const PERNUM = 10;

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
    totalNum: {
      type: Number,
      default: 0
    },
    rolePowerList: Array,
    userSearchResult: [Array, String, Object]
  },

  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      modalConfig: {},
      currentRoles: []
    }
  },

  mounted(){
    
  },

  methods: {

    //分页当前页码
    getIndex(num) {
      this.$emit('paramsSearch', {pageNum: num});
    },

     //角色列表搜索
    paramsSearch(params) {
      this.$emit('paramsSearch', params);
    },

    //复制角色操作面板设置
    showCopy(role) {
      this.modalConfig = {
        copy: 1,
        title: '复制角色',
        footerShow: true
      }
      this.setCurrentRole(role);
      this.confirmShow = true;
    },

    //角色绑定权限操作面板设置
    showPower(role) {
      this.modalConfig = {
        power: 1,
        title: '绑定权限',
        footerShow: true,
        powerList: []
      };
      this.getPowers(role);
      this.setCurrentRole(role);
      this.confirmShow = true;
    },

    //角色绑定用户操作面板设置
    showUser(role) {
      this.modalConfig = {
        user: 1,
        title: '绑定用户',
        footerShow: true,
        searchResult: [],
      }
      this.setCurrentRole(role);
      this.confirmShow = true;
    },

    //添加角色操作面板设置
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加角色',
        footerShow: true
      }
      this.confirmShow = true;
    },

    //删除操作面板设置
    showDel(role) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该角色吗？',
        footerShow: true
      }
      this.setCurrentRole(role);
      this.confirmShow = true;
    },

    //发出获得角色权限的请求
    getPowers(role) {
      this.$emit('getPowers', role);
    },

    //发出获得角色下绑定的用户的请求
    getUsers(role) {
      this.$emit('getUsers', role);
    },

    //操作面板关闭
    closeDetail() {
      this.confirmShow = false;
    },

    //用户绑定搜索
    userSearch(user) {
      this.$emit('userSearch', user);
    },

    //确认操作
    ok() {
      if(this.currentRole.delFlag === 1) {
        this.$emit('delRole');
      }else {
        this.$emit('ok');
      }
    },
    
    //引入vuex设置当前选取角色方法
    ...mapMutations({
      setCurrentRole: 'SET_SYS_CURRENTROLE'
    })
  },

  watch: {
    //操作面板隐藏
    confirmClose() {
      this.confirmShow = false;
    },

    //角色列表数据监听
    roleList(newVal) {
      let arr = [];
      if(newVal == undefined) {
        return;
      }
      if(newVal.length <= PERNUM) {
        arr = newVal;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(newVal[i + cut]) {
            arr.push(newVal[i + cut]);
          }else {
            break;
          }
        }
      }
      this.currentRoles = arr;
    },

    //用户绑定面板/用户搜索结果监听
    userSearchResult(newVal) {
      this.modalConfig.searchResult = newVal;
    },

    //角色权限面板/权限搜索结果监听
    rolePowerList(newVal) {
      this.modalConfig.powerList = newVal;
    }
    
  },

  computed: {
    //vuex中引入所需数据
    ...mapGetters({
      appList : 'appList',
      roleList : 'roleData',
      currentRole : 'role'
    })
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
