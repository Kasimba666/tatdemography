<template>
  <div class="AppBody">
  <div class="app-panel">
    <router-view/>
<!--    <router-view v-slot="{Component}">-->
<!--                <keep-alive>-->
<!--      <component :is="Component" />-->
<!--                </keep-alive>-->
<!--    </router-view>-->
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppBody',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {
  },
}
</script>

<style lang="scss" >
  .AppBody {
    width: 100%;
    height: auto;
    margin-top: 2px;

  .app-panel {
    padding: 5px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
  }

  }
</style>
