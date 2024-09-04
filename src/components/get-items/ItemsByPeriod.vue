<template>
    <div v-if="items.length" class="container">
        <div>
            <v-container>
                <v-row>
                    <v-col v-for="item in list" :key="item.date">
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
                list: [],
            }
        },
        computed: {
            //зробити доступними у компоненті змінні із відповідного сховища
            ...mapState(useItemsByPeriodStore, ['items','paramsPagination']),
        },
        //щоб  запит до АРІ спрацював коли компонент буде монтуватися треба звернутися до хукі життєвого циклу
        async mounted() {
            this.setPeriod();
            await this.getItems();
            this.setParamsPagination();
            this.list = this.paginatedList(this.page);
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
        watch: {
            page(value) {
                this.list = this.paginatedList(value);
            },
        },
    }
</script>