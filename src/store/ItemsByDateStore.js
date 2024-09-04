import {defineStore} from 'pinia';
import axiosInstance from '../../services/axios.js';
import {useApiStore} from './ApiStore.js';

//створити інстанс(екземпляр) сховища 
//експортувати щоб використовувати його в компонентах
export const useItemsByDateStore = defineStore('itemsByDate', {
    //описати стан
    state: () => ({
        urlApi: '',
        itemsState: {},
    }),
    //щоб отримувати дані  із стану створити геттери
    getters: {
        items: (state) => state.itemsState,
    },
    //події використовуються  для зміни стану 
    actions: {
        //зокрема для  виконання асинхронних запитів: отримання даних  з стороннього API
        async getItems() {
            try {
                const ApiStore = useApiStore();
                this.urlApi = ApiStore.urlApiByDate;
                const response = await axiosInstance.get(this.urlApi);
                this.itemsState = response.data;
            } catch(error) {
                this.itemsState = null;
                alert("Sorry! Error! " + error.message + " Enter another date or try again");
            }
        },
    }    
})