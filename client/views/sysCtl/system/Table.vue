<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
            <button v-if="userPermission.system_add" permitno='addsystem' class="button is-primary"  @click="showAdd">添加系统</button>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>序号</th>
                <th>系统名称</th>
                <th>系统Key</th>
                <th>有效时间</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(system, index) in systems">
                <td>{{ pernum*currentPage+index+1 }}</td>
                <td>{{system.sacName}}</td>
                <td>{{system.sacKey}}</td>
                <td>{{system.sacLnvalidTime}}</td>
                <td>{{system.createDate}}</td>
              </tr>
            </tbody>
          </table>

          <pagination ref="pages" :allItems = "totalNum" @changeIndex="getIndex" :pernum="pernum"></pagination>

          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig" @ok="ok" ></confirm>
          
          <div class="loadingWrapper" v-show="isShow">
            <loading></loading>
          </div>
          
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
import { ButtonMixin } from 'base/mixin';

export default {

  mixins: [ButtonMixin],

  components: {
    Pagination,
    Loading,
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
      newSystem: {},
      modalConfig: {}
    }
  },

  mounted(){
    
  },

  methods: {

    //添加系统
    showAdd() {
      this.modalConfig = {
        add: 1,
        title: '添加系统',
        footerShow: true
      };
      this.confirmShow = true;
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //操作面板确认操作
    ok(newSystem) {
      this.$emit('addSystem', newSystem);
    },
    
    //当前页列表数据
    __getCurrentSystems(orignArr) {
      let arr = [];
      if(orignArr.length <= PERNUM) {
        arr = orignArr;
        return arr;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(orignArr[i + cut]) {
            arr.push(orignArr[i + cut]);
          }else {
            break;
          }
        }
        return arr;
      }
    }
  },

  watch: {
    //监听操作面板关闭/开启
    confirmClose() {
      this.confirmShow = false;
    }
  },

  computed: {
    //vuex中引入系统配置列表数据
    ...mapGetters({
      systems : 'systemData'
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

.addParams {
  display: flex;
  justify-content: space-between;
}

.addParams li {
  display: flex;
  margin-right: 20px;
  justify-content: space-start;
}
.addParams li .textBox {
  margin-left: 10px;
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
