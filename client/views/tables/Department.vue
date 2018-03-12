<template>
  <div>
    <user-table :tableConfig = "tableConfig"></user-table>
  </div>
</template>

<script>
import UserTable from 'components/common/table/Table'

import Confirm from 'views/components/modals/Modal'

import jsonp from 'tools/js/jsonp'
import axios from 'axios'

const PERNUM = 12


const options = {
  param: 'callback'
}


export default {
  components: {
    Confirm,
    UserTable
  },
  data () {
    return {
      isShow: false,
      currentIndex: 0,
      tableConfig: {
        tableName: 'department',
        tHeader: ['用户名', '姓名', '性别', '创建时间', '系统来源', '操作'],
        listData: []
      },
      allUsers: [
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true},
        {name: 'qing', role: 'admin', remark: 'constructor', lock: false, re: true, del: true}
      ]
    }
  },
  methods: {
    getIndex(num) {
      this.currentIndex = num-1
    },
    getUsersData() {
      let url = 'http://192.168.1.15:8091/sso_base_log/getLogJson'
      return jsonp(url, {pageNum:1,pageSize:2}, options)
      /*
      return axios.get(url,{}).then((res)=>{
        return res.data
      }).catch((err)=>{
        return err
      })*/
    }
  },
  mounted() {
    this.getUsersData().then((res)=>{
      console.log(res)
    })
    this.tableConfig.listData = this.allUsers
  },
  computed: {
    currentUsers() {
      let arr = [];
      if(this.allUsers.length <= PERNUM) {
        arr = this.allUsers;
        return arr;
      }else {
        let cut = this.currentIndex * PERNUM;
        for(let i=0; i < PERNUM; i++) {
          if(this.allUsers[i + cut]) {
            arr.push(this.allUsers[i + cut])
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

<style lang="scss">
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
