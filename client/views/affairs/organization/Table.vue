<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <!--<button v-if="userPermission.organization_add" class="button is-primary"  @click="showAdd">添加机构组</button>-->
            <button class="button is-primary"  @click="showAdd">添加机构组</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>名称</th>
                <th>描述</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in organizationList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{item.name}}</td>
                <td>{{item.info}}</td>
                <td>{{item.createDate}}</td>
                
                <td>
                  <div class="optionWrapper">
                    <!--
                    <button v-if="userPermission.organization_bind" class="button is-primary is-small"  @click="showBind(item)">关联校区</button>
                    <button v-if="userPermission.organization_modify" class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button v-if="userPermission.organization_delete" class="button is-danger is-small" @click="showDel(item)">删除</button>
                    -->
                    <button class="button is-primary is-small"  @click="showBind(item)">关联校区</button>
                    <button class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button class="button is-danger is-small" @click="showDel(item)">删除</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <pagination ref="pages" :allItems="totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>

          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" :modalType="modalType" @bind="bind" @unBind="unBind" @ok="ok"></confirm>
          
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
      confirmShow: false,
      modalConfig: {},
      modalType: '',
    }
  },

  mounted(){
    //console.log(this.userPermission);
  },

  methods: {

    //关联校区
    showBind(item) {
      this.modalConfig = {
        bind: 1,
        title: '关联校区',
      };
      this.setCurrentOrganization(item);
      this.$emit('getZone');
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //机构组修改
    showModify(item) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
        tabType: 'modify',
      };
      this.setCurrentOrganization(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //添加机构组
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加机构组',
        footerShow: true
      };
      this.setCurrentOrganization({});
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //删除机构组
    showDel(item) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该机构组吗？',
        footerShow: true,
      };
      this.setCurrentOrganization(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //操作面板确认操作
    ok() {
      this.$emit('ok');
    },

    //绑定校区
    bind() {
      this.$emit('bind');
    },

    //解除绑定
    unBind() {
      this.$emit('unBind');
    },

    //vuex引入设置机构组方法
    ...mapMutations({
      setCurrentOrganization : 'SET_CURRENTORGANIZATION',
    })
  },

  watch: {

    //监听操作面板关闭/开启
    confirmClose() {
      this.confirmShow = false;
    }
  },

  computed: {

    //vuex引入机构组数据
    ...mapGetters({
      organizationList : 'organizationData',
      currentOrganization : 'organization'
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
