<template>
  <div>
    <system-table :tableConfig="tableConfig"  @addSystem="addSystem"></system-table>
    <my-message v-if="showMessage" @dispear="dispear" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import SystemTable from './system/Table'
import MyMessage from 'components/common/message/Message'

import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
//import axios from 'axios'
import { CommonParams, options, appSrcListUrl, systemListUrl, systemSaveUrl } from 'base/askUrl'
import { authority } from 'base/author'

export default {
  components: {
    SystemTable,
    MyMessage
  },
  data () {
    return {
      isShow: false,
      currentIndex: 0,
      showMessage: false,
      messageType: 0,
      tableConfig: {
        tableName: 'systems',
        listData: []
      }
    }
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },

    addSystem(newSystem) {
      let addParams = Object.assign({}, CommonParams, newSystem);
      console.log(addParams)
      jsonp(systemSaveUrl, addParams, options).then((res)=>{
        this.showMessage = true
        if(res.status == true){
          this.messageType = 0
          this._initDate()
        }else{
          this.messageType = 1
        }
      })
    },
    
    _getsystemsData(params) {
      let url = systemListUrl
      return jsonp(url, params, options)
    },

    _initDate() {
      let me = this; 
      this._getsystemsData(CommonParams).then((res)=>{
        if(res.status == true) {
          //console.log(res)
          let result = res.value.list;
          
          me.tableConfig.listData = result;
        }
      
      })
    }
  },

  created() {
    authority()
  },

  mounted() {
    this._initDate()
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
</style>
