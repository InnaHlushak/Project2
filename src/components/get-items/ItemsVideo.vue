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
                    v-model="page"
                    :length="paramsPagination.pages"
                ></v-pagination>
            </v-container>
        </div>
    </div>
</template>

<script>
// У стилі CompositionAPI
import { ref, toRefs, reactive, onMounted, watch} from 'vue'

//імпортувати store що створили у PINIA
import {useItemsVideoStore} from "../../store/ItemsVideoStore.js";
import {useApiStore} from "../../store/ApiStore.js";

export default {
    name: 'ItemsVideo',
    props: ['userPeriod'],
    // setup — це спеціальний хук, призначений для композиційного API
    //виконується перед створенням компонента, є точкою старту для Composition API
    setup(props) {
        // toRefs створює рективне посилання для вхідного параметра із props
        const { userPeriod } = toRefs(props);

        //доступ до сховищ
        const apiStore = useApiStore(); 
        const itemsVideoStore = useItemsVideoStore(); 

        //оновити стан сховища apiStore, врахувавши параметри задані користувачем
        const  setPeriod = () => {     
            apiStore.updatePeriod(userPeriod);
        };
       
        //створити реактивні змінні, обгортаючи кожну   в об’єкт ref із властивістю value
        const items = ref([]);
        const page = ref(1); //pagination page
        const list = ref([]); 
        //створити реактивний об'єкт (значення якого буде глибоко ректривним)
        const paramsPagination = reactive(itemsVideoStore.paramsPagination);

        //щоб  запит до АРІ спрацював коли компонент буде монтуватися треба звернутися до хукі життєвого циклу mounted
        onMounted( async() => {
            setPeriod();
            //надати items значення, отриманого із сховища itemsVideoStore
            await itemsVideoStore.getItems();
            items.value = itemsVideoStore.items; 
            itemsVideoStore.setParamsPagination();
            list.value = itemsVideoStore.paginatedList(page.value);
        });

        //встановити спостерігач на реактивну змінну page
        watch(page, (newValue) => {
            list.value = itemsVideoStore.paginatedList(newValue);
        });

        //все що повертається return є доступним у шаблоні компонента 
        //(та при потребі в інших частинах компонента (тобто поза setup))
        return {
            setPeriod,
            items,
            page,
            list,
            paramsPagination, 
        }
    }
}
</script>