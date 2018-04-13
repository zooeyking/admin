<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <button v-if="userPermission.department_add" class="button is-primary"  @click="showAddRoot">添加跟部门</button>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>部门名称</th>
                <th>上级部门</th>
                <th>备注</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(department, index) in departments">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{department.dName}}</td>
                <td>{{department.parentName || '' }}</td>
                <td>{{department.dRemark}}</td>
                <td>{{department.createDate}}</td>

                <td>
                  <div class="optionWrapper">
                    <button v-if="userPermission.department_bind_user" v-show="department.childCount === 0" class="button is-primary is-small"  @click="showDetail(department)">管理职员</button>
                    <button v-if="userPermission.department_add" v-show="department.userCount === 0" class="button is-warning is-small"  @click="showAdd(department)">添加子部门</button>
                    <button v-if="userPermission.department_delete" v-show="department.childCount === 0 && department.userCount === 0" class="button is-danger is-small" @click="showDel(department)">删除</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination ref="pages" :allItems="totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>
          
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
import Confirm from './Modal';
import Search from './Search';
import { mapGetters, mapMutations } from 'vuex';
import { ButtonMixin } from 'base/mixin';

export default {

  mixins: [ButtonMixin],

  components: {
    Pagination,
    Loading,
    Confirm,
    Search
  },

  props: {
    //操作面板显示/隐藏控制
    confirmClose: {
      type: Boolean,
      default: true
    },

    userSearchResult: [Array, String, Object],

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
      modalConfig: {},
    }
  },

  mounted(){
    
  },

  methods: {

    //员工管理详情
    showDetail(partment) {
      this.modalConfig = {
        editUser: 1,
        title: '职员管理',
        footerShow: true,
        searchResult: []
      };
      this.setCurrentDepartment(partment);
      this.confirmShow = true;
      this.$emit('getUserInfo');
    },

    //用户资料修改
    showAddRoot() {
      this.modalConfig = {
        addRoot: 1,
        title: '添加跟部门',
        footerShow: true
      };
      this.confirmShow = true;
    },

    //添加子部门
    showAdd(partment) {
      this.modalConfig = {
        add: 1,
        title: '添加子部门',
        footerShow: true
      };
      this.setCurrentDepartment(partment);
      this.confirmShow = true;
    },


    //删除部门
    showDel(partment) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该部门吗？',
        footerShow: true
      };
      this.setCurrentDepartment(partment);
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //职员搜索
    userSearch(user) {
      this.$emit('userSearch', user);
    },

    //操作面板确认操作
    ok() {
      this.$emit('ok');
    },

    //vuex引入设置当前部门方法
    ...mapMutations({
      setCurrentDepartment : 'SET_SYS_CURRENTDEPARTMENT'
    })
  },

  watch: {
    //监听操作面板关闭/开启
    confirmClose() {
      this.confirmShow = false;
    },

    //用户绑定面板/用户搜索结果监听
    userSearchResult(newVal) {
      this.modalConfig.searchResult = newVal;
    }
  },

  computed: {

    //vuex引入用户数据
    ...mapGetters({
      departments : 'departmentData',
      appList : 'appList',
      currentDepartmet : 'department'
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
  justify-content: space-between;
}
</style>
