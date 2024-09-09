<template>
    <div class="container">
        <h3>Search by date</h3>
        <v-container max-width="50vw"  class="text-center"> 
            <v-row>
                <v-col>
                    <!-- тут застосовано користувальницьку директиву v-highlight -->
                    <v-sheet v-highlight class="cursor-pointer">
                        <label for="inputDate">Date:</label>
                        <input 
                            v-model="date"
                            type="date" 
                            id="inputDate" 
                            class="input-date" 
                            min="2014-01-01" 
                            max="2024-12-31" 
                        />
                    </v-sheet>
                    <!-- </v-sheet> -->
                    <v-sheet v-if="!verifyDate" class="error"> 
                        {{ error }}
                    </v-sheet>
                    <v-btn 
                        v-show="verifyDate"
                        color="indigo" 
                        variant="tonal" 
                        @click="showItems()"
                    > 
                        Show item
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
            <ItemsByDate v-if="show" :user-date="date" />
    </div>
</template>

<script>
    import ItemsByDate from '@/components/get-items/ItemsByDate.vue';
    import mixinShowItems from '@/mixins/mixinShowItems';

    export default {
        name: 'InputDateContainer',
        mixins: [mixinShowItems],
        components: {
            ItemsByDate,
        },
        data() {
            return  {
                date: null,
                error: 'Enter the date!',
                //винесено у mixin 
                //show: false, 
            }
        },
        computed: {
            verifyDate() {
                return this.date;
            },
        },
        //винесено у mixin 
        // methods: {
        //     showItems() {
        //         this.show = true;
        //     },
        // },
        watch: {
            date(value) {
                this.show = false;
                this.date = value;
            }
        }
    }
</script>

<style scoped>
    .error {
        background-color: black;
        color: red;
    }

    .input-date {
        background-color: rgba(23, 23, 23, 0.203);
        border: 1px solid white;
        border-radius: 2px;
        color:white;    
        margin: 10px;
        padding: 5px 10px;  
        font-size: 15px;     
    }
</style>