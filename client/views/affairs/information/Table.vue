<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <!--<button v-if="userPermission.user_add" class="button is-primary"  @click="showAdd">添加用户</button>-->
            <button class="button is-primary"  @click="showAdd">新建信息</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>标题</th>
                <th>所属校区</th>
                <th>信息类别</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in informationList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{item.title}}</td>
                <td>{{item.campus.name}}</td>
                <td>{{item.serviceCategory.name}}</td>
                <td>{{item.createDate}}</td>
                
                <td>
                  <div class="optionWrapper">
                    <!--
                    <button v-if="userPermission.user_detail" class="button is-primary is-small"  @click="showDetail(zone)">详情</button>
                    <button v-if="userPermission.user_modify" class="button is-warning is-small"  @click="showModify(zone)">修改</button>
                    <button v-if="userPermission.user_delete" class="button is-danger is-small" @click="showDel(zone)">删除</button>
                    -->
                    <button class="button is-primary is-small"  @click="showDetail(item)">详情</button>
                    <button class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button class="button is-danger is-small" @click="showDel(item)">删除</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <pagination ref="pages" :allItems="totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>

          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" :modalType="modalType" @ok="ok"></confirm>
          
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/Pagination';
import Search from './Search';
import Confirm from './Modal';
import { mapGetters, mapMutations } from 'vuex';
import { TableMixin } from 'base/mixin'

export default {

  mixins: [TableMixin],

  components: {
    Pagination,
    Search,
    Confirm
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
      modalType: 'zone-card',
    }
  },

  mounted(){
    //console.log(this.userPermission);
  },

  methods: {

    showDetail(item) {
      this.modalConfig = {
        detail: 1,
        title: '信息详情',
        footerShow: false,
      };
      this.setCurrentInformation(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //信息资料修改
    showModify(item) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
      };
      this.setCurrentInformation(item);
      this.modalType = 'zone-card';
      this.confirmShow = true;
    },

    //添加信息
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '新建信息',
        footerShow: true
      };
      this.setCurrentInformation({type: "1"});
      this.modalType = 'zone-card';
      this.confirmShow = true;
    },

    //删除信息
    showDel(item) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该信息吗？',
        footerShow: true
      };
      this.setCurrentInformation(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //操作面板确认操作
    ok() {
      console.log(222);
      this.$emit('ok');
    },

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentInformation : 'SET_CURRENTINFORMATION'
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
      informationList : 'informationData',
      currentInformation : 'information'
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
