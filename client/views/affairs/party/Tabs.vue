<template>
  
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <tabs v-if="tabType === 'display'" type="boxed" @tab-selected="tabSelected">
          <tab-pane label="基础信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong>名称:</strong></td><td class="rightCol">{{currentParty.name}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>logo图片:</strong></td><td class="rightCol"><img class="avatar" :src="imgUrl" /></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong>创建时间:</strong></td><td class="rightCol">{{currentParty.createDate}}</td>
                </tr>
                
              </tbody>
            </table>
          </tab-pane>  
          <tab-pane label="引导信息">
            <div v-if="linkGuideList.length > 0">
              <table class="table">
                <thead>
                  <tr>
                    
                    <th>名称</th>
                    <th>描述</th>
                    <th>创建时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in linkGuideList">
                    
                    <td>{{item.name}}</td>
                    <td>{{item.info}}</td>
                    <td>{{item.createDate}}</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-else>暂无关联引导</div>
          </tab-pane>
        </tabs>

        <tabs v-if=" tabType === 'modify' " type="boxed" @tab-selected="tabSelected">
          <tab-pane label="关联引导">
            <article class="tile is-child">
              <div v-if="unLinkGuideList.length > 0">
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
                    <tr v-for="(item, index) in unLinkGuideList">
                      <td>
                        <label class="checkbox"><input type="checkbox" :value="item.id" v-model="selectedGuides"></label>
                      </td>
                      <td>{{item.name}}</td>
                      <td>{{item.info}}</td>
                      <td>{{item.createDate}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="optionBox">
                  <span class="button is-warning myLeftBtn" @click="checkAll(1)">全选</span>
                  <span class="button is-warning " @click="doLink">引入</span>
                </div>
              </div>

              <div v-else>已关联全部引导</div>
            </article>
          </tab-pane>
          <tab-pane label="移除引导">
            <article class="tile is-child">
              <div v-if="linkGuideList.length > 0">
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
                    <tr v-for="(item, index) in linkGuideList">
                      <td>
                        <label class="checkbox"><input type="checkbox" :value="item.id" v-model="selectedGuides"></label>
                      </td>
                      <td>{{item.name}}</td>
                      <td>{{item.info}}</td>
                      <td>{{item.createDate}}</td>
                      
                    </tr>
                  </tbody>
                </table>
                <div class="optionBox">
                  <span class="button is-warning myLeftBtn" @click="checkAll(2)">全选</span>
                  <span class="button is-warning " @click="doUnLink">移除</span>
                </div>
              </div>

              <div v-else>暂无关联引导</div>
            </article>
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
import Bus from 'base/bus';

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
  },

  data () {
    return {
      defaultMsg: '这里输入内容',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      selectedGuides: [],
      newZone:{},
      newParty: {},
      tabIndex: 0,
      imgUrl: ''
    }
  },

  mounted () {

  },

  watch: {
    
    tabIndex() {
      this.selectedGuides = [];
    },

    currentParty(newVal) {
      this.imgUrl = newVal.imagePath;
    },
    
  },

  methods: {

    //tab切换操作面板
    tabSelected(index) {
      this.tabIndex = index;
    },

    //获取文件
    getFile(event) {
      let file = event.target.files[0];
      let windowURL = window.URL || window.webkitURL;
      this.imgUrl = windowURL.createObjectURL(file);

      this.$emit('upimg', file);
      
    },

    //全选
    checkAll(arg) {
      this.selectedGuides = [];
      if(arg === 1 ) {
        this.unLinkGuideList.forEach((item)=>{
          this.selectedGuides.push(item.id);
        })
      }

      if(arg === 2 ) {
        this.linkGuideList.forEach((item)=>{
          this.selectedGuides.push(item.id);
        })
      }
    },

    //引入操作
    doLink() {
      Bus.$emit('doLink', this.selectedGuides);
    },

    //移除操作
    doUnLink() {
      Bus.$emit('doUnLink', this.selectedGuides);
    }

  },

  computed: {

    //当前操作活动数据
    ...mapGetters({
      guideList : 'guideData',
      currentParty : 'party',
      linkGuideList : 'linkGuideData',
      unLinkGuideList : 'unLinkGuideData',
    }) 
  }
}
</script>

<style lang="scss">
.tabs {
  .tab-content {
    min-height: 50px;
    margin: 0;
  }
}

.userBtn {
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  cursor: text;
  color: #363636;
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
.avatar {
  vertical-align: top;
  max-width: 180px;
}
.myLeftBtn {
  margin-right: 20px;
}
</style>
