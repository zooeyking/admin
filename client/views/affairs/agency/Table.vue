<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <!--<button v-if="userPermission.agency_add" class="button is-primary"  @click="showAdd">添加机构</button>-->
            <button class="button is-primary" @click="showAdd">添加机构</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>名称</th>
                <th>所属建筑</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              
              <tr v-for="(item, index) in agencyList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{item.name}}</td>
                <td>{{item.architeEntity.name}}</td>
                <td>{{item.createDate}}</td>
                <td>
                  <div class="optionWrapper">
                    <!--
                    <button v-if="userPermission.agency_modify" class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button v-if="userPermission.agency_delete" class="button is-danger is-small" @click="showDel(item)">删除</button>
                    -->
                    <button class="button is-warning is-small"  @click.stop="showModify(item)">修改</button>
                    <button class="button is-danger is-small" @click.stop="showDel(item)">删除</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <pagination ref="pages" :allItems="totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>

          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" :modalType="modalType"></confirm>
          
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/Pagination';
import Search from './Search';
import Confirm from './Modal';
import AgencyTabs from './Tabs';
import Bus from 'base/bus';
import { mapGetters, mapMutations } from 'vuex';
import { TableMixin } from 'base/mixin'

export default {

  mixins: [TableMixin],

  components: {
    Pagination,
    Search,
    Confirm,
    AgencyTabs
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
      pernum: 10,
      confirmShow: false,
      modalConfig: {},
      modalType: '',
    }
  },

  mounted(){
    //console.log(this.userPermission);
  },

  methods: {

    //条件搜索
    paramsSearch(params) {
      Bus.$emit('searchAgencys', params);
    },

    //分页查询
    getIndex(index) {
      Bus.$emit('getAgencys', index);
    },

    //资料修改
    showModify(item) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
      };
      Bus.$emit('getBuildings');
      this.setCurrentAgency(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //添加机构
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加机构',
        footerShow: true
      };
      Bus.$emit('getBuildings');
      this.setCurrentAgency({});
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //删除机构
    showDel(item) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该机构吗？',
        footerShow: true
      };
      this.setCurrentAgency(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //vuex引入设置机构方法
    ...mapMutations({
      setCurrentAgency : 'SET_CURRENTAGENCY'
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
      agencyList : 'agencyData',
      currentAgency : 'agency'
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
