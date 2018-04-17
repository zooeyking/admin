<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">

    <table class="table" v-if="modalConfig.add || modalConfig.addRoot">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">部门名称</strong></td><td class="rightCol"><input v-model="newPartment['dName']" type="text" maxlength="15" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><input v-model="newPartment['dRemark']" type="text" maxlength="50" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>

    <part-tabs ref="tabs" v-if="modalConfig.editUser" @userSearch="userSearch" :searchResult="searchResult"></part-tabs>

    <table v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>部门名称</strong></td><td class="rightCol">{{currentDepartmet.dName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>所属上级</strong></td><td class="rightCol">{{currentDepartmet.parentName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol">{{currentDepartmet.dRemark}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
  </card-modal>
</template>


<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';
import PartTabs from './Tabs';

export default {
  components: {
    CardModal,
    PartTabs
  },

  props: {
    visible: Boolean,
    modalConfig: Object
  },

  data () {
    return {
      newPartment: {
        parentId: '',
        dIndex: 0
      },
      infoShow: false,
      message: '',
      searchResult: [],
      searchUser: {},
      userList: []
    }
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.infoShow = false;
      this.newPartment = {
        parentId: '',
        dIndex: 0
      };
    },


    open () {
    
    },

    //确定操作
    ok () {
      let finnalPartment = {};
      if(this.modalConfig.add) {

        finnalPartment = Object.assign({}, this.newPartment);
        if(!finnalPartment.dName) {
          this.message = '部门名称不能为空!';
          this.infoShow = true;
          return;
        }

      }else if(this.modalConfig.del) {

        finnalPartment = Object.assign({}, this.currentDepartmet, {delFlag: 1});

      }else if(this.modalConfig.editUser) {

        let users = this.$refs.tabs.selectedUsers;
        let userIds = users.join();
        let optionType = this.$refs.tabs.optionType;
        finnalPartment = Object.assign({}, this.currentDepartmet, { userIds: userIds, optionType: optionType});

        if(finnalPartment.userIds == '') {
          this.$emit('close');
          this.infoShow = false;
          return;
        }

      }else {

        finnalPartment = this.newPartment;
        if(!finnalPartment.dName) {
          this.message = '部门名称不能为空!';
          this.infoShow = true;
          return;
        }
      }
      this.setCurrentDepartment(finnalPartment);
      this.$emit('ok');
    },

    //用户绑定界面搜索
    userSearch(user) {
      let optionType = this.$refs.tabs.optionType;
      console.log(optionType);
      let typeUser = Object.assign({}, user, { optionType: optionType});
      this.$emit('userSearch', typeUser);
    },

    //vuex引入设置当前部门方法
    ...mapMutations({
      setCurrentDepartment : 'SET_SYS_CURRENTDEPARTMENT'
    })
  },

  computed: {

    //vuex引入部门数据
    ...mapGetters({
      departments : 'departmentData',
      currentDepartmet : 'department'
    })
  },

  mounted() {
    
  },

  watch: {
    'modalConfig': {
      handler: function(newVal){
        if(newVal.add) {
          this.newPartment.parentName = this.currentDepartmet.dName;
          this.newPartment.parentId = this.currentDepartmet.dId;
          this.newPartment.dIndex = this.currentDepartmet.dIndex + 1;
        }

        if(newVal.searchResult) {
          this.searchResult = newVal.searchResult;
        }

        if(newVal.userList) {
          this.userList = newVal.userList;
        }
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.leftCol {
  width: 20%
}
.is-must {
  color: red
}
.rightCol {
  width: 70%
}
.myHeader {
  display: block !important
}
.search {
  display: flex
}
.search .content {
  margin-right: 20px
}
.addUser {
  margin-bottom: 2rem
}
.userBtn {
  margin-right: 20px;
  margin-bottom: 20px
}
.binded {
  font-size: 1rem;
  padding-bottom: 20px;
}
</style>
