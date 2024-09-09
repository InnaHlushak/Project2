<template>
    <div class="container">
        <h3>Search videos</h3>
        <v-container max-width="50vw" class="text-center">
            <v-row>
                <v-col>
                    <!-- тут застосовано користувальницьку директиву v-highlight -->
                    <v-sheet v-highlight class="cursor-pointer">
                        <label for="inputStartDate">Start date:</label>
                        <input
                            v-model="period.startDate"
                            type="date"
                            id="inputStartDate"
                            class="input-date"
                            min="2014-01-01"
                            max="2024-12-31"
                        />
                        <label for="inputEndDate">End date:</label>
                        <input
                            v-model="period.endDate"
                            type="date"
                            id="inputEndDate"
                            class="input-date"
                            min="2014-01-01"
                            max="2024-12-31"
                        />
                    </v-sheet>
                    <v-sheet v-if="!verifyPeriod" class="error">
                        {{ error }}
                    </v-sheet>
                    <v-btn
                        v-show="verifyPeriod"
                        color="indigo"
                        variant="tonal"
                        @click="showItems()"
                    >
                        Show items 
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <ItemsVideo v-if="show" :user-period="period" />
    </div>
</template>

<script>
    import ItemsVideo from '@/components/get-items/ItemsVideo.vue';
    import mixinShowItems from '@/mixins/mixinShowItems';

    export default {
        name: 'InputVideoContainer',
        mixins: [mixinShowItems],
        components: {
            ItemsVideo,
        },
        data() {
            return  {
                period: {
                    startDate: null,
                    endDate: null,
                },                
                error: 'Enter the date!',
                //винесено у mixin
                //show: false,
            }
        },
        computed: {
            verifyPeriod() {
                return this.period.startDate && this.period.endDate;
            }
        },
        //винесено у mixin   
        //methods: {
            // showItems() {
            //     this.show = true;
            // },
        //},
        watch: {
            period: {
                handler(value) {
                    this.show = false;
                    this.period = value;
                },
            deep: true
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