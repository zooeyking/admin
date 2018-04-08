<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <tabs type="boxed" @tab-selected="tabRole">
          <tab-pane label="添加用户">
            <div class="pageHeader myHeader">
              <div class="search content">
                <input class="input is-primary" @keyup.enter="search" v-model="searchUser['userName']" placeholder="用户名"/>
                <span class="button is-primary searchBtn" @click="search"><i class="fa fa-search"></i></span>
                <span v-if="pagesShow" class="button is-warning searchBtn" @click="checkAll">全选</span>
              </div>
              <div class="addUser" v-if="typeof userList == 'object'">
                <ul class="result-box">
                  <li class="useritem" v-for="item in userList">
                    <p class="control">
                      <label class="checkbox">
                        <input type="checkbox" :value="item.userId" v-model="selectedUsers">{{item.userName}}
                      </label>
                    </p>
                  </li>
                </ul>
                <pagination v-if="pagesShow" :allItems="searchResult.total" @changeIndex="getIndex" :pernum="20"></pagination>
              </div>
              <div class="addUser" v-if="typeof userList == 'string'">
                {{ userList }}
              </div>
            </div>
          </tab-pane>  
          <tab-pane label="删除用户">
            <div class="pageHeader myHeader">
              <div class="search content">
                <input class="input is-primary" @keyup.enter="search" v-model="searchUser['userName']" placeholder="用户名"/>
                <span class="button is-primary searchBtn" @click="search"><i class="fa fa-search"></i></span>
                <span v-if="pagesShow" class="button is-warning searchBtn" @click="checkAll">全选</span>
              </div>
              <div class="addUser" v-if="typeof userList == 'object'">
                <ul class="result-box">
                  <li class="useritem" v-for="item in userList">
                    <p class="control">
                      <label class="checkbox">
                        <input type="checkbox" :value="item.userId" v-model="selectedUsers">{{item.userName}}
                      </label>
                    </p>
                  </li>
                </ul>
                <pagination v-if="pagesShow" :allItems="searchResult.total" @changeIndex="getIndex" :pernum="20"></pagination>
              </div>
              <div class="addUser" v-if="typeof userList == 'string'">
                {{ userList }}
              </div>
            </div>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/Pagination';
import { Tabs, TabPane } from 'vue-bulma-tabs';
import { mapGetters } from 'vuex';

export default {
  components: {
    Tabs,
    TabPane,
    Pagination
  },

  props: {

    searchResult: [Object, Array, String]
  },

  data () {
    return {
      userList: [],
      optionType: 0,
      selectedUsers: [],
      searchUser: {
        pageNum: 1
      }
    }
  },

  mounted () {
    //console.log(this.userRoleInfo)
  },

  watch: {
    
    'searchResult' : {
      handler (val) {
        console.log(val);
        if(typeof val != 'string') {
          this.userList = val.list.slice();
          this.userList.forEach((item)=>{
            item.checked = false;
          })
        }else{
          this.userList = val;
        }
        
      },
      deep: true
    },

    optionType() {
      if(typeof this.searchResult != 'string') {
        this.userList = [];
      }else{
        this.userList = '';
      }
    }
    
  },

  methods: {

    //全选
    checkAll() {
      if(typeof this.searchResult != 'string') {
        this.userList.forEach((item)=>{
          if(!this.selectedUsers.includes(item.userId)){
            this.selectedUsers.push(item.userId);
          }
        })
      }
    },

    //用户绑定界面搜索
    search() {
      this.$emit('userSearch', this.searchUser);
    },

    //用户绑定界面下一页
    getIndex(num) {
      this.searchUser.pageNum = num;
      this.$emit('userSearch', this.searchUser);
      //this.currentIndex = num - 1;
      //console,log(this.currentIndex);
    },

    //用户绑定界面下一页
    getIndex(num) {
      this.searchUser.pageNum = num;
      this.$emit('userSearch', this.searchUser);
      //this.currentIndex = num - 1;
      //console,log(this.currentIndex);
    },

    tabRole(index) {
      //this.selectedUsers.optionType = index;
      this.optionType = index; 
    }
  },

  computed: {
    //分页显示
    pagesShow() {
      return (this.userList && this.userList.length>0) ? true : false;
    },

    ...mapGetters({
      currentUser : 'user',
      userRoleInfo : 'userRoleList',
      userDeptInfo : 'userDepartmentList'
    }) 
  }
}
</script>

<style lang="scss">
.tabs {
  margin: 30px;
  .tab-content {
    min-height: 50px;
  }
}

.search {
  display: flex;
}

.searchBtn {
  margin-left: 20px;

}

.result-box {
  display: flex;
  flex-wrap: wrap;
}

.myHeader {
  display: block !important;
}

.myHeader .useritem {
  width: 24%;
  margin-bottom: 5px;
}

.addUser {
  margin-bottom: 2rem
}

</style>
