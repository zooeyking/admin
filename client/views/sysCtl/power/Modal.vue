<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    
    <table class="table" v-if="modalConfig.addRoot || modalConfig.add">
      <tbody>
        <tr>
          <td class="leftCol"><strong class="is-must">权限名称</strong></td><td class="rightCol"><input v-model="newPower['operateName']" type="text" maxlength="15" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong class="is-must">权限标识</strong></td><td class="rightCol"><input v-model="newPower['operateText']" type="text" maxlength="30" class="input is-primary"></td>
        </tr>

        <tr>
          <td class="leftCol"><strong class="is-must">所属类别</strong></td>
          <td class="rightCol">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newPower['operateType']">
                  <option value="module">模块</option>
                  <option value="function">功能</option>
                  <option value="button">按钮</option>
                </select>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="!modalConfig.add">
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
          <td class="leftCol"><strong>所属类别</strong></td><td class="rightCol">{{ currentPower.operateType === 'function' ? '功能' : currentPower.operateType === 'module' ? '模块' : '按钮' }}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>系统来源</strong></td><td class="rightCol">{{currentPower.sacName}}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="infoShow" class="check-info"><strong class="is-must">{{message}}</strong></p>
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
      infoShow: false,
      message: '',
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
      this.infoShow = false;
      this.newPower = {
        operateIndex : 0,
        sacId: this.appList != undefined ? this.appList[0]['sacId'] : ''
      };
    },


    open () {
    
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

      if(!finalPower.operateName || !finalPower.operateText || !finalPower.operateType) {
        this.message = '所需字段不能为空!';
        this.infoShow = true;
        return;
      }

      this.setCurrentPower(finalPower);
      this.$emit('ok');
    },

    //vuex引入设置当前部门方法
    ...mapMutations({
      setCurrentPower : 'SET_SYS_CURRENTPOWER',
    })
  },

  computed: {

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
          this.newPower = {
            parentOperateName : this.currentPower.operateName,
            parentOperateId : this.currentPower.operateId,
            sacId : this.currentPower.sacId,
            operateIndex : this.currentPower.operateIndex + 1
          };
        } else {
          this.newPower = {
            operateIndex : 0,
            sacId: this.appList != undefined ? this.appList[0]['sacId'] : ''
          };
        }
      },
      deep:true
    }
  },

  //系统来源列表数据监听
  appList(val) {
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
.check-info {
  margin-left: 0.75em;
}
</style>
