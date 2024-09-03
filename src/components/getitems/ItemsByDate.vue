<template >
    <div class="container">
        <h5>The following  item was found matching your request:</h5>
        <div>
            <v-container >
                <v-row>
                    <v-col>
                        <ItemCard :item="items"/>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    //імпортувати store який створили у PINIA
    //те необхідні функції для роботи із store
    import {useItemsByDateStore} from "../../store/ItemsByDateStore.js";
    import {useApiStore} from "../../store/ApiStore.js";
    import {mapActions, mapState} from "pinia";

    export default {
        name: 'ItemsByDate',
        props: ['userDate'],
        computed: {
            //зробити доступними у компоненті змінні із відповідного сховища
            ...mapState(useApiStore, ['urlApiByDate']),
            ...mapState(useItemsByDateStore, ['items']),
        },
        //щоб  запит до АРІ спрацював коли компонент буде монтуватися треба звернутися до хукі життєвого циклу
        mounted() {
            this.setDate();
            this.getItems();
        },
        methods: {
            //зробити доспупними у компоненті функції(дії) із відповідного сховища 
            ...mapActions(useApiStore, ['updateDate']),
            ...mapActions(useItemsByDateStore, ['getItems']),

            //оновити стан сховища, врахувавши параметри задані користувачем
            setDate() {
            this.updateDate(this.userDate);
            },
        },
    }
</script>