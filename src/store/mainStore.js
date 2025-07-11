import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import fromFileJSON from "@/data/Seventh_1816_3857_test.json";
import imagePaths from "@/data/images_empty.csv";
import fromFileBorder from "@/data/border_pgm_3857.json";


const smallImgPath = '300px/';
const largeImgPath = 'large/';
export default new Vuex.Store({
    state: {
        scheme: [
            {attrName: 'id', type: 'string', title: 'id', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 1, filterType: 'none', parentValueFrom: null, sortable: 0},
            {attrName: 'district', type: 'string', title: 'Страна', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 1, filterType: 'multiselect', parentValueFrom: null, sortable: 1},
            {attrName: 'region', type: 'string', title: 'Регион', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 1, filterType: 'multiselect', parentValueFrom: 'district', sortable: 1},
            {attrName: 'admunitmod', type: 'string', title: 'Район', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 1, filterType: 'multiselect', parentValueFrom: 'region', sortable: 1},
            {attrName: 'nameold', type: 'string', title: 'Наименование старое', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 0, filterType: 'multiselect', parentValueFrom: 'admunitmod', sortable: 1},
            {attrName: 'nameoldalt', type: 'string', title: 'Наименование старое альт.', inTable: 1, inCards: 1, colSize: 1.5, inDetails: 1, inMap: 0, filterType: 'multiselect', parentValueFrom: 'admunitmod', sortable: 1},
            {attrName: 'namemod', type: 'string', title: 'Наименование современное', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 1, filterType: 'multiselect', parentValueFrom: 'admunitmod', sortable: 1},
            {attrName: 'admunit1old', type: 'string', title: 'Административная единица 1', inTable: 1, inCards: 1, colSize: 3, inDetails: 1, inMap: 1, filterType: 'select', parentValueFrom: null, sortable: 1},
            {attrName: 'admunit2old', type: 'string', title: 'Административная единица 2', inTable: 1, inCards: 1, colSize: 4, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 1},
            {attrName: 'admunit3old', type: 'string', title: 'Административная единица 3', inTable: 1, inCards: 1, colSize: 6, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 1},
            {attrName: 'admunit4old', type: 'string', title: 'Административная единица 4', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 1},
            {attrName: 'admunit5old', type: 'string', title: 'Административная единица 5', inTable: 1, inCards: 1, colSize: 2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 1},
            {attrName: 'estate1', type: 'string', title: 'Сословие 1', inTable: 1, inCards: 1, colSize: 1.2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 0},
            {attrName: 'estate2', type: 'string', title: 'Сословие 2', inTable: 1, inCards: 1, colSize: 1.2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 0},
            {attrName: 'estate3', type: 'string', title: 'Сословие 3', inTable: 1, inCards: 1, colSize: 1.2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 0},
            {attrName: 'estate4', type: 'string', title: 'Сословие 4', inTable: 1, inCards: 1, colSize: 1.2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 0},
            {attrName: 'estate5', type: 'string', title: 'Сословие 5', inTable: 1, inCards: 1, colSize: 1.2, inDetails: 1, inMap: 0, filterType: 'select', parentValueFrom: null, sortable: 0},
            {attrName: 'estate_all', type: 'integer', title: 'Всего сословий', inTable: 1, inCards: 1.2, colSize: 1, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'male1', type: 'integer', title: 'ДМП', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'female1', type: 'integer', title: 'ДЖП', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'male2', type: 'integer', title: 'ДМП 2', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'female2', type: 'integer', title: 'ДЖП 2', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'male3', type: 'integer', title: 'ДМП 3', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'female3', type: 'integer', title: 'ДЖП 3', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'male4', type: 'integer', title: 'ДМП 4', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'female4', type: 'integer', title: 'ДЖП 4', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'male5', type: 'integer', title: 'ДМП 5', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'female5', type: 'integer', title: 'ДЖП 5', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'male_all', type: 'integer', title: 'ДМП все', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'female_all', type: 'integer', title: 'ДЖП все', inTable: 1, inCards: 1, colSize: 0.5, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
            {attrName: 'populall', type: 'integer', title: 'Население все', inTable: 1, inCards: 1, colSize: 0.58, inDetails: 1, inMap: 0, filterType: 'range', parentValueFrom: null, sortable: 0},
        ],
        geojson: null,
        imgs: [],
        filtersValues: [],
        sortingValues: {attrName: 'nameold', direction: 'asc'},
        currentID: '',
        geofeatures: [],
    },
    getters: {
        //фильтры построены на основе схемы, справочники для фильтров берутся из полного набора данных соответствующего раздела схемы
        filters: (state) => {
            if (!!state.geojson) {
                let newFilters = [];
                state.scheme.forEach((attr) => {
                    if (!state.geojson.features[0].properties.hasOwnProperty(attr.attrName)) {
                        console.log('Ожидаемый атрибут отсутствует во входящем json', attr.attrName);
                        return
                    }
                    if (attr.filterType === 'input') {
                        newFilters.push({
                            attrName: attr.attrName,
                            title: attr.title,
                            type: 'input',
                        });
                    }
                    if (attr.filterType === 'select') {
                        let listValues = [];
                        state.geojson.features.forEach(feature => {
                            if (feature.properties[attr.attrName] != null && feature.properties[attr.attrName] != '' && !listValues.map((v) => {
                                return v.value
                            }).includes(feature.properties[attr.attrName])) {
                                let newParentValue = null;
                                if (attr.parentValueFrom != null) {
                                    if (feature.properties[attr.parentValueFrom] != null && feature.properties[attr.parentValueFrom] != '') {
                                        newParentValue = feature.properties[attr.parentValueFrom];
                                    }
                                }

                                listValues.push({
                                    value: feature.properties[attr.attrName],
                                    parentValue: newParentValue
                                });
                            }
                        });
                        newFilters.push({
                            attrName: attr.attrName,
                            attrParent: attr.parentValueFrom,
                            title: attr.title,
                            type: 'select',
                            listValues: listValues.sort((a, b) => a.value.localeCompare(b.value))
                        });
                    }//select
                    if (attr.filterType === 'multiselect') {
                        let listValues = [];
                        state.geojson.features.forEach(feature => {
                            if (feature.properties[attr.attrName] != null && feature.properties[attr.attrName] != '' && !listValues.map((v) => {
                                return v.value
                            }).includes(feature.properties[attr.attrName])) {
                                let newParentValue = null;
                                if (attr.parentValueFrom != null) {
                                    if (feature.properties[attr.parentValueFrom] != null && feature.properties[attr.parentValueFrom] != '') {
                                        newParentValue = feature.properties[attr.parentValueFrom];
                                    }
                                }

                                listValues.push({
                                    value: feature.properties[attr.attrName],
                                    parentValue: newParentValue
                                });
                            }
                        });
                        newFilters.push({
                            attrName: attr.attrName,
                            attrParent: attr.parentValueFrom,
                            title: attr.title,
                            type: 'multiselect',
                            listValues: listValues.sort((a, b) => a.value.localeCompare(b.value))
                        });
                    }//multiselect
                    if (attr.filterType === 'range') {

                        let listValues = [];
                        let allValues=[];
                        state.geojson.features.forEach((feature)=>{
                            let value=feature.properties[attr.attrName];
                            if (!!value || value===0) allValues.push(value);
                        });
                        listValues.push(Math.min(...allValues));
                        listValues.push(Math.max(...allValues));
                        newFilters.push({
                            attrName: attr.attrName,
                            title: attr.title,
                            type: 'range',
                            listValues: listValues
                        });
                    }
                });
                return newFilters;
            }
        },
        filteredGeojson: (state, getters) => {//на основе значений фильтров
            if (!!state.geojson) {
                let newFeatures = [];
                state.geojson.features.forEach((item) => {
                    //проверить item на соответствие значениям фильтров
                    let filterPass = true;
                    state.filtersValues.forEach((fV) => {
                        if (fV.type === 'input') {
                            if (fV.list.length === 0 || !!fV.list[0] && item.properties[fV.attrName].toString().toLowerCase().includes(fV.list[0].toString().toLowerCase())) {
                            }else{
                                filterPass = false;
                            }
                        }
                        if (fV.type === 'select') {
                            if ((fV.list.length === 0 || !fV.list[0] || fV.list[0] === item.properties[fV.attrName])) {
                            }else{
                                filterPass = false
                            }

                        }
                        if (fV.type === 'multiselect') {
                            if ( fV.list.length===0 || fV.list.includes(item.properties[fV.attrName])) {

                            }else{
                                filterPass = false;
                            }
                        }

                        if (fV.type === 'range') {
                            if (fV.list?.length === 0 || (fV.list?.[0] <= item.properties[fV.attrName] && item.properties[fV.attrName] <= fV.list?.[1])) {

                            }else{
                                filterPass = false;
                            }
                        }

                    });
                    //сформировать отфильтрованный geojson
                    if (filterPass) {
                        newFeatures.push({
                            type: item.type,
                            properties: item.properties,
                            geometry: item.geometry,
                        });
                    }
                })
                return {
                    type: state.geojson.type,
                    name: state.geojson.name,
                    crs: state.geojson.crs,
                    features: getters.objAttrTypes[state.sortingValues['attrName']] === 'string' ? newFeatures.sort((a, b) => (state.sortingValues['direction'] === 'asc' ? 1: -1) * (a.properties[state.sortingValues['attrName']].toLowerCase() > b.properties[state.sortingValues['attrName']].toLowerCase() ? 1: -1)) : newFeatures.sort((a, b) => (state.sortingValues['direction'] === 'asc' ? 1: -1) * (a.properties[state.sortingValues['attrName']] > b.properties[state.sortingValues['attrName']] ? 1: -1)),
                }
            }
        },
        filteredImagesCards: (state, getters) => {
            let IDs = getters.filteredGeojson?.features.map(v => v.properties.id.toString());
            return state.imgs.filter(v => IDs.includes(v.id) && v['category'] === 'cards').map((v) => {
                return {
                    id: v.id,
                    img: {
                        small: `/assets/img/${v['path']}/${smallImgPath}${v['filename']}`,
                        large: `/assets/img/${v['path']}/${largeImgPath}${v['filename']}`,
                        // small: `@/assets/img/${v['path']}/${smallImgPath}${v['filename']}`,
                        // large: `@/assets/img/${v['path']}/${largeImgPath}${v['filename']}`,
                    }
                }
            });
        },
        detailsImgsByCategoriesByID: (state) => (id) => {
            if (!!state.imgs && state.imgs.length > 0) {
                let imgsObj = state.imgs.filter(v=>''+v.id === ''+id);
                return [...new Set(imgsObj.map(v => {
                    return v['category']
                }))]
                    .map((v) => {
                        return {
                            category: v, categoryTitle: imgsObj.filter((w) => {
                                if (w['category'] === v) {
                                    return w
                                }
                            })[0]['category_title'], imgs: imgsObj.filter((w) => {
                                if (w['category'] === v) {
                                    return w
                                }
                            }).sort((a, b) => {
                                return (a['order'] > b['order']) ? 1 : -1
                            }).map((s) => {
                                return {
                                    label: s['caption'],
                                    small: `/assets/img/${s['path']}/${smallImgPath}${s['filename']}`,
                                    large: `/assets/img/${s['path']}/${largeImgPath}${s['filename']}`
                                    // small: `@/assets/img/${s['path']}/${smallImgPath}${s['filename']}`,
                                    // large: `@/assets/img/${s['path']}/${largeImgPath}${s['filename']}`

                                }
                            })
                        }
                    })
            } else {
                return null
            }
        },
        detailsGeojsonByID: (state) => (id) => {
            let tempDetails = [];
            let findedFeature = state.geojson?.features.find(v => '' + v.properties.id === '' + id);
            if (!findedFeature) return null;
            state.scheme.forEach((item) => {
                if (item.inDetails === 1) {
                    if (item.hasOwnProperty('composite')) {
                        let result = [];
                        item.composite.children.forEach(v=> {if (!!findedFeature.properties[v])
                            result.push(findedFeature.properties[v])
                        });

                        tempDetails.push({
                            attrName: item.attrName,
                            titleName: item.title,
                            value: result.join(item.composite.delimiter)
                        });
                    } else {
                        tempDetails.push({
                            attrName: item.attrName,
                            titleName: item.title,
                            value: findedFeature.properties[item.attrName]
                        });
                    }
                }
            });
            return tempDetails
        },
        currentFeature(state, getters) {
            if (!state.currentID || !getters.filteredGeojson.features || getters.filteredGeojson.features.length === 0 || !getters.filteredGeojson.features[0]) return null;

            let newFeature = getters.filteredGeojson.features.find(v => ''+v.properties.id.toString() === state.currentID.toString());
            if (!!newFeature) {
                return {
                    type: getters.filteredGeojson.type,
                    name: getters.filteredGeojson.name,
                    crs: getters.filteredGeojson.crs,
                    features: [getters.filteredGeojson.features.find(v => v.properties.id === state.currentID)],
                }
            } else {
                return null
            }
        },
        oneFeatureForMaps(state, getters) {
            if (!!getters.currentFeature) {
                let newProperties = {};
                state.scheme.forEach((item) => {
                    if (item.inMap === 1) {
                        newProperties[item.attrName] = getters.currentFeature.features[0].properties[item.attrName];
                    }
                });
                return {
                    type: getters.currentFeature.type,
                    name: getters.currentFeature.name,
                    crs: getters.currentFeature.crs,
                    features: [{
                        type: getters.currentFeature.features[0].type,
                        properties: newProperties,
                        geometry: getters.currentFeature.features[0].geometry,
                    }],
                }
            } else return null
        },
        collectionFeaturesForMaps(state, getters) {
            if (!!getters.filteredGeojson && !!getters.filteredGeojson.features) {
                let newFeatures = getters.filteredGeojson.features.filter(v=>v.geometry.coordinates[0] !== 0.0 && v.geometry.coordinates[1] !== 0.0).map((feature) => {
                    let newProperties = {};
                    state.scheme.forEach((item) => {
                        if (item.inMap === 1) {
                            newProperties[item.attrName] = feature.properties[item.attrName];
                        }
                    });
                    return {
                        type: feature.type,
                        properties: newProperties,
                        geometry: feature.geometry,
                    }
                });
                return newFeatures.length>0 ? {
                    type: getters.filteredGeojson.type,
                    name: getters.filteredGeojson.name,
                    crs: getters.filteredGeojson.crs,
                    features: newFeatures,
                    // features: !!getters.oneFeatureForMaps ? newFeatures.filter(v=>v.properties.id !== getters.oneFeatureForMaps.features?.[0].properties?.id) : newFeatures,
                } : null
            }
        },
        //Возвращает query в виде json на основе filterValues
        getURLQueryJSON(state, commit) {
            let filters = {};
            state.filtersValues.forEach((v)=>{if (!!v.list) filters[v.attrName] = v.list});
            // if (Object.keys(state.sortingValues).length===0) commit('setSortingValues', {attrName: 'nameold', direction: 'asc'});
            let sortName = state.sortingValues.attrName;
            let sortDirection = state.sortingValues.direction;
            let order={};
            order[sortName] = sortDirection;
            return {filters: JSON.stringify(filters), order: JSON.stringify(order)};
        },

        // объект, в котором ключ - имя атрибута, а значение - его тип
        objAttrTypes: (state) => {
            return Object.fromEntries(state.scheme.map(v => [v.attrName, v.type]));
        },

},
    mutations: {
        setGeojson(state, v) {
            state.geojson = v
        },
        setImgs(state, v) {
            state.imgs = v
        },
        setFiltersValues(state, v) {
            state.filtersValues = v;
        },
        setSortingValues(state, v) {
            // state.sortingValues = v;
            setTimeout(()=>state.sortingValues = v, 50);

        },
        setCurrentID(state, v) {
            state.currentID = v;
        },
        //устанавливает значения фильтров и сортировки из query
        setFromURLQuery(state, v) {
            try {
                let filters = JSON.parse(v.filters);

                if (!!filters && Object.keys(filters).length>0) {
                    state.filtersValues.forEach((w) => {

                        if (filters.hasOwnProperty(w.attrName)) {
                            w.list = filters[w.attrName];
                        }
                    });
                }
            } catch {
                alert('Проверьте корректность ссылки');
                this.$store.dispatch('initFiltersValues');
            }
            try {
                let order = JSON.parse(v.order);
                state.sortingValues.attrName = Object.keys(order)[0];
                state.sortingValues.direction = Object.values(order)[0];
            } catch {
                alert('Проверьте корректность ссылки');
                this.$store.dispatch('initSortingValues');
            }
        },
        addGeofeature(state, v) {
            state.geofeatures.push(v);
        },

    },
    actions: {
        loadObjsStore({state, getters, commit}) {
            try {
                let newGeojson = fromFileJSON;

                newGeojson.features = newGeojson.features.map((v) => {
                    return {
                        type: v.type,
                        properties: Object.fromEntries(Object.entries(v.properties).map(([key, value]) => {
                            //переводим все значения ключей в нижний регистр
                            let newKey = key.toLowerCase();
                            let newValue = value;
                            //приводим типы к тем, что указаны в шаблоне
                            if (getters.objAttrTypes[key] === 'string') {
                                if (!newValue) {
                                    newValue = ''
                                }else {
                                    if (typeof (newValue) != 'string') {
                                        newValue = newValue.toString();
                                    }else{
                                        newValue = newValue.trim();
                                    }
                                }
                            }
                            if (getters.objAttrTypes[key] === 'integer') {
                                if (!newValue) newValue = 0;
                                if (typeof(newValue) != 'number') newValue = parseInt(newValue);
                            }

                            return [newKey, newValue]
                        })),
                        geometry: v.geometry,
                    }
                });

                //убрать все объекты с нулевыми координатами
                // newGeojson.features = newGeojson.features.filter(v=>v.geometry.coordinates[0] !== 0.0 && v.geometry.coordinates[1] !== 0.0);
                commit('setGeojson', newGeojson);
            } catch (e) {
                alert('Ошибка загрузки файла');
            }

        },
        loadImagesCSV({commit}) {
            if (imagePaths.length === 0) return;
            let titles=Object.keys(imagePaths[0])[0].split(';');
            let lines = imagePaths.map((v=>Object.values(v)[0]));
            if (lines.length > 1) {
                let newImgs = [];
                lines.forEach((v) => {
                    let img = {};
                    if (v.replaceAll(' ', '') != '') {
                        let line = v.split(';');
                        for (let i = 0; i < line.length; i++) {
                            img[titles[i].toLowerCase()] = line[i];
                        }
                        newImgs.push(img);
                    }
                });
                commit('setImgs', newImgs);
            }
        },
        initFiltersValues({state, getters, dispatch}) {
            if (!!getters.filters && state.filtersValues.length===0) {
                dispatch('clearFiltersValues');
            }
        },
        clearFiltersValues({commit, getters}) {
                commit('setFiltersValues', getters.filters.map((v) => {
                    let newList = [];
                    if (v.type==='input') newList = [];
                    if (v.type==='select') newList = [];
                    if (v.type==='multiselect') newList = [];
                    if (v.type==='range') newList = [v.listValues[0], v.listValues[1]];
                    return {attrName: v.attrName, type: v.type, isActive: false, list: newList}
                }));
        },
        initSortingValues({state, commit}) {
            if (Object.keys(state.sortingValues).length===0) commit('setSortingValues', {attrName: 'nameold', direction: 'asc'});
        },
        initGeofeatures({commit}) {
            try {
                commit('addGeofeature', fromFileBorder);
            } catch (e) {
                alert('Ошибка загрузки файла geofeature');
            }
        },
    },
    modules: {},
    // plugins: [createPersistedState({key: 'spatialObjs', paths: ['filtersValues', 'sortingValues']})],
    namespaced: true,
})
