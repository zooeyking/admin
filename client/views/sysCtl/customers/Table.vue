<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="pageHeader">
            
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>系统名称</th>
                <th>用户数量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in customers">
                <td>{{customer.sacName}}</td>
                <td>{{customer.count}}</td>
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
import { mapGetters } from 'vuex';

const PERNUM = 10;

export default {
  components: {
    Pagination,
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
    }
  },

  mounted(){
    
  },

  methods: {
    //分页当前页码
    getIndex(num) {
      this.$emit('paramsSearch', {pageNum: num});
      //this.currentIndex = num - 1;
      //console,log(this.currentIndex);
    },
  },

  watch: {

  },

  computed: {
    //当前页显示数据
    currentCustomers() {
      let arr = [];
      let listData = this.customers;
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
    ...mapGetters({customers : 'customerData'})
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
