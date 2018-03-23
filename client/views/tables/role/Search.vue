<template>
  <div class="search">
    <ul class="content">
      
      <li class="item text">
        <input class="input is-primary" v-model="params.roleName" @keyup.enter="search" placeholder="角色名"/>
      </li>
      
      <li class="item systemBox">
        <div class="control is-horizontal">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="params.system">
                <option value="" >全部</option>
                <option v-for="item in appList" :value="item.sacId" >{{item.sacName}}</option>
              </select>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <span class="button is-primary" @click="search"><i class="fa fa-search"></i></span>
  </div>
</template>

<script>
import jsonp from 'tools/js/jsonp'

import Datepicker from 'components/common/datepicker/Datepicker'

const options = {
  param: 'callback'
}

export default {
  components: {
    Datepicker
  },
  props: {
    appList: {
      type: [Array, Object],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      keyWords: "",
      result: "",
      params: {
        system: ''
      },
    }
  },
  methods: {
    search() {
      this.$emit('paramsSearch', this.params)
    },
    getResult() {
      let url = this.url + '?' + this.keyWorld;
      return jsonp(url, {}, options);
    },
    setDateValue(val) {
      this.params.startDate = val.substr(0,10)
      this.params.endDate = val.substr(-10,10)
    }
  },
  watch: {
    
    /*
    appList(newVal) {
      this.params.system = newVal[0].sacId
    }
    ...mapGetters({
      'appList' :
    })
    */
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