<template>
    <v-card class="mx-auto" max-width="100vw" color="black">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <slot name="image"></slot>
                        <slot name="video"></slot>
                        <v-sheet color="grey-darken-4" width="25vw">
                            <v-card-subtitle>
                                <slot name="date"></slot>
                            </v-card-subtitle>
                            <v-card-subtitle>
                                <slot name="copyright"></slot>
                            </v-card-subtitle>
                            <v-card-text>
                                <slot name="explanation"></slot>
                            </v-card-text>
                        </v-sheet>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'ItemDescriptionSlots',
}
</script>