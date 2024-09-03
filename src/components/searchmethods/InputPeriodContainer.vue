<template>
    <div class="container" >
        <h3>Search by time period</h3>
    <v-container max-width="50vw"  class="text-center"> 
            <v-row >
                <v-col>
                    <v-sheet  color="grey-darken-4">
                        <label for="inputStartDate"> Start date:</label>
                        <input type="date" id="inputStartDate" class="input-date" min="2014-01-01" max="2024-12-31" v-model="period.startDate"/>
                        <label for="inputEndDate"> End date:</label>
                        <input type="date" id="inputEndDate" class="input-date" min="2014-01-01" max="2024-12-31" v-model="period.endDate"/>
                    </v-sheet >
                    <v-sheet class="error" v-if="!verifyPeriod()"> 
                        {{ error }}
                    </v-sheet>
                    <v-btn  color="indigo" variant="tonal" v-show="verifyPeriod()" @click="showItemsByPeriod()"> 
                        Show items 
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
            <ItemsByPeriod :user-period="userPeriod"  v-if="show"/>
    </div>
</template>

<script>
    import ItemsByPeriod from '@/components/getitems/ItemsByPeriod.vue';

    export default {
        name: 'InputPeriodContainer',
        components: {
            ItemsByPeriod,
        },
        data() {
            return  {
                period: {
                    startDate: null,
                    endDate: null,
                },                
                error: '',
                show: false,
            }
        },
        computed: {
            userPeriod() {
                this.show = false;

                if (this.verifyPeriod()) {
                    return this.period;
                }

            return null;
            }
        },
        methods: {
            verifyPeriod() {
                let period = this.period;

                if(!(period.startDate && period.endDate)) {
                    this.error = 'Enter the date!';
                    this.show = false; 

                return false;           
                }

                return true;
            },
            showItemsByPeriod() {
                this.userPeriod;
                this.show = true;
            },
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


