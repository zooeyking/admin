<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <!--<button v-if="userPermission.user_add" class="button is-primary"  @click="showAdd">添加用户</button>-->
            <button class="button is-primary"  @click="showAdd">添加活动</button>
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
              <tr v-for="(item, index) in partyList">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{item.name}}</td>
                <td>{{item.info}}</td>
                <td>{{item.createDate}}</td>
                
                <td>
                  <div class="optionWrapper">
                    <!--
                    <button v-if="userPermission.user_modify" class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button v-if="userPermission.user_delete" class="button is-danger is-small" @click="showDel(item)">删除</button>
                    -->
                    <button class="button is-primary is-small"  @click="showDetail(item)">查看详情</button>
                    <button class="button is-primary is-small"  @click="showProcess(item)">引导配置</button>
                    <button class="button is-warning is-small"  @click="showModify(item)">修改</button>
                    <button class="button is-danger is-small" @click="showDel(item)">删除</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <pagination ref="pages" :allItems="totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>

          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" :modalType="modalType" @upimg="upimg" @ok="ok"></confirm>
          
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
      modalType: '',
      partyList1: [
        {name: 111},
        {name: 111},
        {name: 111},
        {name: 111},
      ]
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
        title: '详细资料',
        tabType: 'display',
      };
      this.setCurrentParty(item);
      this.$emit('getLinkGuide');
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //配置引导
    showProcess(item) {
      this.modalConfig = {
        process: 1,
        title: '配置引导项',
        tabType: 'modify',
        footerShow: false,
      };
      this.setCurrentParty(item);
      this.$emit('getLinkGuide');
      this.$emit('getUnLinkGuide');
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //活动信息修改
    showModify(item) {
      this.modalConfig = {
        modify: 1,
        title: '资料修改',
        footerShow: true,
      };
      this.setCurrentParty(item);
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //添加活动
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加活动',
        footerShow: true,
      };
      this.setCurrentParty({});
      this.modalType = 'modal-card';
      this.confirmShow = true;
    },

    //删除活动
    showDel(item) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该活动吗？',
        footerShow: true,
      };
      this.setCurrentParty(item);
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

    //绑定引导
    bind() {
      this.$emit('bind');
    },

    //解除引导
    unBind() {
      this.$emit('unBind');
    },

    //上传图片
    upimg(file) {
      this.$emit('upimg', file);
    },

    //vuex引入设置机构组方法
    ...mapMutations({
      setCurrentParty : 'SET_CURRENTPARTY',
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
      partyList : 'partyData',
      currentParty : 'party'
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
