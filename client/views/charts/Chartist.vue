<template>
  <div>
    <div class="tile is-ancestor">
      <baidu-map class="bm-view" ak="H8S40o4ZdE6hN4W4ESYvCgRY" :center="center" :zoom="zoom" :scroll-wheel-zoom=" flexible ">
      </baidu-map>
    </div>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'

export default {
  components: {
    BaiduMap
  },

  data () {
    return {
      center: {lng: 121.601268, lat: 31.18331},
      zoom: 16,
      flexible: true
    }
  },

  computed: {
    
  },

  created () {
    
  }
}
</script>

<style scoped>

.bm-view {
  width: 100%;
  height: 600px;
}
</style>
