<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <button v-if="userPermission.power_add" class="button is-primary"  @click="showAddRoot">添加根权限</button>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>权限名称</th>
                <th>继承上级</th>
                <th>类别</th>
                <th>权限标识</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(power, index) in powers">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{power.operateName}}</td>
                <td>{{power.parentOperateName || '' }}</td>
                <td>{{power.operateType}}</td>
                <td>{{power.operateText}}</td>

                <td>
                  <div class="optionWrapper">
                    <button v-if="userPermission.power_add" class="button is-warning is-small"  @click="showAdd(power)">添加子权限</button>
                    <button v-if="userPermission.power_delete" v-show="power.childCount == 0" class="button is-danger is-small" @click="showDel(power)">删除</button>
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
import Confirm from './Modal';
import Search from './Search';
import { mapGetters, mapMutations } from 'vuex';
import { ButtonMixin } from 'base/mixin';

//每页显示的数量
const PERNUM = 20;

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
      newPartment: {
        parentId: '',
        dIndex: 0
      },
      modalConfig: {},
    }
  },

  mounted(){
    
  },

  methods: {

    //添加跟权限
    showAddRoot() {
      this.modalConfig = {
        addRoot: 1,
        title: '添加跟权限',
        footerShow: true,
        searchResult: []
      };
      this.confirmShow = true;
    },

    //添加子权限
    showAdd(power) {
      this.modalConfig = {
        add: 1,
        title: '添加子权限',
        footerShow: true
      };
      this.setCurrentPower(power);
      this.confirmShow = true;
    },

    //删除权限
    showDel(power) {
      this.modalConfig = {
        del: 1,
        title: '确认删除该权限吗？',
        footerShow: true
      };
      this.setCurrentPower(power);
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

    //vuex引入设置当前所选权限方法
    ...mapMutations({
      setCurrentPower : 'SET_SYS_CURRENTPOWER'
    })
  },

  watch: {
    //监听操作面板关闭/开启
    confirmClose() {
      this.confirmShow = false;
    }
  },

  computed: {
    //当前页面显示数据
    currentUsers() {
      let arr = [];
      let listData = this.userList;
      if(listData.length <= PERNUM) {
        arr = listData;
        return arr;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(listData[i + cut]) {
            arr.push(listData[i + cut]);
          }else {
            break;
          }
        }
        return arr;
      }
    },

    //vuex引入用户数据
    ...mapGetters({
      appList : 'appList',
      powers : 'powerData',
      currentPower : 'power'
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
