<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <tabs type="boxed" @tab-selected="tabSelected">
          <tab-pane v-for="(item, index) in zoneList" :label="item.name" :key="index">
            <collapse @open="open"  :confirmClose="confirmClose" :totalNum="totalNum"></collapse>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs';
import { mapGetters, mapMutations } from 'vuex';
import { TableMixin } from 'base/mixin';
import Collapse from './Collapse';

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
    Tabs,
    TabPane,
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

  mounted () {
    //console.log(this.zoneList);
  },

  watch: {
    
  },

  methods: {

    //校区切换
    tabSelected(index) {
      let zone = this.zoneList[index];
      this.setCurrentZone(zone);
      this.$emit('tabChange');
    },

    //展开操作
    open() {
      this.$emit('open');
    },

    //关闭操作面板
    closeDetail() {
      this.confirmShow = false;
    },

    //vuex引入设置数据方法
    ...mapMutations({ 
      setCurrentZone : 'SET_CURRENTZONE',
    })
  },

  computed: {
    ...mapGetters({
      currentZone : 'zone',
      zoneList : 'zoneData',
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
  padding: 0;
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
