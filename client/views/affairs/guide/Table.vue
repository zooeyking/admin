<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <!--<button v-if="userPermission.user_add" class="button is-primary"  @click="showAdd">添加引导</button>-->
            <button class="button is-primary"  @click="showAdd">添加引导</button>
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
              <tr v-for="(item, index) in guideList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{item.name}}</td>
                <td>{{item.info}}</td>
                <td>{{item.createDate}}</td>
                
                <td>
                  <div class="optionWrapper">
                    <!--
                    <button v-if="userPermission.guide_detail" class="button is-primary is-small"  @click="showDetail(item)">查看详情</button>
                    <button v-if="userPermission.guide_config" class="button is-primary is-small"  @click="showConfig(item)">配置信息</button>
                    <button v-if="userPermission.guide_modify" class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button v-if="userPermission.guide_delete" class="button is-danger is-small" @click="showDel(item)">删除</button>
                    -->
                    <button class="button is-primary is-small"  @click="showDetail(item)">查看详情</button>
                    <button class="button is-primary is-small"  @click="showConfig(item)">配置信息</button>
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

    //查看详情
    showDetail(item) {
      this.modalConfig = {
        detail: 1,
        title: '详细信息',
        footerShow: false,
        tabType: 'display',
      };
      this.setCurrentGuide(item);
      this.$emit('getLinkInfo');
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //关联信息
    showConfig(item) {
      this.modalConfig = {
        config: 1,
        title: '配置信息',
        footerShow: false,
        tabType: 'modify',
      };
      this.setCurrentGuide(item);
      this.$emit('getLinkInfo');
      this.$emit('getUnLinkInfo');
      this.$emit('getInfoType');
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //引导修改
    showModify(item) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
        tabType: 'modify',
      };
      this.setCurrentGuide(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //添加分类
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加引导',
        footerShow: true,
        tabType: 'modify',
      };
      this.setCurrentGuide({});
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //删除分类
    showDel(item) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该引导吗？',
        footerShow: true,
      };
      this.setCurrentGuide(item);
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

    //vuex引入设置引导方法
    ...mapMutations({
      setCurrentGuide : 'SET_CURRENTGUIDE'
    })
  },

  watch: {

    //监听操作面板关闭/开启
    confirmClose() {
      this.confirmShow = false;
    }
  },

  computed: {

    //vuex引入引导数据
    ...mapGetters({
      guideList : 'guideData',
      currentGuide : 'guide'
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
