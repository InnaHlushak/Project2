<template>
    <div class="container">
        <h3>You can easily find and view photos or videos</h3>
        <p :hidden="!!selected"> Choose a method of searching:</p>
        <CustomSelect @change-selected="changeSelected" />
        <InputCountContainer v-if="selected === 'Search in a random way'" />
        <InputDateContainer v-else-if="selected === 'Search by date'" />
        <InputPeriodContainer v-else-if="selected === 'Search by time period'" />
    </div>
</template>

<script>
    import CustomSelect from './CustomSelect.vue';
    import InputCountContainer from './InputCountContainer.vue';
    import InputDateContainer from './InputDateContainer.vue';
    import InputPeriodContainer from './InputPeriodContainer.vue';

    export default {
        name: 'InputsContainer',
        components: {
            CustomSelect,
            InputCountContainer,
            InputDateContainer,
            InputPeriodContainer,
        },
        data() {
            return  {
                selected: '',
                hidden: '',
            }
        },
        methods: {
            changeSelected(value) {
                this.selected = value;
            },
        },
    }
</script>