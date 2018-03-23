<template>
  <card-modal :visible="visible" @cancel="cancel" @ok="ok" :modalConfig="modalConfig" transition="zoom">
    <table class="table" v-if="modalConfig.edit">
      <tbody>
        <tr>
          <td class="leftCol"><strong>部门名称</strong></td><td class="rightCol"><input v-model="newPartment['dName']" type="text" class="input is-primary"></td>
        </tr>
        <tr>
          <td class="leftCol"><strong>上级部门</strong></td>
          <td class="rightCol">
            <div class="select is-small">
                <select v-model="newPartment['parentId']">
                  <option value="">无</option>
                  <option v-for="item in allPartments" :value="item.dId">{{item.dName}}</option>
                </select>
            </div>
          </td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><input v-model="newPartment['dRemark']" type="text" class="input is-primary"></td>
        </tr>
      </tbody>
    </table>

    <div v-if="modalConfig.editUser" class="pageHeader myHeader" >
      <div class="search">
        <ul class="content">
          
          <li class="item text">
            <input class="input is-primary" @keyup.enter="search" v-model="searchUser['userName']" placeholder="用户名"/>
          </li>
          
        </ul>
        <span class="button is-primary" @click="search"><i class="fa fa-search"></i></span>
      </div>
      <div class="addUser" v-show="typeof searchResult == 'object'">
        <a v-for="item in searchResult" class="button is-success userBtn"><span class="icon"><i class="fa fa-check"></i></span> <span>{{item.userName}}</span></a>
      </div>
      <div class="addUser" v-show="typeof searchResult == 'string'">
        {{ searchResult }}
      </div>
      <div class="removeUser">
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
        <a class="button is-danger is-outlined userBtn"> <span>热热</span> <span class="icon"><i class="fa fa-times"></i></span> </a>
      </div>
    </div>

    <table v-if="modalConfig.remove">
      <tbody>
        <tr>
          <td class="leftCol"><strong>部门名称</strong></td><td class="rightCol">{{modalConfig.partment.dName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>所属上级</strong></td><td class="rightCol">{{fatherName}}</td>
        </tr>
        <tr>
          <td class="leftCol"><strong>备注</strong></td><td class="rightCol">{{modalConfig.partment.dRemark}}</td>
        </tr>
      </tbody>
    </table>
  </card-modal>
</template>


<script>
import { CardModal } from 'vue-bulma-modal'
import { mapGetters, mapMutations } from 'vuex'
import MySwitch from 'components/common/MySwitch/MySwitch'

export default {
  components: {
    CardModal,
    MySwitch
  },

  props: {
    visible: Boolean,
    modalConfig: Object
  },

  data () {
    return {
      newPartment: {},
      searchResult: [],
      allPartments: [],
      searchUser: {}
    }
  },

  methods: {
    cancel () {
      this.$emit('close')
      this.newPartment = {}
    },
    open () {
    
    },
    close () {
      this.$emit('close')
      this.newPartment = {}
    },
    ok () {
      this.$emit('ok', this.newPartment)
    },
    search() {
      this.$emit('search', this.searchUser)
    }
  },

  computed: {
    fatherName() {
      let name = ''
      let fathers = this.allPartments
      let children = this.modalConfig.partment
      if(children.parentId == "" || children.parentId === null) {
        return name;
      }else {
        let father = fathers.find((item)=>{
                      return item.dId === children.parentId
                    })
        console.log(father)
        name = father.dName
      }
      return name
    }
  },

  mounted() {
    //console.log(this.modalConfig)
    /*
    if(this.modalConfig.partment.dId) {
      this.newPartment.dId = this.modalConfig.partment.dId
    }
    */
  },

  watch: {
    'modalConfig': {
      handler: function(newVal){
        this.newPartment.dId = this.modalConfig.partment.dId
       
        if(newVal.allPartments) {
          this.allPartments = newVal.allPartments
        }

        if(newVal.searchResult) {
          this.searchResult = newVal.searchResult
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
</style>
