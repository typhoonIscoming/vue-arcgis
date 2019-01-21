<template>
  <div id="app">
    <div class="nav-bar">
      <router-link to="/A" @click.native="clickLink">A</router-link>
      <router-link to="/B" @click.native="clickLink">B</router-link>
      <router-link to="/C" @click.native="clickLink">C</router-link>
      <router-link to="/D" @click.native="clickLink">D</router-link>
    </div>
    <transition :name="trsnsname">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: "App",
  data() {
    return {
      trsnsname: 'turn-on',
      mapModules: [
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        'esri/dijit/Scalebar',
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/layers/WMSLayer",
        "esri/Color",
        "esri/SpatialReference",
        "esri/geometry/Point",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",
        "esri/graphic",
        "esri/dijit/InfoWindow",
        "esri/dijit/Popup",
        "esri/geometry/Polygon",
        "esri/domUtils",
        "esri/InfoWindowBase",
        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",

        "dojo/dom-construct",
        "dojo/dom",
        "dojo/Evented",
        "dojo/parser",
        "dojo/on",
        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/dom-style",
        "dojo/dom-attr",
        "dojo/_base/lang",
        "dojo/dom-class",
        "dojo/fx",
        "dojo/Deferred",
        "dojo/domReady!"
      ],
      isFirstIn: true,
    };
  },
  computed: {
    ...mapState({
      'root': state => state.rootState
    })
  },
  methods: {
    ...mapActions('map', ['setMap']),
    clickLink() {
      this.trsnsname = "turn-on"
    },
    initMap() {
      const options = {
        url: 'https://js.arcgis.com/3.24/init.js'
      }
      // 加载地图样式
      esriLoader.loadCss('https://js.arcgis.com/3.24/esri/css/esri.css')
      esriLoader.loadModules([ ...this.mapModules ], options)
      .then(this.loading)
      .then((obj) => {
        console.log('start')
        this.setMap(obj)
        Vue.prototype.map = obj

      })
    },
    loading([
      Map,
      Extent,
      ArcGISTiledMapServiceLayer,
      ArcGISDynamicMapServiceLayer,
      Scalebar,
      SimpleMarkerSymbol,
      SimpleLineSymbol,
      SimpleFillSymbol,
      PictureMarkerSymbol,
      WMSLayer,
      Color,
      SpatialReference,
      Point,
      GraphicsLayer,
      FeatureLayer,
      Graphic,
      InfoWindow,
      Popup,
      Polygon,
      domUtils,
      InfoWindowBase,
      IdentifyTask,
      IdentifyParameters,

      domConstruct,
      dom,
      Evented,
      parser,
      on,
      declare,
      array,
      domStyle,
      domAttr,
      lang,
      domClass,
      coreFx,
      Deferred,
    ]) {
      return {
        Map,
        Extent,
        ArcGISTiledMapServiceLayer,
        ArcGISDynamicMapServiceLayer,
        Scalebar,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        PictureMarkerSymbol,
        WMSLayer,
        Color,
        SpatialReference,
        Point,
        GraphicsLayer,
        FeatureLayer,
        Graphic,
        InfoWindow,
        Popup,
        Polygon,
        domUtils,
        InfoWindowBase,
        IdentifyTask,
        IdentifyParameters,

        domConstruct,
        dom,
        Evented,
        parser,
        on,
        declare,
        array,
        domStyle,
        domAttr,
        lang,
        domClass,
        coreFx,
        Deferred,
      }
    },
  },
  mounted() {
    var _this = this;
    this.initMap()
    window.addEventListener(
      "popstate",
      function(e) {
        _this.trsnsname = "turn-off"
      },
      false
    );
  },
  activated() {
    if(this.isFirstIn) {
      this.isFirstIn = false
    } else {
      this.initMap()
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.btn {
  width: 50%;
}
html,
body,
#app {
  height: 100%;
}
#app{
  position: relative;
  box-sizing: border-box;
}
.turn-on-enter {
  transform: translate3d(100%, 0, 0);
}
.turn-on-leave-to {
  /* transform: translate3d(-20%, 0, 0); */
}
.turn-on-enter-active,
.turn-on-leave-active {
  transition: transform 1.4s ease;
}
.turn-off-enter {
  /* transform: translate3d(-20%, 0, 0); */
}
.turn-off-leave-to {
  transform: translate3d(100%, 0, 0);
}
.turn-off-enter-active,
.turn-off-leave-active {
  transition: transform 1.4s ease;
}
.turn-off-leave-active {
  z-index: 2;
}
.nav-bar{
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 10;
  background: white;
  display: flex;
  a{
    flex: 1;
    text-align: center;
    // border-right: 1px solid gray;
    box-sizing: border-box;
    position: relative;
    text-decoration: none;
    &:after{
      content: '';
      border-right: 1px solid #666;
      height: 10px;
      width: 2px;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    &:last-child{
      &:after{
        border: none;
      }
    }
    &.is-active{
      color: red;
    }
  }
}
</style>
