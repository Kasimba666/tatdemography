<template>
  <div class="ObjsFilters" v-if="filtersValues.length>0">
    <div class="filter-wrapper" :class="{heightLimited: ['md', 'lg', 'xl'].includes(this.screen.type)}">
      <div class="filter-block" v-for="(filter, f) of filters" :key="f">
      <div class="filter-header">
        <div class="filter-checkbox">
          <el-checkbox
              v-model="filtersValues[f].value.isActive"
              label=""
              @change="onChangeFiltersValues"
          />
        </div>
        <div class="filter-label">
          <label for="filter_`${f}`">{{ filter.title }} </label>
        </div>
      </div>
      <div class="filter-body" v-if="filtersValues[f].value.isActive">
          <template v-if="filter.type === 'input'">
            <el-input id="filter_`${f}`"
                v-model="filtersValues[f].value.list[0]"
                size="small"
                :disabled="!filtersValues[f].value.isActive"
                @change="onChangeFiltersValues"
                @input="onChangeFiltersValues"
            />
          </template>
          <template v-if="filter.type === 'select'">
            <el-select id="filter_`${f}`"
                v-model="filtersValues[f].value.list[0]"
                placeholder="Select"
                size="small"

                :disabled="!filtersValues[f].value.isActive"
                @change="onChangeFiltersValues"
            >
              <el-option
                  key="all"
                  label="(все)"
                  value="all"
              >
                (все)
              </el-option>
              <el-option
                  v-for="(item, i) of valuesDependentOnParent(filter)"
                  :key="i"
                  :label="item.value"
                  :value="item.value"
              />
            </el-select>
          </template>
          <template v-if="filter.type === 'range'">
            <div class="input-items">
                <div>
                  <el-input-number
                      v-model="filtersValues[f].value.list[0]"
                      style="width: 80px"
                      size="small"
                      controls-position="right"
                      :min="filter.listValues[0]"
                      :max="filter.listValues[1]"
                      :disabled="!filtersValues[f].value.isActive"
                      @change="onChangeFiltersValues"
                  />
                  <el-input-number
                      v-model="filtersValues[f].value.list[1]"
                      style="width: 80px"
                      size="small"
                      controls-position="right"
                      :min="filter.listValues[0]"
                      :max="filter.listValues[1]"
                      :disabled="!filtersValues[f].value.isActive"
                      @change="onChangeFiltersValues"
                  />
                </div>
            <el-slider
                v-model="filtersValues[f].value.list"
                range
                :min="filter.listValues[0]"
                :max="filter.listValues[1]"
                :disabled="!filtersValues[f].value.isActive"
                @change="onChangeFiltersValues"
            />
            </div>
          </template>
        </div>

    </div>
    </div>
  </div>

</template>

<script>

import {useScreen} from "@/composables/useScreen";
import {mapMutations, mapState} from "vuex";

export default {
  name: 'ObjsFilters',
  components: {},
  props: {
    filtersValues: Array,
    filters: Array,
  },
  emits: ['update:filtersValues', 'onChangeFiltersValues'],
  data() {
    return {
    }
  },
  setup() {
    const {screen, screenBreakpoints} = useScreen();
    return {
      screen,
      screenBreakpoints
    }
  },
  computed: {
  },
  methods: {

    valuesDependentOnParent(f) {
      if (f.attrParent != null || this.filtersValues.filter((fV) => {if (fV.attrName === f.attrParent) {return fV} })?.[0]?.value.list[0] === 'all') {
        let newListValues = f.listValues.filter((v) => {if (this.filtersValues.filter((fV) => { if (fV.attrName === f.attrParent) {return fV } })[0].value.list[0] === v.parentValue) {return v}});
        let filterValue = this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })?.[0]?.value.list[0];
        //если текущее значение фильтра не null, но не попадает в диапазон допустимых значений из parent, то установить значение null
        if (filterValue != 'all') {
          if  (!newListValues.map((v)=>{return v.value}).includes(filterValue)) {this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })[0].value.list[0] = 'all'}
        }
        return newListValues.length > 0 ? newListValues.sort((a, b) => a.value.localeCompare(b.value)) : 'all';
      } else {
        // console.log('f.listValues', f.listValues);
        return f.listValues.length > 0 ? f.listValues.sort((a, b) => a.value.localeCompare(b.value)) : 'all';
        // return f.listValues.length > 0 ? f.listValues.sort((a, b) => a['value'] > b['value'] ? 1 : -1) : 'all';
      }
    },

    onChangeFiltersValues() {
      this.$emit('update:filtersValues');
      this.$emit('onChangeFiltersValues');
    },
  },
  mounted() {
    this.filtersValues.forEach(v => {console.log(v.attrName, v.value.list)})

  },
}
</script>

<style lang="scss">
.ObjsFilters {
  position: relative;
  width: 100%;
  //height: auto;
  padding: 5px;
  //border: 1px solid hsl(0, 88%, 83%);


  .filter-wrapper {
    position: relative;
    width: auto;
    display: flex;
    flex-flow: column wrap;
    justify-content: start;
    align-items: start;
    gap: 3px;
    border: 1px solid hsl(0, 88%, 83%);
    &.heightLimited {
      height: 300px;
    };

    .filter-block {
    width: 200px;
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: center;
    gap: 3px;
    padding: 5px;
    background-color: var(--bg-color-3);
    border-radius: 5px;
    //border: 1px solid hsl(0, 88%, 83%);

    .filter-header {
      width: 100%;
      height: 15px;
      display: flex;
      flex-flow: row;
      justify-content: start;
      align-items: center;
      gap: 3px;
      padding: 0;
      //border: 1px solid hsl(0, 0%, 90%);
      .filter-checkbox {
        //border: 1px solid hsl(0, 0%, 90%);
      }
      .filter-label {
        width: 100%;
        height: auto;
        text-align: left;
        padding-top: 0px;
        //margin-right: 10px;
        //border: 1px solid hsl(0, 0%, 90%);
      }
    }
    .filter-body {
      width: 100%;
      height: auto;
      //.el-select {
      //  width: 100%;
      //}
    }
  }
  }
}

</style>
