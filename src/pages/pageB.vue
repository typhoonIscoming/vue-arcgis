<template>
    <div class="page-B common">
        <common title="b"></common>
        <div class="content">
          <div id="mapLayer"></div>
        </div>
        <div class="bottom">
            b页面
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import { mapGetters } from 'vuex'
import map from '../mixins/map'
export default {
  data() {
    return {
      map: null,
      pointLayer: null,
    };
  },
  mixins: [map],
  components: {
    common
  },
  computed: {
    ...mapGetters('map', ['getMap']),
  },
  mounted() {
    console.log('print map in page B', this.getMap)
  },
  methods: {
    mapClick(e) {
      console.log(e)
    },
    // initMap() {
    //   this.map = new this.getMap.Map('mapLayer', {
    //     logo: false,
    //     slider: true,
    //     isDoubleClickZoom: false,
    //     sliderPosition: 'bottom-right',
    //     /* maxScale参数为地图可以放大的最大比例尺，minScale参数为地图可以缩小的最小比例尺
    //         目前全国瓦片形图能放大的最大级别为2256.994353。由于比例尺不是标准的整数，使用不太方便，建议使用级别来控制
    //         maxZoom参数为地图可以放大的最大级别，minZoom参数为地图可以缩小的最小级别
    //         具体的级别和比例尺对应关系可以直接访问下方的地图url，查看Levels of Detail。目前全国地图最大级别为18级(从0开始0
    //     */
    //     maxZoom: 18,
    //     minZoom: 9,
    //     // 默认显示级别为12级
    //     zoom: 12,
    //     // 默认显示廊坊地区范围
    //     extent: new this.getMap.Extent({
    //       xmin: 116.48791453099358,//12967375.327355506
    //       ymin: 39.47926723536149,//4790556.863335548
    //       xmax: 116.85629984598576,//13008383.793030446
    //       ymax: 39.60317443579239,//4808443.127954256
    //       // spatialReference为空间地理参考系代码，本demo中使用的地图为web墨卡托-84坐标系
    //       spatialReference: {wkid: 4326}
    //     })
    //   });
    //   // 新建比例尺对象
    //   let scalebar = new this.getMap.Scalebar({
    //     map: this.map,
    //     scalebarStyle: 'line',
    //     scalebarUnit: 'metric', // 指定比例尺单位,有效值是"english(英制)" or "metric（公制）".默认"english"
    //     attachTo: 'bottom-left'
    //   });
    //   console.log("dojo.Color", dojo.Color)
    //   const mapUrl = 'http://192.168.0.23:6080/arcgis/rest/services/GW_JCSJ_LF/MapServer'
    //   let layer = new this.getMap.ArcGISTiledMapServiceLayer(mapUrl);
    //   this.map.addLayer(layer);
    //   // 设置地图点击之后标记点的样式
    //   let pointSymbol = new this.getMap.SimpleMarkerSymbol( this.getMap.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
    //                     new this.getMap.SimpleLineSymbol( this.getMap.SimpleLineSymbol.STYLE_SOLID,
    //                     new dojo.Color([255, 0, 0]), 1),
    //                     new dojo.Color([255, 0, 0, 1])
    //                   );

    //   let that = this;
    //   this.map.on("click", (e) => {
    //     const { x, y } = e.mapPoint
    //     console.log(this.x)
    //     this.map.graphics.clear();
    //     this.map.graphics.add(new this.getMap.Graphic(e.mapPoint, pointSymbol));
    //   });
    // },
  },
  watch: {
    getMap(newval) {
      console.log('print map in page B in watch', newval)
      this.initMap('mapLayer')
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/css/common.scss';
.page-B{
  width: 100%;
  height: 100%;
  #mapLayer{
    width: 100%;
    height: 100%;
  }
}
</style>