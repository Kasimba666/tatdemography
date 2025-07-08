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
          <div class="filter-body"
               v-if="visibleFilters[f]"
          >
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
      collapsedFilters: {},
      visibleFilters: {},
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
      this.collapsedFilters[index] = !this.collapsedFilters[index];

      if (!this.collapsedFilters[index]) {
        // раскрываем — сразу показываем
        this.visibleFilters[index] = true;
      } else {
        // скрываем — убираем после завершения анимации (примерно 300–350мс)
        setTimeout(() => {
          this.visibleFilters[index] = false;
        }, 350);
      }
    },

    updateDependentFiltersRecursively(parentAttrName) {
      const parentFilterValue = this.filtersValues.find(v => v.attrName === parentAttrName)?.list || [];

      // Найти все фильтры, у которых указан текущий фильтр как родитель
      const childFilters = this.filters.filter(f => f.attrParent === parentAttrName);
      childFilters.forEach(childFilter => {
        const childAttr = childFilter.attrName;
        const childFilterValues = this.filtersValues.find(v => v.attrName === childAttr);
        if (!childFilterValues) return;

        // Получить допустимые значения в зависимости от выбранных значений в родителе
        const allowedValues = childFilter.listValues
            .filter(v => parentFilterValue.length === 0 || parentFilterValue.includes(v.parentValue))
            .map(v => v.value)
            .sort((a, b) => a.localeCompare(b));


        // Удалить из списка выбранных значений те, которые больше не допустимы
        childFilterValues.list = childFilterValues.list.filter(v => allowedValues.includes(v));
        // Рекурсивно применить то же правило к потомкам текущего фильтра
        this.updateDependentFiltersRecursively(childAttr);
      });
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

    },

    onChangeFiltersValues(currentFilter) {
      // Обновить потомков, если есть
      this.updateDependentFiltersRecursively(currentFilter.attrName);

      this.$emit('update:filtersValues');
      this.$emit('onChangeFiltersValues');
    },
  },
  mounted() {
    this.filters.forEach((_, i) => {
      this.collapsedFilters[i] = true;
      this.visibleFilters[i] = false;
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
        transition: transform 0.5s ease;
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
