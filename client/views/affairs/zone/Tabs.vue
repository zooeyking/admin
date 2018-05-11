<template>
  
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child box">
        <tabs v-if=" tabType === 'display' " type="boxed">
          <tab-pane label="基础信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong class="is-must">单个切片实际尺寸(M):</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">横向切片个数:</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">纵向切片个数:</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">比例(1像素=?M):</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">切片路径:</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">segments:</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">小地图路径:</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">WalkArea(M):</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">默认坐标X:</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">默认坐标Y:</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">默认坐标Z:</strong></td><td class="rightCol">{{}}</td>
                </tr>
              </tbody>
            </table>
          </tab-pane>  
          <tab-pane label="海拔信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong class="is-must">最高海拔(M):</strong></td><td class="rightCol">300</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">湖面海拔(M):</strong></td><td class="rightCol">40</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">纵向切片个数:</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">海拔切片路径:</strong></td><td class="rightCol">{{}}</td>
                </tr>
              </tbody>
            </table>
          </tab-pane>
          <tab-pane label="地貌信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong class="is-must">是否启用:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">segments:</strong></td><td class="rightCol">123</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">红色通道地貌图:</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">蓝色通道地貌图:</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">绿色通道地貌图:</strong></td><td class="rightCol">{{}}</td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">地貌切片路径:</strong></td><td class="rightCol">{{}}</td>
                </tr>
              </tbody>
            </table>
          </tab-pane>
        </tabs>

        <tabs v-if=" tabType === 'modify' " type="boxed">
          <tab-pane label="原始信息">
            <div class="map-container">
              <div class="info-content">
                <table class="table">
                  <tbody>
                    <tr>
                      <td class="leftCol"><strong class="is-must">校区名称</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                    </tr>

                    <!--
                    <tr>
                      <td class="leftCol"><strong>左上坐标</strong></td>
                      <td class="rightCol">
                          <input v-model="newZone['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="经度">
                          <input v-model="newZone['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="纬度">
                      </td>
                    </tr>
                    <tr>
                      <td class="leftCol"><strong>右下坐标</strong></td>
                      <td class="rightCol">
                          <input v-model="newZone['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="经度">
                          <input v-model="newZone['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="纬度">
                      </td>
                    </tr>
                    <tr>
                      <td class="leftCol"><strong>校区尺寸</strong></td>
                      <td class="rightCol">
                          <input v-model="newZone['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="长度">
                          <input v-model="newZone['userMail']" type="number" class="input is-primary short-input" maxlength="15" placeholder="宽度">
                      </td>
                    </tr>
                    -->
                    
                    <tr>
                      <td class="leftCol"><strong>备注</strong></td><td class="rightCol"><textarea v-model="newZone['descp']" class="textarea" maxlength="120" placeholder="至多输入120个字符"></textarea></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="map-content">
                <zone-map :pathData="pathData" :centerPoint="centerPoint" ></zone-map>
              </div>
            </div>
          </tab-pane>
          <tab-pane label="基础信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong class="is-must">单个切片实际尺寸(M):</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">横向切片个数:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">纵向切片个数:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">比例(1像素=?M):</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">切片路径:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">segments:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">小地图路径:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">WalkArea(M):</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">默认坐标X:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">默认坐标Y:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">默认坐标Z:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
              </tbody>
            </table>
          </tab-pane>  
          <tab-pane label="海拔信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong class="is-must">是否启用:</strong></td><td class="rightCol"><my-switch :zone="currentZone" @toggleChange="enableUpdate()"></my-switch></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">最高海拔(M):</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">湖面海拔(M):</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">纵向切片个数:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                
                <tr>
                  <td class="leftCol"><strong class="is-must">海拔切片路径:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
              </tbody>
            </table>
          </tab-pane>
          <tab-pane label="地貌信息">
            <table class="table">
              <tbody>
                <tr>
                  <td class="leftCol"><strong class="is-must">是否启用:</strong></td><td class="rightCol"><my-switch :zone="currentZone" @toggleChange="enableUpdate()"></my-switch></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">segments:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">红色通道地貌图:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">蓝色通道地貌图:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">绿色通道地貌图:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
                <tr>
                  <td class="leftCol"><strong class="is-must">地貌切片路径:</strong></td><td class="rightCol"><input v-model="newZone['name']" type="text" class="input is-primary" maxlength="30"></td>
                </tr>
              </tbody>
            </table>
          </tab-pane>
        </tabs>
      </div>
    </div>
  </div>
  
</template>

<script>
import ZoneMap from 'components/common/map/Map';
import MySwitch from './Switch';
import { Tabs, TabPane } from 'vue-bulma-tabs';
import { mapGetters } from 'vuex';
import { __getCenter } from 'tools/js/util';

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
    ZoneMap,
    MySwitch
  },

  data () {
    return {
      newZone:{},
      pathData:[],
      centerPoint:{}
    }
  },

  mounted () {

    //根据校区信息初始化地图数据
    this.newZone = {...this.currentZone};
    let str = this.newZone.position;
    this.pathData = JSON.parse(str);
    this.centerPoint = __getCenter(this.pathData);
  },

  watch: {
    
    currentZone(val) {
      
    }
    
  },

  methods: {

    //禁用、启用回调
    enableUpdate() {

    }
  },

  computed: {

    //获取当前操作校区数据
    ...mapGetters({
      currentZone : 'zone',
      //zoneInfo : 'currentZoneInfo'
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

</style>
