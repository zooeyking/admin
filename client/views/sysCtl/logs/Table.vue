<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch"></search>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>创建时间</th>
                <th>日志ID</th>
                <th>IP地址</th>
                <th>日志详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in logData">
                <td>{{log.createDate}}</td>
                <td>{{log.logId}}</td>
                <td>{{log.ipAddr}}</td>
                <td>{{log.logDetailInfo}}</td>
              </tr>
            </tbody>
          </table>
          <pagination :allItems="totalNum" @changeIndex="getIndex" :pernum="20"></pagination>
          
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

import { mapGetters, mapMutations } from 'vuex';
import jsonp from 'tools/js/jsonp';

const PERNUM = 10;

export default {
  components: {
    Pagination,
    Search,
    Loading
  },

  props: {
    //数据库数据总条数
    totalNum: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      isShow: false,
      currentIndex: 0,
      searchList: []
    }
  },

  mounted(){
    
  },

  methods: {
    
    //分页当前页码
    getIndex(num) {
      this.$emit('paramsSearch', {pageNum: num});
    },

    //搜索事件
    paramsSearch(params) {
      this.$emit('paramsSearch', params);
    }
    
  },
  watch: {
    
    logData(newVal) {
      //console.log(newVal)
    }

  },

  computed: {
    //当前页显示数据
    currentLogs() {
      let arr = [];
      let listData = this.logData;
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

    //vuex中引入日志所需数据
    ...mapGetters(['appList','logData'])
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
