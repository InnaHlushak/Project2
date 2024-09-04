<template>
    <div class="container">
        <h3>Search in a random way</h3>
        <v-container  max-width="50vw" class="text-center"> 
            <v-row>
                <v-col>
                    <v-text-field 
                        v-model="count"
                        label="Quantity for random selection:" 
                        placeholder="1"  
                        type="number" min="1" max="100" 
                    />
                    <v-sheet v-if="!verifyCount" class="error"> 
                        {{ error }}
                    </v-sheet>
                    <v-btn 
                        v-show="verifyCount"
                        color="indigo" 
                        variant="tonal"  
                        @click="showItemsByCount()"
                    > 
                        Show {{ count }} items 
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <ItemsByCount v-if="show" :user-count="count" />
    </div>
</template>

<script>
    import ItemsByCount from '@/components/get-items/ItemsByCount.vue';

    export default {
        name: 'InputCountContainer',
        components: {
            ItemsByCount,
        },
        data() {
            return {
                count: 1,
                error: 'Value must be positive integer, no greater than 100',
                show: false,
            }
        },
        computed: {
            verifyCount() {
                if (!this.count || this.count <= 0 || this.count > 100) {
                    return false;           
                }

                return true;
            },
        },    
        methods: {
            showItemsByCount() {
                this.show = true;
            },
        },
        watch: {
            count(value) {
                this.show = false;
                this.count = value;
            },
        }
    }
</script>

<style scoped>
    .error {
        background-color: black;
        color: red;
    }
</style>