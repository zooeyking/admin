<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader partmentHeader">
            <ul class="addParams">
              <li>
                <h3 class="subtitle is-5"><strong>新系统名称 :</strong></h3>
                <p class="control textBox"><input type="text"  v-model="newSystem['sacName']" class="input is-primary is-small"></p>
              </li>
              <li>
                <h3 class="subtitle is-5"><strong>有效时间 :</strong></h3>
                <p class="control textBox"><input type="text"  v-model="newSystem['sacLnvalidTime']" class="input is-primary is-small"></p>
              </li>
              <li>
                <h3 class="subtitle is-5"><strong>服务器地址 :</strong></h3>
                <p class="control textBox"><input type="text"  v-model="newSystem['serviceUrl']" class="input is-primary is-small"></p>
              </li>
            </ul>
            <button class="button is-primary is-small"  @click="add">添加系统</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>系统名称</th>
                <th>系统Key</th>
                <th>有效时间</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(system, index) in currentSystems">
                <td>{{system.sacName}}</td>
                <td>{{system.sacKey}}</td>
                <td>{{system.sacLnvalidTime}}</td>
                <td>{{system.createDate}}</td>
              </tr>
            </tbody>
          </table>
          <pagination :allItems = "tableConfig.listData" @changeIndex="getIndex"></pagination>
          
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
    Loading
  },
  props: {
    tableConfig: {
      type: Object,
      dafault: {}
    },
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      searchConfig: [],
      modalConfig: {},
      newSystem: {},
      currentSystems: []
    }
  },
  mounted(){

  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    enableUpdate(system) {
      this.$emit('enableUpdate', system)
    },
    add() {
      this.$emit('addSystem', this.newSystem)
    },
    
    
    
    
    closeDetail() {
      this.confirmShow = false
    },
    paramsSearch(params) {
      this.$emit('paramsSearch', params)
    },
    ok(data) {
      if(data.delFlag == '1') {
        this._del(data, data.index)
      }
      this.$emit('ok', data)
    },
    _del(system,index) {
      this.$emit('delsystem', system),
      this.currentSystems.splice(index, 1)
    },
    _getCurrentSystems(orignArr) {
      let arr = [];
      if(orignArr.length <= PERNUM) {
        arr = orignArr;
        return arr;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(orignArr[i + cut]) {
            arr.push(orignArr[i + cut])
          }else {
            break
          }
        }
        return arr;
      }
    },
    ...mapMutations({
      setSyssystem: 'SET_SYS_system'
    })
  },
  watch: {
    'tableConfig' : {
      handler(newVal) {

        this.currentSystems = this._getCurrentSystems(newVal.listData)
        console.log(this.currentSystems)
      },
      deep: true
    }
  },
  computed: {
    
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
