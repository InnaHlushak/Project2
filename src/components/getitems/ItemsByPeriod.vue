<template v-if="itemsByPeriod.length">
    <div class="container">
        <h5>The following  items were found matching your request:</h5>
        <div>
            <v-container >
                <v-row>
                    <v-col 
                        v-for="(item, date) in paginationListItems" :key="item.date"
                    >
                        <ItemCard :item="item" />
                    </v-col>
                </v-row>
                <v-pagination
                    v-if="paramsPagination.pages > 1"
                    v-model="this.page"
                    :length="paramsPagination.pages"
                ></v-pagination>
            </v-container>
        </div>
    </div>
</template>

<script>
    //імпортувати store який створили у PINIA
    //те необхідні функції для роботи із store
    import {useItemsByPeriodStore} from "../../store/ItemsByPeriodStore.js";
    import {useApiStore} from "../../store/ApiStore.js";
    import {mapActions, mapState} from "pinia";

    export default {
        name: 'ItemsByPeriod',
        props: ['userPeriod'],
        data() {
            return  {
                page: 1, //pagination page
            }
        },
        computed: {
            //зробити доступними у компоненті змінні із відповідного сховища
            ...mapState(useApiStore, ['urlApiByPeriod']),
            ...mapState(useItemsByPeriodStore, ['items','paramsPagination']),
            
            //зробити пагінацію списку отриманих елементів
            paginationListItems() {
                let list = [];   
                this.setParamsPagination();
                list =  this.paginatedList(this.page);
                return list;
           }
        },
        //щоб  запит до АРІ спрацював коли компонент буде монтуватися треба звернутися до хукі життєвого циклу
        mounted() {
            this.setPeriod();
            this.getItems();
        },
        methods: {
           //зробити доспупними у компоненті функції(дії) із відповідного сховища 
           ...mapActions(useApiStore, ['updatePeriod']),
           ...mapActions(useItemsByPeriodStore, ['getItems','setParamsPagination','paginatedList']),

           //оновити стан сховища, врахувавши параметри задані користувачем
           setPeriod() {
            this.updatePeriod(this.userPeriod);
           },
        },
    }
</script>