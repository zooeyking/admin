<template>
  <div class="search">
    <ul class="content">
      
      <li class="item systemBox">
        <div class="control is-horizontal">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="params.sacId">
                <option value="" >全部</option>
                <option v-for="item in appList" :value="item.sacId" >{{item.sacName}}</option>
              </select>
            </div>
          </div>
        </div>
      </li>

      <li class="item dateBox">
        <datepicker @sendValue="setDateValue"></datepicker>
      </li>
      
    </ul>
    <span class="button is-primary" @click="search"><i class="fa fa-search"></i></span>
  </div>
</template>

<script>
import Datepicker from 'components/common/datepicker/Datepicker';
import { mapGetters } from 'vuex';

export default {
  components: {
    Datepicker
  },
  
  data() {
    return {
      params: {
        sacId: "",
        pageNum: 1
      }
    }
  },

  computed: {
    //vuex中引入所需数据
    ...mapGetters(['appList'])
  },

  methods: {
    //搜索发出搜索参数
    search() {
      this.$emit('paramsSearch', this.params);
    },

    //得到开始结束时间
    setDateValue(val) {
      this.params.startDate = val.substr(0,10);
      this.params.endDate = val.substr(-10,10);
    }
  }
}
</script>

<style scoped>
.search, .content{
  display: flex;
}
.search {
  width: 100%;
}
.content {
  width: auto;
}
.item {
  margin-right: 10px;
  margin-top: 0;
}
.text {
  min-width: 100px;
}
.sexBox {
  min-width: 80px;
}
.dateBox {
  min-width: 190px;
}
.systemBox {
  min-width: 120px;
}
</style>