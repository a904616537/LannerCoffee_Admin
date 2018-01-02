<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<style>
.ivu-row {
    margin: 15px 0;
}
</style>
    
<script>
    import Vue from 'vue';
    import {mapState, mapActions} from 'vuex';

    export default {
        data() {
            return {
            }
        },
        mixins : [{
            created() {
                if(this.islogin == false) {
                    this.$router.replace({path : 'login'})
                }
            }
        }],
        computed : mapState({
            islogin : state => state.User.isLogin
        }),
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {

        }
    };
</script>