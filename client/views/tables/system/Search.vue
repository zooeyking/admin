<template>
  <div class="search" v-if="searchConfig.flag">
    <ul class="content">
      <li v-if="searchConfig.userName" class="item text">
        <input class="input is-primary" v-model="params.userName" @keyup.enter="search" placeholder="用户名"/>
      </li>
      <li v-if="searchConfig.role" class="item text">
        <input class="input is-primary" v-model="params.id" @keyup.enter="search" placeholder="角色名"/>
      </li>
      <li v-if="searchConfig.optioner" class="item text">
        <input class="input is-primary" v-model="params.id" @keyup.enter="search" placeholder="操作人"/>
      </li>
      <li v-if="searchConfig.userRealName" class="item text">
        <input class="input is-primary" v-model="params.userRealName" @keyup.enter="search" placeholder="姓名"/>
      </li>
      <li v-if="searchConfig.sex" class="item sexBox">
        <div class="control is-horizontal">
          <div class="control">
            <div class="select is-fullwidth">
              <select  v-model="params.sex">
                <option value="men">男</option>
                <option value="women">女</option>
              </select>
            </div>
          </div>
        </div>
      </li>
      <li v-if="searchConfig.date" class="item dateBox">
        <datepicker @sendValue="setDateValue"></datepicker>
      </li>
      <li v-if="searchConfig.system" class="item systemBox">
        <div class="control is-horizontal">
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="params.system">
                <option value="windows">Windows</option>
                <option value="linux">LINUX</option>
                <option value="unix">UNIX</option>
                <option value="xenix">XENIX</option>
                <option value="netware">Netware</option>
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

const URL = 'http://192.168.1.80:8093/modular/sso_base_modular/saveDeptJson'

const options = {
  param: 'callback'
}

export default {
  components: {
    Datepicker
  },
  props: {
    url: {
      type: String,
      default: ''
    },
    searchConfig: {
      type: [Object, Array],
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      keyWords: "",
      result: "",
      params: {},
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