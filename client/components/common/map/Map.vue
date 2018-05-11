<template>
  <div>
    <baidu-map 
    class="bm-view" 
    ak="H8S40o4ZdE6hN4W4ESYvCgRY" 
    :center="centerPoint" 
    :zoom="zoom" 
    :scroll-wheel-zoom="flexible"
    :cursorStyle="cursorFlag === true ? 'point' : 'crosshair' "

    @mousemove="syncPolygon"
    @click="paintPolygon"
    @rightclick="newPolygon"

    >

      <bm-control>
        <button class="button is-warning" @click="toggle('polygon')">{{ polygon.editing ? '停止绘制' : '开始绘制' }}</button>
        <button class="button is-warning clearPath" @click="clearPath('polygon')">清空</button>
      </bm-control>

      <!--
      <bm-control>
        <button class="button is-warning" @click="toggle('polyline')">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
      </bm-control>
      <bm-polyline :path="path" v-for="(path, index) of polyline.paths" :key="index" :stroke-weight="1"></bm-polyline>
      -->
      
      <bm-polygon :path="polygon.paths" stroke-color="blue" fill-color="red" :fill-opacity="0.2" :stroke-opacity="0.5" :stroke-weight="1" :editing="true" @lineupdate="updatePolygonPath"/>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue';
import BmControl from 'vue-baidu-map/components/controls/Control.vue';
import BmPolyline from 'vue-baidu-map/components/overlays/Polyline.vue';
import BmPolygon from 'vue-baidu-map/components/overlays/Polygon.vue';

export default {
  components: {
    BaiduMap,
    BmControl,
    BmPolyline,
    BmPolygon
  },

  props: {
    pathData: {
      type: Array,
      default () {
        return []
      }
    },
    centerPoint: {
      type: Object,
      default () {
        return {lng: 121.601268, lat: 31.18331}
      }
    }
  },

  data () {
    return {
      cursorFlag: true,
      zoom: 16,
      flexible: true,
      polyline: {
        editing: false,
        paths: []
      },
      polygon: {
        editing: false,
        paths: this.pathData
      },
      /*
      polygonPath: [
        {lng: 121.598501, lat: 31.179236},
        {lng: 121.607933, lat: 31.180336},
        //{lng: 121.603801, lat: 31.18806},
        //{lng: 121.594243, lat: 31.184785},
      ]
      */
    }
  },

  computed: {
    
  },

  methods: {
    toggle (name) {
      this[name].editing = !this[name].editing;
      this.cursorFlag = !this.cursorFlag;
    },

    clearPath (name) {
      this[name].paths = []
    },
    /*
    syncPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    newPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      if(!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([])
      }
    },
    paintPolyline (e) {
      if (!this.polyline.editing) {
        return
      }
      const {paths} = this.polyline
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    },
    */
    syncPolygon (e) {
      /*
      if (!this.polygon.editing) {
        return
      }
      const {paths} = this.polygon
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
      */
    },
    newPolygon (e) {
      /*
      if (!this.polygon.editing) {
        return
      }
      const {paths} = this.polygon
      if(!paths.length) {
        paths.push([])
      }
      const path = paths[paths.length - 1]
      path.pop()
      if (path.length) {
        paths.push([]) 
      }
      */
    },
    paintPolygon (e) {
      if (!this.polygon.editing) {
        return
      }
      const {paths} = this.polygon
      paths.push(e.point)
      //!paths.length && paths.push([])
      //paths[paths.length - 1].push(e.point)
    },
    updatePolygonPath (e) {
      this.polygon.paths = e.target.getPath();
    },
  },

  watch: {

    pathData(newVal, oldVal){
      if(newVal.length > 0) {
        this.polygon.paths = newVal;
      }
    },

    'centerPoint' : {
      deep: true,
      handler(newVal){
        //console.log(this.centerPoint);
      }
    } 
  },

  mounted () {
    
  }
}
</script>

<style scoped>

.bm-view {
  width: 100%;
  height: 500px;
}
.clearPath {
  margin-left: 10px;
}
</style>
