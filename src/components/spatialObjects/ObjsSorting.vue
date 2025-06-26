<template>
  <div class="ObjsSorting" v-if="Object.keys(sortingValues).length>0">
    <div class="sorting-block">
      <div class="sorting-label">
        <label for="sorting" class="label">Сортировка: </label>
      </div>
      <div class="sorting-value">
        <el-select id="sorting"
                   v-model="sortingValues.attrName"
                   placeholder="Select"
                   size="small"
                   @change="onChangeSortingValues"
        >
          <el-option
              v-for="item of scheme.filter(v=>v.sortable === 1)"
              :value="item.attrName"
              :label="item.title"
          />
        </el-select>
      </div>
      <div class="sorting-direction">
        <el-radio-group
            v-model="sortingValues.direction"
            size="small"
            @change="onChangeSortingValues"
        >
          <el-radio-button label="по возрастанию" value="asc" />
          <el-radio-button label="по убыванию" value="desc" />
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ObjsSorting',
  components: {},
  props: {
    sortingValues: Object,
    scheme: Array,
  },
  emits: ['update:sortingValues', 'onChangeSortingValues'],
  data() {
    return {}
  },
  computed: {

  },
  methods: {
    onChangeSortingValues() {
      this.$emit('update:sortingValues');
      this.$emit('onChangeSortingValues');
    },
  },
  mounted() {
  },
}
</script>

<style lang="scss">
.ObjsSorting {
  width: 100%;
  height: auto;
  padding: 5px;

  .sorting-block {
    width: 100%;
    //width: 270px;
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
    align-items: center;
    gap: 5px;
    padding: 3px;

    .sorting-label {
      width: 70px;
      height: auto;
      text-align: end;
    }

    .sorting-value {
      width: 260px;
      height: auto;
    }
    .sorting-direction {
      width: auto;
      height: auto;
    }
  }

  select {
    background-color: hsl(180, 100%, 25%, 0.08);
    width: 100%;
    cursor: pointer;
  }

}
</style>
