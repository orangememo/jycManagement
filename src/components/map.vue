<template>
  <div class="amap-page-container">
    <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo" :events="events">
      <el-amap-marker v-for="(marker,index) in markers" :position="marker" :key="index"></el-amap-marker>
    </el-amap>
  </div>
  
</template>

<script>
// import AMap from 'AMap'
export default {
  props: {
    lng: { type: Number, default: 121.59996 },
    lat: { type: Number, default: 31.197646 },
    address: { type: String, default: "" }
  },
  data() {
    let self = this;
    return {
      markers: [],
      mapCenter: [this.lng, this.lat],
      loaded: false,
      searchOption: {
        city: "上海",
        citylimit: true
      },
      events: {
        click: e => {
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.mapCenter = [lng, lat];
          self.markers = [[lng, lat]];
          self.gaodeorder(lng, lat);
        }
      }
    };
  },
  created() {},
  methods: {
    addMarker: function() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers.push([lng, lat]);
    },
    gaodeorder(lng, lat) {
      const that = this;
      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      geocoder.getAddress([lng, lat], function(status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.regeocode) {
            that.address = result.regeocode.formattedAddress;
            that.$emit("location", that.address, that.markers);
            that.$nextTick();
          }
        }
      });
    },
    onSearchResult(pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
      this.gaodeorder(pois[0].lng, pois[0].lat);
    }
  }
};
</script>

<style scoped>
.amap-page-container {
  height: 400px;
  width: 750px;
}
.amap-page-container {
  position: relative;
}
.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}
</style>