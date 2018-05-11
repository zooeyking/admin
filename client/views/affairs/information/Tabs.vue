<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile">
        <div class="tile is-child">
          <tabs layout="left" animation="fade" :only-fade="false" size="small">
            <tab-pane label="图片" icon="fa fa-image">

              <div class="map-container">
                <div class="info-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong class="is-must">标题</strong></td><td class="rightCol"><input v-model="newInformation['name']" type="text" class="input is-primary" maxlength="15"></td>
                      </tr>
                      
                      <tr>
                        <td class="leftCol"><strong class="is-must">开始时间</strong></td><td class="rightCol"><timepicker @sendValue="setStartTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">结束时间</strong></td><td class="rightCol"><timepicker @sendValue="setEndTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">图片</strong></td>
                        <td class="rightCol">
                          <input class="upfile-box" @change="getFile($event)" type="file" accept="image/*">
                          <img class="avatar" :src="imgUrl"/>
                          
                          <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">校区</strong></td>
                        <td class="rightCol">
                            <div class="control is-horizontal">
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select v-model="newInformation.cid" @change="selectZone">
                                    <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>标签</strong></td><td class="rightCol"><input v-model="newInformation['label']" type="text" class="input is-primary" maxlength="30"></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>介绍</strong></td><td class="rightCol"><textarea v-model="newInformation['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div class="map-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong>类型</strong></td>
                        <td class="rightCol">
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="1">
                            坐标点
                          </label> 
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="2" >
                            建筑
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <tabs-map ref="campus" v-if="newInformation['type'] == 1"></tabs-map>

                  <div class="arc-select" v-if="newInformation['type'] == 2">
                    <div class="subtitle leftCol option-box"><strong class="is-must">建筑</strong></div>

                    <div class="option-box rightCol">
                      <div class="control is-horizontal">
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select v-model="newInformation.acid">
                              <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              
            </tab-pane>
            <tab-pane label="全景图" icon="fa fa-bank">
              
              <div class="map-container">
                <div class="info-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong class="is-must">标题</strong></td><td class="rightCol"><input v-model="newInformation['name']" type="text" class="input is-primary" maxlength="15"></td>
                      </tr>
                      
                      <tr>
                        <td class="leftCol"><strong class="is-must">开始时间</strong></td><td class="rightCol"><timepicker @sendValue="setStartTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">结束时间</strong></td><td class="rightCol"><timepicker @sendValue="setEndTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">图片</strong></td>
                        <td class="rightCol">
                          <input class="upfile-box" @change="getFile($event)" type="file" accept="image/*">
                          <img class="avatar" :src="imgUrl"/>
                          
                          <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">校区</strong></td>
                        <td class="rightCol">
                            <div class="control is-horizontal">
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select v-model="newInformation.cid" @change="selectZone">
                                    <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>标签</strong></td><td class="rightCol"><input v-model="newInformation['label']" type="text" class="input is-primary" maxlength="30"></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>介绍</strong></td><td class="rightCol"><textarea v-model="newInformation['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div class="map-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong>类型</strong></td>
                        <td class="rightCol">
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="1">
                            坐标点
                          </label> 
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="2" >
                            建筑
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <tabs-map ref="campus" v-if="newInformation['type'] == 1"></tabs-map>

                  <div class="arc-select" v-if="newInformation['type'] == 2">
                    <div class="subtitle leftCol option-box"><strong class="is-must">建筑</strong></div>

                    <div class="option-box rightCol">
                      <div class="control is-horizontal">
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select v-model="newInformation.acid">
                              <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>


            </tab-pane>
            <tab-pane label="标记" icon="fa fa-anchor">
              
              <div class="map-container">
                <div class="info-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong class="is-must">标题</strong></td><td class="rightCol"><input v-model="newInformation['name']" type="text" class="input is-primary" maxlength="15"></td>
                      </tr>
                      
                      <tr>
                        <td class="leftCol"><strong class="is-must">开始时间</strong></td><td class="rightCol"><timepicker @sendValue="setStartTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">结束时间</strong></td><td class="rightCol"><timepicker @sendValue="setEndTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">图片</strong></td>
                        <td class="rightCol">
                          <input class="upfile-box" @change="getFile($event)" type="file" accept="image/*">
                          <img class="avatar" :src="imgUrl"/>
                          
                          <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">校区</strong></td>
                        <td class="rightCol">
                            <div class="control is-horizontal">
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select v-model="newInformation.cid" @change="selectZone">
                                    <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>标签</strong></td><td class="rightCol"><input v-model="newInformation['label']" type="text" class="input is-primary" maxlength="30"></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>介绍</strong></td><td class="rightCol"><textarea v-model="newInformation['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div class="map-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong>类型</strong></td>
                        <td class="rightCol">
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="1">
                            坐标点
                          </label> 
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="2" >
                            建筑
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <tabs-map ref="campus" v-if="newInformation['type'] == 1"></tabs-map>

                  <div class="arc-select" v-if="newInformation['type'] == 2">
                    <div class="subtitle leftCol option-box"><strong class="is-must">建筑</strong></div>

                    <div class="option-box rightCol">
                      <div class="control is-horizontal">
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select v-model="newInformation.acid">
                              <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </tab-pane>
            <tab-pane label="视频" icon="fa fa-film">
              
              <div class="map-container">
                <div class="info-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong class="is-must">标题</strong></td><td class="rightCol"><input v-model="newInformation['name']" type="text" class="input is-primary" maxlength="15"></td>
                      </tr>
                      
                      <tr>
                        <td class="leftCol"><strong class="is-must">开始时间</strong></td><td class="rightCol"><timepicker @sendValue="setStartTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">结束时间</strong></td><td class="rightCol"><timepicker @sendValue="setEndTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">图片</strong></td>
                        <td class="rightCol">
                          <input class="upfile-box" @change="getFile($event)" type="file" accept="image/*">
                          <img class="avatar" :src="imgUrl"/>
                          
                          <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">校区</strong></td>
                        <td class="rightCol">
                            <div class="control is-horizontal">
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select v-model="newInformation.cid" @change="selectZone">
                                    <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>标签</strong></td><td class="rightCol"><input v-model="newInformation['label']" type="text" class="input is-primary" maxlength="30"></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>介绍</strong></td><td class="rightCol"><textarea v-model="newInformation['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div class="map-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong>类型</strong></td>
                        <td class="rightCol">
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="1">
                            坐标点
                          </label> 
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="2" >
                            建筑
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <tabs-map ref="campus" v-if="newInformation['type'] == 1"></tabs-map>

                  <div class="arc-select" v-if="newInformation['type'] == 2">
                    <div class="subtitle leftCol option-box"><strong class="is-must">建筑</strong></div>

                    <div class="option-box rightCol">
                      <div class="control is-horizontal">
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select v-model="newInformation.acid">
                              <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </tab-pane>
            <tab-pane label="新闻" icon="fa fa-newspaper-o">
              
              <div class="map-container">
                <div class="info-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong class="is-must">标题</strong></td><td class="rightCol"><input v-model="newInformation['name']" type="text" class="input is-primary" maxlength="15"></td>
                      </tr>
                      
                      <tr>
                        <td class="leftCol"><strong class="is-must">开始时间</strong></td><td class="rightCol"><timepicker @sendValue="setStartTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">结束时间</strong></td><td class="rightCol"><timepicker @sendValue="setEndTime"></timepicker></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">图片</strong></td>
                        <td class="rightCol">
                          <input class="upfile-box" @change="getFile($event)" type="file" accept="image/*">
                          <img class="avatar" :src="imgUrl"/>
                          
                          <!--<button @click="submit($event)"></button><img v-if="newType.url" :src="http://img.zcool.cn/community/0114375543f8ec0000019ae948310f.jpg"/>-->
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong class="is-must">校区</strong></td>
                        <td class="rightCol">
                            <div class="control is-horizontal">
                              <div class="control">
                                <div class="select is-fullwidth">
                                  <select v-model="newInformation.cid" @change="selectZone">
                                    <option v-for="item in zoneList" :value="item.id" >{{item.name}}</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                        </td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>标签</strong></td><td class="rightCol"><input v-model="newInformation['label']" type="text" class="input is-primary" maxlength="30"></td>
                      </tr>

                      <tr>
                        <td class="leftCol"><strong>介绍</strong></td><td class="rightCol"><textarea v-model="newInformation['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
                <div class="map-content">
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="leftCol"><strong>类型</strong></td>
                        <td class="rightCol">
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="1">
                            坐标点
                          </label> 
                          <label class="radio"><input v-model="newInformation['type']" type="radio" value="2" >
                            建筑
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <tabs-map ref="campus" v-if="newInformation['type'] == 1"></tabs-map>

                  <div class="arc-select" v-if="newInformation['type'] == 2">
                    <div class="subtitle leftCol option-box"><strong class="is-must">建筑</strong></div>

                    <div class="option-box rightCol">
                      <div class="control is-horizontal">
                        <div class="control">
                          <div class="select is-fullwidth">
                            <select v-model="newInformation.acid">
                              <option v-for="item in buildingList" :value="item.id" >{{item.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
            </tab-pane>
            
          </tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs, TabPane } from 'vue-bulma-tabs';
import { mapGetters, mapMutations } from 'vuex';
import Timepicker from 'components/common/datepicker/Timepicker';
import TabsMap from 'components/common/map/Map';

export default {
  components: {
    Tabs,
    TabPane,
    Timepicker,
    TabsMap
  },

  data () {
    return {
      imgUrl: '',
      newInformation: {}
    }
  },

  mounted () {
    
  },

  computed: {

    //vuex引入用户数据
    ...mapGetters({
      buildingList : 'buildingData',
      zoneList : 'zoneData',
      currentBuilding : 'building'
    })
  },

  methods: {

    //根据校区定位地图
    selectZone() {

    },

    //设置开始时间
    setStartTime(value) {
      console.log(value)
    },

    //设置结束时间
    setEndTime(value) {
      console.log(value)
    },

    //获取文件
    getFile(event) {
      let file = event.target.files[0];
      let windowURL = window.URL || window.webkitURL;
      this.imgUrl = windowURL.createObjectURL(file);

      this.$emit('upimg', file);
      
    },
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  margin: 20px;
  margin-left: 0;
  .tab-content {
    min-height: 50px;
  }
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
.map-container {
  margin-left: 30px;
}
.map-container:after {
  display: block;
  content: '';
  clear: both;
}
.info-content {
  width: 40%;
  float: left;
}
.map-content {
  width: 55%;
  float: right;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}
.textarea {
  height: 150px;
  resize: none;
}
.arc-select {
  border-top: 1px solid #dedede;
  margin-top: 20px;
  padding-left: 10px;
  padding-top: 20px;
}
.option-box {
  float: left;
}
.arc-select .option-box:last-child {
  width: 40%;
}
.upfile-box {
  width: 160px;
} 
.avatar {
  vertical-align: top;
  max-width: 80px;
}
</style>
