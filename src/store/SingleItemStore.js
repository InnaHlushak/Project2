import { defineStore } from 'pinia';

export const useSingleItemStore = defineStore('singleItemStore', {
    state: () => ({
        itemState: {},
    }),
    getters: {
        item: (state) => state.itemState,
    },
});