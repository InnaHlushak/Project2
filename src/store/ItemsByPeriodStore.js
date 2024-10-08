import {defineStore} from 'pinia';
import axiosInstance from '../../services/axios.js';
import {useApiStore} from './ApiStore.js';

//створити інстанс(екземпляр) сховища 
//експортувати щоб використовувати його в компонентах
export const useItemsByPeriodStore = defineStore('itemsByPeriod', {
    //описати стан
    state: () => ({
        urlApi: '',
        itemsState: [],
        pagination: {
            page: 1,
            total: '',
            perPage: 3,
            pages: '',
        },
    }),
    //щоб отримувати дані  із стану створити геттери
    getters: {
        items: (state) => state.itemsState,
        paramsPagination: (state) => state.pagination,      
    },
    //події використовуються  для зміни стану 
    actions: {
        //зокрема для  виконання асинхронних запитів:  отримання даних  з стороннього API
        async getItems() {
            try {
                const ApiStore = useApiStore();
                this.urlApi = ApiStore.urlApiByPeriod;
                const response = await axiosInstance.get(this.urlApi);
                this.itemsState = response.data;
            } catch(error) {
                this.itemsState.splice(0,this.itemsState.length);
                alert("Sorry! Error! " + error.message + " Specify another time period or try again");
            }
        },
        //зокрема для  пагінації списку  отримання даних  
        setParamsPagination() {
            this.pagination.total = this.items.length;
            this.pagination.pages = Math.ceil(this.items.length / this.pagination.perPage);            
        },
        paginatedList(page) {
            this.pagination.page = page;
            const sublist = this.items;
            const startIndex = (page - 1) * this.pagination.perPage;
            const endIndex = startIndex + this.pagination.perPage;

            return sublist.slice(startIndex, endIndex);
        },
    }    
})