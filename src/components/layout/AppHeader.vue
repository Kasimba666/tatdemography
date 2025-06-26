<template>
  <div class="AppHeader">
    <div class="app-panel">
      <div class="app-title"
           @click="$router.push({name: 'ObjsFiltersAndList'})"
      >
        Историческая демография татар в Закамье и Приуралье в XVIII-XIXвв
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
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

<style lang="scss" scoped>
.AppHeader {
  width: 100%;
  height: auto;

  .app-panel {
    flex: 0 0 auto;
    padding: 5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    //opacity: 80%;
    //background-size: cover;
    //background-position: center;
    //background-repeat: repeat-x;
    &:hover {
      box-shadow: 0 0 10px 3px rgba(0, 140, 186, 0.5);
    }
    .app-title {
      position: relative;
      width: auto;
      height: auto;
      background-color: hsl(206, 11%, 56%);
      opacity: 80%;
      color: white;
      text-align: center;
      font-size: 24px;
      padding: 5px 12px;
      border-radius: 5px;
    }
    .obj-button {
      opacity: 80%;
      font-size: x-large;
    }
  }

}
</style>
