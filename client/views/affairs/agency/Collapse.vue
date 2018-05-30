<template>
  <article class="tile is-child box no-padd">
    <div class="block is-flex">
      <collapse accordion>
        <div  v-for="(item, index) in agencyGroupList" :key="index" @click="open(index)">

          <collapse-item  :title="item.name">
            <agency-table :confirmClose="confirmClose" :totalNum="totalNum"></agency-table>
          </collapse-item>

        </div>
        
      </collapse>
    </div>
  </article>
</template>

<script>
import { Collapse, Item as CollapseItem } from 'vue-bulma-collapse';
import { mapGetters, mapMutations } from 'vuex';
import { TableMixin } from 'base/mixin';
import AgencyTable from './Table';
import Bus from 'base/bus';

export default {
  mixins: [TableMixin],
  props: {

    //操作面板显示/隐藏控制
    confirmClose: {
      type: Boolean,
      default: true
    },

    //数据库数据总条数
    totalNum: {
      type: Number,
      default: 0
    }
  },

  components: {
    Collapse,
    CollapseItem,
    AgencyTable,
  },

  data () {
    return {
      isShow: false,
      confirmShow: false,
      currentIndex: 0,
      modalConfig: {},
      modalType: 'zone-card',
    }
  },

  methods: {

    //展开选中的机构组
    open(index) {

      let group = this.agencyGroupList[index];
      this.setCurrentAgencyGroup(group);
      this.$emit('open');
      Bus.$emit('getBuildings');
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //vuex引入设置数据方法
    ...mapMutations({ 
      setCurrentZone : 'SET_CURRENTZONE',
      setCurrentAgencyGroup : 'SET_CURRENTAGENCYGROUP'
    })
  },

  computed: {
    ...mapGetters({
      agencyGroupList : 'agencyGroupData',
    }) 
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  .tab-content {
    min-height: 50px;
  }
}

.no-padd {
  padding: 0.1rem;
  border-radius: 0;
}

.pageHeader {
  display: flex;
  justify-content: space-between;
}

.userBtn {
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  cursor: text;
  color: #363636;
}

.leftCol {
  width: 20%;
}
.is-must {
  color: red;
}
.rightCol {
  width: 70%;
}
.rightCol:after {
  display: block;
  content: '';
  clear: both;
}
.short-input {
  width: 45%;
}
.rightCol .short-input:first-child {
  float: left;
}
.rightCol .short-input:last-child {
  float: right;
}
.check-info {
  margin-left: 0.75em;
}
.map-container:after {
  display: block;
  content: '';
  clear: both;
}
.info-content {
  width: 35%;
  float: left;
}
.map-content {
  width: 60%;
  float: right;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}
.textarea {
  height: 150px;
  resize: none;
}

</style>
