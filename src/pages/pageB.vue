<template>
    <div class="B common">
        <common title="b"></common>
        <div class="content" />
        <div class="bottom">
            b页面
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {};
  },
  components: {
    common
  },
  computed: {
    ...mapGetters('map', ['getMap']),
  },
  created() {
    console.log('print map in page B', this.getMap)
  },
  watch: {
    getMap(newval) {
      console.log('print map in page B in watch', newval)
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/css/common.scss';
</style>