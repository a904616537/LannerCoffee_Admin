<template>
    <div>
        <Row v-for="(item,index) in rowOrder" class="expand-row" :key="index">
            <Col span="8" v-for="(val, key) in item" :key="key" v-if="Object.keys(val)[0] != 'data'">
                <span class="expand-key">{{Object.keys(val)[0]}}: </span>
                <span class="expand-value">{{ Object.values(val)[0] }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                rowOrder : []   
            }
        },
        props: {
            row : Object
        },
        beforeMount() {
            let tmp = [];
            for(let key in this.row){
               tmp.push({[key] : this.row[key]});
            }
            let result = [];
            for(let i = 0,len = tmp.length; i < len; i += 3){
                result.push(tmp.slice(i , i+3));
            }
            this.rowOrder = result;
        }
    };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>