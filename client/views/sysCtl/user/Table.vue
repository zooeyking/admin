<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <button v-if="userPermission.user_add" class="button is-primary"  @click="showAdd">添加用户</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>用户名</th>
                <th>姓名</th>
                <th>性别</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in userList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{user.userName}}</td>
                <td>{{user.userRealName}}</td>
                <td>{{user.userGenderString}}</td>
                <td>{{user.createDate}}</td>

                <td>
                  <div class="optionWrapper">
                    <button v-if="userPermission.user_detail" class="button is-primary is-small"  @click="showDetail(user)">详情</button>
                    <button v-if="userPermission.user_modify" class="button is-warning is-small"  @click="showModify(user)">修改</button>
                    <button v-if="userPermission.user_delete" class="button is-danger is-small" @click="showDel(user)">删除</button>
                    <my-switch v-if="userPermission.user_off" :user="user" @toggleChange="enableUpdate()"></my-switch>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination ref="pages" :allItems="totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>
          
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
import Pagination from 'components/common/pagination/Pagination';
import Loading from 'components/common/loading/Loading';
import MySwitch from './Switch';
import Search from './Search';
import Confirm from './Modal';
import { mapGetters, mapMutations } from 'vuex';
import { ButtonMixin } from 'base/mixin'

export default {

  mixins: [ButtonMixin],

  components: {
    Pagination,
    Search,
    Loading,
    Confirm,
    MySwitch
  },

  props: {
    //操作面板显示/隐藏控制
    confirmClose: {
      type: Boolean,
      default: true
    },

    //数据库数据总条数
    totalNum: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      modalConfig: {},
    }
  },

  mounted(){
    //console.log(this.userPermission);
  },

  methods: {

    //是否启用操作
    enableUpdate(user) {
      this.$emit('enableUpdate');
      //this.setCurrentUser(user);
    },

    //用户详情
    showDetail(user) {
      this.modalConfig = {
        detail: 1,
        title: '用户详情',
        footerShow: false,
        userMessage: user
      };
      this.setCurrentUser(user);
      this.$emit('getUserInfo');
      this.confirmShow = true;
    },

    //用户资料修改
    showModify(user) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
        userMessage: user
      };
      this.setCurrentUser(user);
      this.confirmShow = true;
    },

    //添加用户
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加用户',
        footerShow: true
      };
      this.confirmShow = true;
    },

    //删除用户
    showDel(user, index) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该用户吗？',
        footerShow: true,
        userMessage: user,
        delIndex: index
      };
      this.setCurrentUser(user);
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //操作面板确认操作
    ok() {
      let user = this.currentUser;
      if(user.delFlag == '1') {
        this.$emit('delUser');
      }
      this.$emit('ok');
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setSysUser : 'SET_SYS_USER',
      setCurrentUser : 'SET_SYS_CURRENTUSER'
    })
  },

  watch: {
    //监听操作面板关闭/开启
    confirmClose() {
      this.confirmShow = false;
    }
  },

  computed: {

    //vuex引入用户数据
    ...mapGetters({
      userList : 'userData',
      currentUser : 'user'
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
