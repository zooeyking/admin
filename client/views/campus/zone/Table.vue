<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <!--<button v-if="userPermission.campus_add" class="button is-primary"  @click="showAdd">添加校区</button>-->
            <button class="button is-primary"  @click="showAdd">添加校区</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>校区名称</th>
                <th>校区描述</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(zone, index) in zoneList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{zone.name}}</td>
                <td>{{zone.descp}}</td>
                <td>{{zone.createDate}}</td>
                
                <td>
                  <div class="optionWrapper">
                    <!--
                    <button v-if="userPermission.campus_detail" class="button is-primary is-small"  @click="showDetail(zone)">详情</button>
                    <button v-if="userPermission.campus_modify" class="button is-warning is-small"  @click="showModify(zone)">修改</button>
                    <button v-if="userPermission.campus_delete" class="button is-danger is-small" @click="showDel(zone)">删除</button>
                    -->
                    <button class="button is-primary is-small"  @click="showDetail(zone)">详情</button>
                    <button class="button is-warning is-small"  @click="showModify(zone)">修改</button>
                    <button class="button is-danger is-small" @click="showDel(zone)">删除</button>
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
import { TableMixin } from 'base/mixin';

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

    //校区详情
    showDetail(zone) {
      this.modalConfig = {
        detail: 1,
        title: '校区信息',
        footerShow: false,
        tabType: 'display',
        zoneInfo: zone
      };
      this.setCurrentZone(zone);
      this.$emit('getZoneInfo');
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //校区资料修改
    showModify(zone) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
        tabType: 'modify',
        zoneInfo: zone
      };
      this.setCurrentZone(zone);
      this.modalType = 'zone-card';
      this.confirmShow = true;
    },

    //添加校区
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加校区',
        footerShow: true
      };
      this.setCurrentZone({});
      this.modalType = 'zone-card';
      this.confirmShow = true;
    },

    //删除校区
    showDel(zone) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该校区吗？',
        footerShow: true,
        zoneInfo: zone
      };
      this.setCurrentZone(zone);
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

    //vuex引入设置用户方法
    ...mapMutations({
      setCurrentZone : 'SET_CURRENTZONE'
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
      zoneList : 'zoneData',
      currentZone : 'zone'
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
