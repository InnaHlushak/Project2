export const mixinShowItems = {
    data() {
        return {
            error: 'Error',
            show: false,
        };
    },
    methods: {
        showItems() {
            this.show = true;
        },
    }
}