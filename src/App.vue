<template>
  <div class="app">
    <div class="screen-monitor" v-if="DEBUG">
      {{ screen.type }}<br/>
      {{ screen.width }}px
    </div>
    <AppHeader/>
    <AppBody/>
    <AppFooter/>
  </div>
</template>

<script>
import {useScreen} from "@/composables/useScreen.js";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppBody from "@/components/layout/AppBody.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: 'app',
  components: {AppFooter, AppHeader, AppBody},
  data() {
    return {
      DEBUG: import.meta.env.MODE === 'development',
    }
  },
  setup() {
    const {screen, screenBreakPoints, setScreenListener, removeScreenListener} = useScreen();
    return {
      screen,
      screenBreakPoints,
      setScreenListener,
      removeScreenListener
    }
  },
  computed: {
    // ...mapActions(['loadObjsStore', 'loadImagesCSV', 'initGeofeatures', 'initFiltersValues', 'initSortingValues']),
    ...mapState(['geojson', 'imgs']),
    ...mapActions(['loadObjsStore']),
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('loadObjsStore');
    this.$store.dispatch('loadImagesCSV');
    this.$store.dispatch('initFiltersValues');
    this.$store.dispatch('initSortingValues');
    this.$store.dispatch('initGeofeatures');
    this.setScreenListener();
  },
  unmounted() {
    this.removeScreenListener();
  },
}
</script>
<style lang="scss">

.app {
  padding: 3px;
  background-color: var(--bg-secondary);
}

</style>
