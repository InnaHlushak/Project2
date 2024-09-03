<template>
    <div class="container">
        <h3>Search by date</h3>
        <v-container max-width="50vw"  class="text-center"> 
            <v-row >
                <v-col>
                    <v-sheet  color="grey-darken-4">
                        <label for="inputDate">Date:</label>
                        <input type="date" id="inputDate" class="input-date" min="2014-01-01" max="2024-12-31" v-model="date"/>
                    </v-sheet >
                    <v-sheet class="error" v-if="!verifyDate()"> 
                        {{ error }}
                    </v-sheet>
                    <v-btn  color="indigo" variant="tonal" v-show="verifyDate()" @click="showItemsByDate()"> 
                        Show item 
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
            <ItemsByDate :user-date="userDate"  v-if="show"/>
    </div>
</template>

<script>
    import ItemsByDate from '@/components/getitems/ItemsByDate.vue';

    export default {
        name: 'InputDateContainer',
        components: {
            ItemsByDate,
        },
        data() {
            return  {
                date: null,
                error: '',
                show: false,
            }
        },
        computed: {
            userDate() {
                this.show = false;

                if (this.verifyDate()){
                    return this.date;
                }

                return null;
            }
        },
        methods: {
            verifyDate() {
                let date = this.date;

                if(!date) {
                    this.error = 'Enter the date!';
                    this.show = false;            
                return false;           
                }
                return true;
            },
            showItemsByDate() {
                this.userDate;
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


