<template>
  
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <tabs v-if="tabType === 'display'" type="boxed" @tab-selected="tabSelected">
          <tab-pane label="基础信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong>名称:</strong></td><td class="rightCol">{{currentGuide.name}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>内容:</strong></td><td class="rightCol">{{currentGuide.context}}</td>
                </tr>
              </tbody>
            </table>
          </tab-pane>  
          <tab-pane label="关联信息">
            <table class="table" v-if="linkInfoList.length > 0 ">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>名称</th>
                  <th>描述</th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in linkInfoList">
                  <td>{{index + 1}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.info}}</td>
                  <td>{{item.createDate}}</td>
                </tr>
              </tbody>
            </table>
            <div v-else>暂无关联信息</div>
            <pagination v-if="linkInfoNums > 10" :allItems=" linkInfoNums " @changeIndex="getLinkPages" :pernum="10"></pagination>
          </tab-pane>
        </tabs>

        <tabs v-if=" tabType === 'modify' " type="boxed" @tab-selected="tabSelected">
          <tab-pane label="引入信息">
            <div class="map-container">

              <div class="optionContainer">
                <div class="search">
                  <input class="input is-primary" @keyup.enter="search" v-model="searchParams['title']" placeholder="标题"/>
                  <div class="control">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="searchParams.scid">
                          <option value="" >全部类型</option>
                          <option v-for="item in serviceTypeList" :value="item.id" >{{item.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <span class="button is-primary searchBtn" @click="search(1)"><i class="fa fa-search"></i></span>
                </div>
                
                <div class="optionBox" v-if="unLinkInfoList.length > 0">
                  <span class="button is-warning searchBtn" @click="checkAll(1)">全选</span>
                  <span class="button is-warning searchBtn" @click="doLink">引入</span>
                </div>
              </div>

              <div v-if="unLinkInfoList.length > 0">
                <table class="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>名称</th>
                      <th>描述</th>
                      <th>创建时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in unLinkInfoList">
                      <td>
                        <label class="checkbox"><input type="checkbox" :value="item.id" v-model="selectedInfos"></label>
                      </td>
                      <td>{{item.title}}</td>
                      <td>{{item.info}}</td>
                      <td>{{item.createDate}}</td>
                    </tr>
                  </tbody>
                </table>
                
                <pagination v-if=" unLinkInfoNums > 10" :allItems="unLinkInfoNums" @changeIndex="getUnLinkPages" :pernum="10"></pagination>

                
              </div>
              <div v-else>已关联全部信息</div>
              
            </div>
          </tab-pane>
          <tab-pane label="移除信息">
            <div class="map-container">

              <div class="optionContainer">
                <div class="search">
                  <input class="input is-primary" @keyup.enter="search" v-model="searchParams['title']" placeholder="标题"/>
                  <div class="control">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="searchParams.scid">
                          <option value="" >全部类型</option>
                          <option v-for="item in serviceTypeList" :value="item.id" >{{item.name}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <span class="button is-primary searchBtn" @click="search(2)"><i class="fa fa-search"></i></span>
                </div>
                
                <div class="optionBox" v-if="linkInfoList.length > 0 ">
                  <span class="button is-warning searchBtn" @click="checkAll(2)">全选</span>
                  <span class="button is-danger searchBtn" @click="doUnLink">移除</span>
                </div>
              </div>

              <div v-if="linkInfoList.length > 0 ">
                <table class="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>名称</th>
                      <th>描述</th>
                      <th>创建时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in linkInfoList">
                      <td>
                        <label class="checkbox"><input type="checkbox" :value="item.id" v-model="selectedInfos"></label>
                      </td>
                      <td>{{item.title}}</td>
                      <td>{{item.info}}</td>
                      <td>{{item.createDate}}</td>
                    </tr>
                  </tbody>
                </table>
                
                <pagination v-if="linkInfoNums > 10" :allItems=" linkInfoNums" @changeIndex="getLinkPages" :pernum="10"></pagination>
               
              </div>
              <div v-else>暂无关联信息</div>
              
            </div>
          </tab-pane>

          <tab-pane label="信息排序">
            <div class="map-container">
              <div v-if="linkInfoList.length > 0 ">

                <table class="table">
                  <thead>
                    <tr>
                      <th>序列</th>
                      <th>名称</th>
                      <th>描述</th>
                      <th>创建时间</th>
                    </tr>
                  </thead>
                  <draggable v-model="orderInfoList" :options="{group:'people'}" @start="drag=true" @end="drag=false" element="tbody">
                    <tr class="dragItem" v-for="(item, index) in orderInfoList">
                      <td>{{parseInt(index) + 1}}</td>
                      <td>{{item.title}}</td>
                      <td>{{item.info}}</td>
                      <td>{{item.createDate}}</td>
                    </tr>
                  </draggable>
                </table>

                <div class="optionBox"><span class="button is-primary searchBtn" @click="saveOrder">保存修改</span></div>
                
              </div>
              <div v-else>暂无关联信息</div>
              
            </div>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
  
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs';
import { mapGetters } from 'vuex';
import { __getCenter } from 'tools/js/util';
import Pagination from 'components/common/pagination/Pagination';
import Draggable from 'vuedraggable'
import Bus from 'base/bus';
import Ueditor from 'components/common/ueditor/Ueditor';

export default {
  props: {
    tabType: {
      type: String,
      default: 'display'
    }
  },

  components: {
    Tabs,
    TabPane,
    Ueditor,
    Pagination,
    Draggable
  },

  data () {
    return {
      defaultMsg: '这里输入内容',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      searchParams:{
        scid: ''
      },
      selectedInfos: [],
      tabIndex: 1,
      linkInfoNums: 0,
      unLinkInfoNums: 0,
      orderInfoList: []
    }
  },

  mounted () {
    Bus.$on('getUnLinkInfoNums', this.__getUnLinkInfoNums);
    Bus.$on('getLinkInfoNums', this.__getLinkInfoNums);
  },

  //清除Bus监听
  beforeDestroy() {
    Bus.$off('getUnLinkInfoNums');
    Bus.$off('getLinkInfoNums');
  },

  watch: {

    tabIndex() {
      this.selectedInfos = [];
    },

    'linkInfoList' : {
      handler (val) {
        this.orderInfoList = JSON.parse(JSON.stringify(val));
      },
      deep: true
    },
    
  },

  methods: {

    //tab切换操作面板
    tabSelected(index) {

      this.tabIndex = index;

      if(index === 0) {
        Bus.$emit('getUnLinkPages', 1);
      }

      if(index === 1) {
        Bus.$emit('getLinkPages', 1);
      }

      if(index === 2) {
        Bus.$emit('getAllLinkInfos');
      }
    },

    //全选
    checkAll(arg) {
      this.selectedInfos = [];
      if(arg === 1 ) {
        console.log(this.unLinkInfoList);
        this.unLinkInfoList.forEach((item, index)=>{
          this.selectedInfos.push(item.id);
        })
      }

      if(arg === 2 ) {
        this.linkInfoList.forEach((item)=>{
          this.selectedInfos.push(item.id);
        })
      }
    },

    //引入操作
    doLink() {
      let finalInfos = [];
      this.selectedInfos.forEach((item, index)=>{
        finalInfos.push(item + ',' + index);
      })
      Bus.$emit('doLink', finalInfos);
    },

    //移除操作
    doUnLink() {
      Bus.$emit('doUnLink', this.selectedInfos);
    },

    //分页获取未关联
    getUnLinkPages(index) {
      Bus.$emit('getUnLinkPages', index);
    },

    //分页获取已关联
    getLinkPages(index) {
      Bus.$emit('getLinkPages', index);
    },

    //引入界面下一页
    getIndex(num) {
      this.searchParams.pageNum = num;
      this.$emit('userSearch', this.searchParams);
    },

    //获取已关联总数
    __getLinkInfoNums(total) {
      this.linkInfoNums = total;
    },

    //获取未关联总数
    __getUnLinkInfoNums(total) {
      this.unLinkInfoNums = total;
    },

    //排序操作
    saveOrder() {
      let tempArr = [];
      let linkArr = this.orderInfoList;
      for(let i=0; i<linkArr.length; i++) {
        let itemOrder =  linkArr[i]['id']+','+ i;
        tempArr.push(itemOrder);
      }
      Bus.$emit('saveOrder', tempArr);
    },

    //引入界面搜索
    search(arg) {
      if(arg === 1){
        Bus.$emit('unLinkInfoSearch', this.searchParams);
      }

      if(arg === 2) {
        Bus.$emit('linkInfoSearch', this.searchParams);
      }
    },

  },

  computed: {

    //获取当前操作引导数据
    ...mapGetters({
      serviceTypeList : 'serviceTypeData',
      currentGuide : 'guide',
      linkInfoList : 'linkInfoData',
      unLinkInfoList : 'unLinkInfoData',
    }) 
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  .tab-content {
    min-height: 50px;
    margin: 0;
  }
}

.optionContainer {
  position: relative;
}

.optionBox {
  position: absolute;
  top: 0;
  right: 0;
}

.search {
  display: flex;
}

.searchBtn {
  margin-left: 20px;
}

.search input {
  margin-right: 20px;
  width: 30%;
}

.leftCol {
  width: 30%;
  text-align: left;
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
.optionBox span:first-child {
  margin-left:0;
}
.dragItem {
  cursor: pointer;
}

</style>
