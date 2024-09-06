<template>
    <div class="container" >
        <!-- Маршрут, який використовує динамічний параметр, і виводьте його в компоненті. -->
        <h3> {{ $route.params.title }}</h3>
        <div>
            <v-btn  color="orange" variant="tonal" @click="redirectToPrevious">Go to the previous</v-btn>
        </div>
        <div>
            <ItemDescriptionSlots v-if="item">
                <!-- компонент з декількома іменованими слотами -->
                <template v-slot:copyright>
                    <b>Copyright:</b> {{ (item.copyright) ? item.copyright : 'NASA and in the public domain' }} 
                </template>
                <template v-slot:date>
                    <b>Date:</b> {{ item.date }} 
                </template>
                <template v-slot:explanation>
                    <b>Explanation:</b> {{ item.explanation }} 
                </template>
                <template v-if="isImage" v-slot:image>
                    <v-img 
                        :src="itemUrl"
                        width="730" height="500" cover
                    ></v-img>
                </template>
                <template v-if="isVideo" v-slot:video>
                    <div>
                        <iframe  
                            :src="itemUrl"
                            width="730" height="500" 
                            frameborder="0" allow="autoplay; encrypted-media" 
                            allowfullscreen
                        ></iframe>
                    </div>
                </template>
            </ItemDescriptionSlots>
        </div>
    </div>
</template>

<script>
import {useSingleItemStore} from "../store/SingleItemStore.js";
import ItemDescriptionSlots from "./ItemDescriptionSlots.vue";

export default {
    name: 'ItemDescription',
    components: {
        ItemDescriptionSlots,
    },
    props: ['title'], //щоб параметр шляху title передавався як props до компонента,

    data() {
        return {
            item: null,
        }
    },
    computed: {
        itemUrl() {
            return this.item.url;
        },
        isImage() {
            return (this.item.media_type === "image");
        },
        isVideo() {
            return (this.item.media_type == "video" &&  this.item.thumbnail_url !== "");
        },
    },
    mounted() {
        this.getItemFromStore();
    },
    methods: {
        getItemFromStore() {
            this.item = useSingleItemStore().item;
        },
        redirectToPrevious() {
            //повернутися до попереднього запису в історії маршрутів
            this.$router.back();
        },
    }
}
</script>