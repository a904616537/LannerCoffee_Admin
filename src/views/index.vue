<style scoped>
    .index {
        width      : 100%;
        position   : absolute;
        top        : 0;
        bottom     : 0;
        left       : 0;
        text-align : center;
    }
</style>
<template>
    <div class="index">
        <v-menu></v-menu>
    </div>
</template>
<script>
import Menu from '../template/menu'

export default {
    name: 'index',
    components : {
        'v-menu' : Menu,
    },
    methods: {
        handleStart() {
            this.$Modal.info({
                title: 'Bravo',
                content: 'Now, enjoy the convenience of iView.'
            });
        }
    }
};
</script>