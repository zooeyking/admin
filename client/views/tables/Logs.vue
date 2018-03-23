<template>
  <div>
    <logs-table :tableData="tableData" @paramsSearch="search" ></logs-table>
    <my-message v-if="showMessage" :messageType="messageType"></my-message>
  </div>
</template>

<script>
import LogsTable from './logs/Table'
import MyMessage from 'components/common/message/Message'
import systemModule from 'vuex-store/modules/systemControl'


import { mapGetters, mapMutations } from 'vuex'
import jsonp from 'tools/js/jsonp'
import { authority } from 'base/author'
import { CommonParams, options, appSrcListUrl, logListUrl } from 'base/askUrl'

export default {
  components: {
    LogsTable,
    MyMessage
  },
  data () {
    return {
      isShow: false,
      currentIndex: 0,
      showMessage: false,
      messageType: 0,
      tableData: []
    }
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },

    search(params) {
      let searchParams = Object.assign({}, CommonParams, params);
      jsonp(logListUrl, searchParams, options).then((res)=>{
        this.showMessage = true
        if(res.status == true){
          this.messageType = 0
          this.tableData = res.value.list
        }else{
          this.messageType = 1
        }
      })
    },

    //获取系统下拉数据
    _getAppList(params) {
      let url = appSrcListUrl
      
      return jsonp(url, params, options)
    },

    //获取日志列表数据
    _getLogsData(params) {
      let url = logListUrl
      return jsonp(url, params, options)
    },

    //初始化数据
    _initDate() {
      let me = this; 
      this._getLogsData(CommonParams).then((res)=>{
        let result = res.value.list;
        me.tableData = result;
      }).then(()=>{
        this._initAppList()
      })
    },

    //系统列表数据存储
    _initAppList() {
      let me = this; 
      this._getAppList(CommonParams).then((res)=>{
        me.setAppList(res.value)
      })
    },

    //vuex引入系统列表数据存储方法
    ...mapMutations(
      { 
        setAppList : 'SET_SYS_APPSRCLIST'
      }
    )
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
