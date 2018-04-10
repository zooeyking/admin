<template>
  <div class="search">
    <ul class="content">
      <li class="item systemBox">
        <div class="control is-horizontal">
          <div class="control">
            <!--<h3 class="subtitle is-5"><strong>系统来源 :</strong></h3>-->
            <div class="select is-fullwidth">
              <select class="is-must" v-model="params.sacId">
                <option class="is-must" value="" >系统来源(必选)</option>
                <option v-for="item in appList" :value="item.sacId" >{{item.sacName}}</option>
              </select>
            </div>
          </div>
        </div>
      </li>

      <li class="item text">
        <input class="input is-primary" v-model="params.operateLikeName" @keyup.enter="search" placeholder="权限名称"/>
      </li>
      
    </ul>
    <span class="button is-primary" @click="search"><i class="fa fa-search"></i></span>
  </div>
</template>

<script>
//日期选择模块
import Datepicker from 'components/common/datepicker/Datepicker';
import { mapGetters } from 'vuex';

export default {
  components: {
    Datepicker
  },

  data() {
    return {
      params: {
        sacId: '',
        pageNum: 1
      },
    }
  },

  computed: {
    //vuex中引入所需数据
    ...mapGetters(['appList'])
  },

  methods: {
    //搜索事件
    search() {
      this.$emit('paramsSearch', this.params);
    },

    //搜索时间参数设置
    setDateValue(val) {
      this.params.startDate = val.substr(0,10);
      this.params.endDate = val.substr(-10,10);
    }
  },

  watch: {}
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
.is-must {
  color: red;
}
</style>