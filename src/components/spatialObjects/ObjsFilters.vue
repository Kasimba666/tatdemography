<template>
  <div class="ObjsFilters" v-if="filtersValues.length>0">
    <div class="filter-container" :class="{heightLimited: ['md', 'lg', 'xl'].includes(this.screen.type)}">
      <div class="filter-block" v-for="(filter, f) of filters" :key="f + '_' + filtersValues[f].isActive">
      <div class="filter-header">
        <div class="filter-checkbox">
          <el-checkbox
              v-model="filtersValues[f].isActive"
              label=""
              @change="onChangeCheckbox(filter.attrName)"
          />
        </div>
        <div class="filter-label">
          <label for="filter_`${f}`">{{ filter.title }} </label>
        </div>
      </div>
      <div class="filter-body" v-if="filtersValues[f].isActive">
          <template v-if="filter.type === 'input'">
            <el-input id="filter_`${f}`"
                v-model="filtersValues[f].list[0]"
                size="small"
                :disabled="!filtersValues[f].isActive"
                @change="onChangeFiltersValues"
                @input="onChangeFiltersValues"
            />
          </template>
          <template v-if="filter.type === 'select'">
            <el-select id="filter_`${f}`"
                v-model="filtersValues[f].list[0]"
                placeholder="Select"
                size="small"
                :disabled="!filtersValues[f].isActive"
                @change="onChangeFiltersValues"
            >
              <el-option
                  v-for="(item, i) of valuesDependentOnParent(filter)"
                  :key="i"
                  :label="item.value"
                  :value="item.value"
              />
            </el-select>
          </template>
          <template v-if="filter.type === 'multiselect'">
              <el-checkbox-group class="checkbox-group"
                v-model="filtersValues[f].list" >
                <el-checkbox
                    v-for="(item, i) of valuesDependentOnParent(filter)"
                    :key="i"
                    :value="item.value"
                    :disabled="!filtersValues[f].isActive"
                >
                </el-checkbox>
              </el-checkbox-group>
          </template>
          <template v-if="filter.type === 'range'">
            <div class="input-items">
                <div>
                  <el-input-number
                      v-model="filtersValues[f].list[0]"
                      style="width: 80px"
                      size="small"
                      controls-position="right"
                      :min="filter.listValues[0]"
                      :max="filter.listValues[1]"
                      :disabled="!filtersValues[f].isActive"
                      @change="onChangeFiltersValues"
                  />
                  <el-input-number
                      v-model="filtersValues[f].list[1]"
                      style="width: 80px"
                      size="small"
                      controls-position="right"
                      :min="filter.listValues[0]"
                      :max="filter.listValues[1]"
                      :disabled="!filtersValues[f].isActive"
                      @change="onChangeFiltersValues"
                  />
                </div>
            <el-slider
                v-model="filtersValues[f].list"
                range
                :min="filter.listValues[0]"
                :max="filter.listValues[1]"
                :disabled="!filtersValues[f].isActive"
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
      if (f.attrParent != null || this.filtersValues.filter((fV) => {if (fV.attrName === f.attrParent) {return fV} })?.[0]?.list[0] === 'all') {
        let newListValues = f.listValues.filter((v) => {if (this.filtersValues.filter((fV) => { if (fV.attrName === f.attrParent) {return fV } })[0].list[0] === v.parentValue) {return v}}).sort((a, b) => a.value.localeCompare(b.value));
        // console.log('newListValues', newListValues);
        let filterValue = this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })?.[0]?.list[0];
        //если текущее значение фильтра не null, но не попадает в диапазон допустимых значений из parent, то установить первое значение из подходящего диапазона
        if (filterValue != 'all') {
          // if  (!newListValues.map((v)=>{return v.value}).includes(filterValue)) {this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })[0].list[0] = 'all_0'}
          if  (!newListValues.map((v)=>{return v.value}).includes(filterValue)) {
            console.log('смена диапазона допустимых значений');
            this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })[0].list[0] = newListValues[0];
          }
        }
        return newListValues.length > 0 ? newListValues : 'all_1';
      } else {

        return f.listValues.length > 0 ? f.listValues.sort((a, b) => a.value.localeCompare(b.value)) : 'all_2';
        // return f.listValues.length > 0 ? f.listValues.sort((a, b) => a['value'] > b['value'] ? 1 : -1) : 'all';
      }
    },
    onChangeCheckbox(currentAttrName) {
      if (this.filtersValues.filter(v => v.attrName === currentAttrName)[0].isActive) {
        this.filtersValues.filter(v => v.attrName === currentAttrName)[0].list[0] = this.filters.filter(v => v.attrName === currentAttrName)[0].listValues[0].value;
      }else{
        this.filtersValues.filter(v => v.attrName === currentAttrName)[0].list = [];
      }
      this.onChangeFiltersValues();
    },
    onChangeFiltersValues() {
      this.$emit('update:filtersValues');
      this.$emit('onChangeFiltersValues');
    },
  },
  mounted() {

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


  .filter-container {
    columns: 200px;
    column-gap: 3px;
    max-height: 400px;
    overflow-y: auto;


    .filter-block {
      display: inline-block;
      width: 100%;
      margin-bottom: 6px;

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
        box-sizing: border-box;
        text-align: left;
        padding-top: 0px;
        //border: 1px solid hsl(0, 0%, 90%);
      }
    }
    .filter-body {
      width: 100%;
      height: auto;

    }
    }
  }
}

</style>
