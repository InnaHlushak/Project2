import {defineStore} from 'pinia';

//створити інстанс(екземпляр) useApiStore сховища 
//експортувати щоб використовувати його в компонентах
export const useApiStore = defineStore('ApiStore', {
    //описати стан
    state: () => ({
        API_KEY: "4ZOCEAdAoacmoaJHdEnQeIMDwsxFYAR8V7qYMddQ",
        count: 1,
        date: null,
        period: {
            startDate: null,
            endDate: null,
        }, 
    }),
    getters: {
        //отримання відповідного url  API
        urlApiByCount(state) {
            return `/planetary/apod?api_key=${state.API_KEY}&count=${state.count}&thumbs=True`;
        },
        urlApiByDate(state) {
            return `/planetary/apod?api_key=${state.API_KEY}&date=${state.date}&thumbs=True`;
        },
        urlApiByPeriod(state) {
            return `/planetary/apod?api_key=${state.API_KEY}&start_date=${state.period.startDate}&end_date=${state.period.endDate}&thumbs=True`;
        },
    },
    //події використовуються  для зміни стану 
    actions: {
        //зокрема для задання/оновлення count  
        updateCount(userCount) {
           this.count = userCount;
        }, 
        //зокрема для задання/оновлення date  
        updateDate(userDate) {
            this.date = userDate;
        }, 
         //зокрема для задання/оновлення period  
         updatePeriod(userPeriod) {
            this.period = userPeriod;
        }, 
    }
});    