<template>
  <div class="ObjsFilters" v-show="filtersValues.length>0">
    <div class="filter-container" :class="{heightLimited: ['md', 'lg', 'xl'].includes(this.screen.type)}">
      <div class="filter-block" v-for="(filter, f) of filters" :key="`${f}`">

        <div class="filter-header" @click="toggleCollapse(f)">

          <div class="filter-label">
            <el-icon>
              <component :is="collapsedFilters[f] ? 'ArrowDown' : 'ArrowUp'" />
            </el-icon>
            <label>{{ filter.title }}</label>
          </div>
        </div>
        <el-collapse-transition>
          <div class="filter-body" v-show="!collapsedFilters[f]">
            <template v-if="filter.type === 'input'">
              <el-input
                  v-model="filtersValues[f].list[0]"
                  size="small"
                  @change="onChangeFiltersValues(filter)"
                  @input="onChangeFiltersValues(filter)"
              />
            </template>
            <template v-if="filter.type === 'select'">
              <el-select
                  v-model="filtersValues[f].list[0]"
                  placeholder="Select"
                  size="small"
                  clearable
                  @change="onChangeFiltersValues(filter)"
              >
                <el-option
                    v-for="(item, i) of valuesDependentOnParent(filter)"
                    :key="i"
                    :label="item"
                    :value="item"
                />
              </el-select>
            </template>
            <template v-if="filter.type === 'multiselect'">
                <el-checkbox-group
                    class="checkbox-group"
                    v-model="filtersValues[f].list" >
                  <el-checkbox
                      v-for="(item, i) of valuesDependentOnParent(filter)"
                      :key="i"
                      :label="item"
                      @change="onChangeFiltersValues(filter)"
                  />
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
                        @change="onChangeFiltersValues(filter)"
                    />
                    <el-input-number
                        v-model="filtersValues[f].list[1]"
                        style="width: 80px"
                        size="small"
                        controls-position="right"
                        :min="filter.listValues[0]"
                        :max="filter.listValues[1]"
                        @change="onChangeFiltersValues(filter)"
                    />
                  </div>
              <el-slider
                  v-model="filtersValues[f].list"
                  range
                  :min="filter.listValues[0]"
                  :max="filter.listValues[1]"
                  @change="onChangeFiltersValues(filter)"
              />
              </div>
            </template>
          </div>
        </el-collapse-transition>

      </div>
    </div>
  </div>

</template>

<script>

import {useScreen} from "@/composables/useScreen";
import { ElCollapseTransition } from 'element-plus';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

export default {
  name: 'ObjsFilters',
  components: {ElCollapseTransition},
  props: {
    filtersValues: Array,
    filters: Array,
  },
  emits: ['update:filtersValues', 'onChangeFiltersValues'],
  data() {
    return {
      collapsedFilters: {}
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
    toggleCollapse(index) {
      this.collapsedFilters[index] = !this.collapsedFilters[index]
    },
    //возвращает простой массив значений
    valuesDependentOnParent(currentFilter) {
      if (!!currentFilter.attrParent) {
        //Получить список значений родителя
        let parentFilterValuesList = this.filtersValues.find(v => v.attrName === currentFilter.attrParent).list;
        if (parentFilterValuesList.length > 0) {
          //сформировать список на основе значений родителя
          let currentListValues = [];
          parentFilterValuesList.forEach(pV => {
            currentListValues.push(...currentFilter.listValues.filter(v => v.parentValue === pV).map(v => v.value));
          });
          // console.log('parentFilterValuesList', parentFilterValuesList, 'currentListValues', currentListValues)
          return currentListValues.sort((a, b) => a.localeCompare(b));
        }else{//если у родителя нет выбранных значений, то переходим к его родителю или возвращаем все доступные значения
          return currentFilter.listValues.map(v => v.value);
        }
      }else {//возвращаем все доступные значения
        return currentFilter.listValues.map(v => v.value);
      }


    // valuesDependentOnParent(f) {
    //   if (f.attrParent != null || this.filtersValues.filter((fV) => {if (fV.attrName === f.attrParent) {return fV} })?.[0]?.list[0] === 'all') {
    //     let newListValues = f.listValues.filter((v) => {if (this.filtersValues.filter((fV) => { if (fV.attrName === f.attrParent) {return fV } })[0].list[0] === v.parentValue) {return v}}).sort((a, b) => a.value.localeCompare(b.value));
    //     // console.log('newListValues', newListValues);
    //     let filterValue = this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })?.[0]?.list[0];
    //     //если текущее значение фильтра не null, но не попадает в диапазон допустимых значений из parent, то установить первое значение из подходящего диапазона
    //     if (filterValue != 'all') {
    //       // if  (!newListValues.map((v)=>{return v.value}).includes(filterValue)) {this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })[0].list[0] = 'all_0'}
    //       if  (!newListValues.map((v)=>{return v.value}).includes(filterValue)) {
    //
    //         this.filtersValues.filter((fV) => {if (fV.attrName === f.attrName) {return fV} })[0].list[0] = newListValues[0];
    //       }
    //     }
    //     return newListValues.length > 0 ? newListValues : 'all_1';
    //   } else {
    //
    //     return f.listValues.length > 0 ? f.listValues.sort((a, b) => a.value.localeCompare(b.value)) : 'all_2';
    //     // return f.listValues.length > 0 ? f.listValues.sort((a, b) => a['value'] > b['value'] ? 1 : -1) : 'all';
    //   }
    },
    onChangeCheckbox(currentAttrName) {
      let typeFilter = this.filters.find(v => v.attrName === currentAttrName).type;
      let currentFilterValue = this.filtersValues.find(v => v.attrName === currentAttrName);
      let currentFilter = this.filters.find(v => v.attrName === currentAttrName);
        if (typeFilter === 'select' || typeFilter === 'multiselect') {
          //если есть родители
          if (!!currentFilter.attrParent) {

            //присвоить первое значение из списка
            this.filtersValues.find(v => v.attrName === currentAttrName).list[0] = this.valuesDependentOnParent(currentFilter)[0];
          }else{//если нет родителя, то присваиваем первое значение из полного списка
            this.filtersValues.find(v => v.attrName === currentAttrName).list[0] = this.valuesDependentOnParent(currentFilter)[0];


          }

        }

        if (typeFilter === 'range') {
          currentFilterValue.list[0] = currentFilter.listValues[0];
          currentFilterValue.list[1] = currentFilter.listValues[1];
        }
        // currentFilterValue.list = [];
      this.onChangeFiltersValues(currentFilter);
    },
    onChangeFiltersValues(currentFilter) {
      //если есть дети
      // let childFilters = this.filters.filter(v=>v.attrParent === currentFilter.attrName);
      // console.log('currentFilter', currentFilter, 'childFilters', childFilters);
      // childFilters.forEach(cF=>{
      //   console.log();
      // });

      //если есть ровесники


      this.$emit('update:filtersValues');
      this.$emit('onChangeFiltersValues');
    },
  },
  mounted() {
    this.filters.forEach((_, i) => {
      this.collapsedFilters[i] = true;
    })
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
      cursor: pointer;
      user-select: none;
      //border: 1px solid hsl(0, 0%, 90%);
      .el-icon {
        transition: transform 0.2s ease;
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
