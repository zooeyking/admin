<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    
    <table class="table" v-if="modalConfig.addRoot">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">权限名称</strong></td><td class="rightCol"><input v-model="newPower['operateName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">权限标识</strong></td><td class="rightCol"><input v-model="newPower['operateText']" type="text" class="input is-primary"></td>
        </tr>

        <tr>
          <td class="leftCol"><strong class="is-must">所属类别</strong></td>
          <td class="rightCol">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newPower['operateType']">
                  <option value="module" >模块</option>
                  <option value="function" >功能</option>
                  <option value="button" >按钮</option>
                </select>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td class="leftCol"><strong class="is-must">系统来源</strong></td>
          <td class="rightCol">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newPower['sacId']">
                  <option v-for="item in appList" :value="item.sacId" >{{item.sacName}}</option>
                </select>
              </div>
            </div>
          </td>
        </tr>

      </tbody>
    </table>

    <table class="table" v-if="modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">权限名称</strong></td><td class="rightCol"><input v-model="newPower['operateName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">权限标识</strong></td><td class="rightCol"><input v-model="newPower['operateText']" type="text" class="input is-primary"></td>
        </tr>

        <tr>
          <td class="leftCol"><strong class="is-must">所属类别</strong></td>
          <td class="rightCol">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newPower['operateType']">
                  <option value="module" >模块</option>
                  <option value="function" >功能</option>
                  <option value="button" >按钮</option>
                </select>
              </div>
            </div>
          </td>
        </tr>

      </tbody>
    </table>

    <table v-if="modalConfig.del">
      <tbody>
        <tr>
          <td class="leftCol"><strong>权限名称</strong></td><td class="rightCol">{{currentPower.operateName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>继承上级</strong></td><td class="rightCol">{{currentPower.parentName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>权限标识</strong></td><td class="rightCol">{{currentPower.operateText}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>所属类别</strong></td><td class="rightCol">{{currentPower.operateType}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>系统来源</strong></td><td class="rightCol">{{currentPower.sacName}}</td>
        </tr>
      </tbody>
    </table>
  </card-modal>
</template>


<script>
import { CardModal } from 'vue-bulma-modal';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    CardModal
  },

  props: {
    visible: Boolean,
    modalConfig: Object
  },

  data () {
    return {
      newPower: {
        operateIndex : 0,
        sacId: this.appList != undefined ? this.appList[0]['sacId'] : ''
      }
    }
  },

  methods: {

    //取消操作
    cancel () {
      this.$emit('close');
      this.newPower = {
        operateIndex : 0,
        sacId: this.appList != undefined ? this.appList[0]['sacId'] : ''
      };
    },


    open () {
    
    },

    //关闭操作面板
    close () {
      this.$emit('close');
      this.newPower = {
        operateIndex : 0,
        sacId: this.appList != undefined ? this.appList[0]['sacId'] : ''
      };
    },

    //确定操作
    ok () {
      let finalPower = {};
      if(this.modalConfig.addRoot) {
        this.newPower.operateIndex = 0;

        finalPower = Object.assign({}, this.newPower);

      }else if(this.modalConfig.del) {

        finalPower = Object.assign({}, this.currentPower, {delFlag: 1});

      }else {

        finalPower = this.newPower;

      }
      this.setCurrentPower(finalPower);
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
      setCurrentPower : 'SET_SYS_CURRENTPOWER',
    })
  },

  computed: {
    fatherName() {
      let name = '';
      let fathers = this.departments;
      let children = this.currentDepartmet;
      if(children.parentId == "" || children.parentId === null) {
        return name;
      }else {
        let father = fathers.find((item)=>{
                      return item.dId === children.parentId;
                    });
        console.log(father);
        name = father.dName;
      }
      return name;
    },

    //vuex引入部门数据
    ...mapGetters({
      appList : 'appList',
      currentPower : 'power'
    })
  },

  mounted() {

  },

  watch: {
    'modalConfig': {
      handler: function(newVal){
        if(newVal.add) {
          console.log(this.currentPower);
          this.newPower.parentName = this.currentPower.operateName;
          this.newPower.parentOperateId = this.currentPower.operateId;
          this.newPower.sacId = this.currentPower.sacId;
          this.newPower.operateIndex = this.currentPower.operateIndex + 1;
        }
      },
      deep:true
    }
  },

  //系统来源列表数据监听
  appList(val) {
    console.log(val);
    this.newPower = {
      sacId: val != undefined ? val[0]['sacId'] : ''
    };
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
