<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            <search :searchConfig="searchConfig"></search>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th v-for="item in tableConfig.tHeader">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in currentUsers">
                <td>
                  <input type="checkbox">
                </td>
                <td v-for="(k,v,index) in user" v-if="index + 1 < tableConfig.tHeader.length">{{k}}</td>
                
                <td>
                  <div class="optionWrapper">
                    <button class="button is-primary is-small" v-show="user.re" @click="showDetail(user)">详情</button>
                    <button class="button is-danger is-small" v-show="user.del" @click="showModify(user)">修改</button>
                    <button class="button is-danger is-small" v-show="user.del">删除</button>
                    <my-switch @toggle="toggle"></my-switch>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :allItems = "tableConfig.listData" @changeIndex="getIndex"></pagination>
          <div class="loadingWrapper" v-show="isShow">
            <loading></loading>
          </div>
          <confirm :visible="confirmShow" @close="closeDetail" :modalConfig="modalConfig"></confirm>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/Pagination'
import Search from 'components/common/search/Search'
import Loading from 'components/common/loading/Loading'
import Confirm from 'components/common/modal/Modal'
import MySwitch from 'components/common/MySwitch/MySwitch'

import jsonp from 'tools/js/jsonp'
import axios from 'axios'

const PERNUM = 12

const options = {
  param: 'callback'
}

export default {
  components: {
    Pagination,
    Search,
    Loading,
    Confirm,
    MySwitch
  },
  props: {
    tableConfig: {
      type: Object,
      dafault: {}
    }
  },
  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      searchConfig: [],
      modalConfig: {}
    }
  },
  mounted(){
    //搜索组件配置
    this._setConfig(this.tableConfig)
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    toggle(val) {
      console.log(val)
    },
    showDetail(user) {
      this.modalConfig = {
        title: '用户详情',
        footerShow: false,
        userMessage: user
      }
      
      this.confirmShow = true
    },
    showModify(user) {
      this.modalConfig = {
        title: '用户详情',
        footerShow: true,
        userMessage: user
      }

      this.confirmShow = true
    },
    closeDetail() {
      this.confirmShow = false
    },
    _setConfig(obj) {
      switch(obj.tableName){
        case 'users':
          this.searchConfig = {id:'用户名', userName:'姓名', sex:'性别', date:'选择时间段', system:'操作系统'};
          break;
        case 'role':
          this.searchConfig = {id:'用户名', system:'操作系统'};
          break;
        case 'logs':
          this.searchConfig = {id:'用户名', date:'选择时间段', system:'操作系统'};
          break;
        default:
          this.searchConfig = {}
      }
    }
  },
  computed: {
    currentUsers() {
      let arr = [];
      let listData = this.tableConfig.listData;
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
    }
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
