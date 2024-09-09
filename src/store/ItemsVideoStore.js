//Store у стилі CompositionAPI
import {ref, reactive, computed} from 'vue';

import {defineStore} from 'pinia';
import axiosInstance from '../../services/axios.js';
import {useApiStore} from './ApiStore.js';

//створити інстанс(екземпляр) сховища 
//експортувати щоб використовувати його в компонентах
export const useItemsVideoStore = defineStore('itemsVideo', () => {
    //стан
    const urlApi = ref('');
    const itemsState = ref([]);
    const pagination = reactive({
        page: 1,
        total: '',
        perPage: 3,
        pages: '',
    });

    //геттери (обгортаються в computed-властивості)
    const items = computed (() => {
        let itemsVideo  = itemsState.value.filter(item => (item.media_type === "video" && item.thumbnail_url != ""));
        if (!itemsVideo.length) {
            alert("Sorry! No videos found for this period!");
        }

        return itemsVideo;
    });

    const paramsPagination = computed(() => {return pagination});

    //дії (функції)
    //зокрема для  виконання асинхронних запитів:  отримання даних  з стороннього API
    const getItems = async() => {
        try {
            const ApiStore = useApiStore();
            urlApi.value = ApiStore.urlApiByPeriod;
            const response = await axiosInstance.get(urlApi.value);
            itemsState.value = response.data;
        } catch(error) {
            itemsState.value.splice(0,itemsState.value.length);
            alert("Sorry! Error! " + error.message + " Specify another time period or try again");
        }
    };

    //зокрема для  пагінації списку  отримання даних  
    const setParamsPagination = () => {
        pagination.total = items.value.length;
        pagination.pages = Math.ceil(items.value.length / pagination.perPage);            
    };

    const paginatedList = (page) => {
        pagination.page = page;
        const sublist = items.value;
        const startIndex = (page - 1) * pagination.perPage;
        const endIndex = startIndex + pagination.perPage;

        return sublist.slice(startIndex, endIndex);
    };

    return {
        items,
        getItems,
        paramsPagination,
        setParamsPagination,
        paginatedList,
    }
});
