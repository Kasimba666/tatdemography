<template>
  <div class="ObjsSorting" v-if="Object.keys(sortingValues).length>0">
    <div class="sorting-block">
      <div class="sorting-label">
        <label for="sorting" class="filter-label">Сортировка:</label>
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
  width: auto;
  height: auto;
  padding: 0;
  border: 1px solid hsl(0, 88%, 83%);

  .sorting-block {
    width: auto;
    //width: 270px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 3px;
    border-radius: 5px;
    background-color: var(--bg-color-3);

    .sorting-label {
      width: 70px;
      height: auto;
      text-align: end;
    }

    .sorting-value {
      width: 190px;
      height: auto;
    }
    .sorting-direction {
      width: auto;
      height: auto;
      border: 1px solid hsl(0, 88%, 83%);
    }
  }

  select {
    background-color: hsl(180, 100%, 25%, 0.08);
    width: 100%;
    cursor: pointer;
  }

}
</style>
