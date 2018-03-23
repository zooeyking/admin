<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search @paramsSearch="paramsSearch" :appList="searchList"></search>
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
              <tr v-for="(log, index) in currentLogs">

                <td>{{log.createDate}}</td>
                <td>{{log.logId}}</td>
                <td>{{log.ipAddr}}</td>
                <td>{{log.logDetailInfo}}</td>

              </tr>
            </tbody>
          </table>
          <pagination :allItems = "tableData" @changeIndex="getIndex"></pagination>
          
          <div class="loadingWrapper" v-show="isShow">
            <loading></loading>
          </div>
          
        </article>
      </div>
    </div>
  </div>
</template>


<script>
import Pagination from 'components/common/pagination/Pagination'
import Loading from 'components/common/loading/Loading'
import Search from './Search'
//import Confirm from './Modal'

import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
import axios from 'axios'

const PERNUM = 10

const options = {
  param: 'callback'
}

export default {
  components: {
    Pagination,
    Search,
    Loading,
   // Confirm
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    confirmClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      searchList: [],
      modalConfig: {}
    }
  },
  mounted(){
    console.log(this.currentLogs)
   
  },

  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },

    showDetail(log) {
      this.modalConfig = {
        detail: 1,
        title: '用户详情',
        footerShow: false,
        logMessage: log
      }
      
      this.confirmShow = true
    },

    closeDetail() {
      this.confirmShow = false
    },

    paramsSearch(params) {
      this.$emit('paramsSearch', params)
    }
    
  },
  watch: {
    appList(newVal) {
      this.searchList = newVal
    }
  },

  computed: {
    currentLogs() {
      let arr = [];
      let listData = this.tableData;
      if(listData.length <= PERNUM) {
        arr = listData;
        return arr;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(listData[i + cut]) {
            arr.push(listData[i + cut])
          }else {
            break
          }
        }
        return arr;
      }
    },
    ...mapGetters(['appList'])
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
