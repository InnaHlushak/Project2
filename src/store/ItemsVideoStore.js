//Store у стилі CompositionAPI
import {ref, computed} from 'vue';

import {defineStore} from 'pinia';
import axiosInstance from '../../services/axios.js';
import {useApiStore} from './ApiStore.js';

//створити інстанс(екземпляр) сховища 
//експортувати щоб використовувати його в компонентах
export const useItemsVideoStore = defineStore('itemsVideo', () => {
    //стан
    const urlApi = ref('');
    const itemsState = ref([]);
    const pagination = ref({
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

    const paramsPagination = computed(()  => {return pagination.value});

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
        pagination.value.total = items.value.length;
        pagination.value.pages = Math.ceil(items.value.length / pagination.value.perPage);            
    };

    const paginatedList = (page) => {
        pagination.value.page = page;
        const sublist = items.value;
        const startIndex = (page - 1) * pagination.value.perPage;
        const endIndex = startIndex + pagination.value.perPage;

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
