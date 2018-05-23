<template>
  <div class="search">
    <ul class="content">
      <li class="item text">
        <div class="control is-horizontal">
          <div class="control">
            <div class="select is-fullwidth">
              <select class="is-must" v-model="params.cid">
                <option value="" >全部校区</option>
                <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </li>
      <li class="item text">
        <div class="control is-horizontal">
          <div class="control">
            <div class="select is-fullwidth">
              <select class="is-must" v-model="params.acid">
                <option value="" >全部种类</option>
                <option v-for="item in typeList" :value="item.id" >{{item.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </li>
      <li class="item text">
        <input class="input is-primary" v-model="params.name" @keyup.enter="search" maxlength="30" placeholder="建筑名称"/>
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
        pageNum: 1,
        cid:'',
        acid:''
      },
    }
  },

  methods: {

    //搜索事件
    search() {
      this.$emit('paramsSearch', this.params);
    },
    
    //搜索时间设置
    setDateValue(val) {
      this.params.startDate = val.substr(0,10);
      this.params.endDate = val.substr(-10,10);
    },
  },

  mounted() {
    
  },

  watch: {

    'typeList' : {
      deep: true,
      handler(newVal) {
        
      }
    }
  },

  //vuex中引入用户数据
  computed: {
    ...mapGetters({
      zoneList : 'zoneData',
      typeList : 'buildingTypeData',
    })
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