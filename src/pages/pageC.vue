<template>
    <div class="C common">
        <common title="c"></common>
        <div class="content">
          <div id="mapC"></div>
        </div>
        <div class="bottom">
            c页面
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import map from '../mixins/map'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      map: null,
    };
  },
  components: {
    common
  },
  computed: {
    ...mapGetters('map', ['getMap']),
    computedMap() {
      console.log('this.getMap in pagec on computed', this.getMap)
      if(this.getMap) {
        this.initMap('mapC')
      }
      return true
    },
  },
  mounted() {
    // console.log('this.computedMap', this.computedMap)
    this.initMap('mapC')
  },
  mixins: [map],
  methods: {
    mapClick(e) {
      console.log('pageC, click event on map', e.mapPoint)
    },
  },
  watch: {
    getMap(newval) {
      console.log('print map in page B in watch', newval)
      // this.initMap('mapC')
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';
.C{
  width: 100%;
  height: 100%;
  #mapC{
    width: 100%;
    height: 100%;
  }
}
</style>