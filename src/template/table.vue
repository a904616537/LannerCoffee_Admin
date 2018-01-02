<template>
    <div>
      <Table :columns="columns" :data="historyData" :loading="loading"></Table>
      <Page :total="propsHistoryData.length" :page-size="pageSize" size="small" show-total class="paging" @on-change="changepage"></Page>
    </div>
</template>
<style scoped>
  .paging{
      float  : right;
      margin : 10px 10px 20px;
  }
</style>
<script>
    import expandRow from './expand-row.vue';
    export default {
        components: { 
            expandRow 
        },
        data () {
            return {
                ajaxHistoryData : [],
                dataCount       : 0,
                pageSize        : 15,
                historyColumns  : [],
                historyData     : []
            }
        },
        props: {
            loading : {
                type    : Boolean,
                default : false
            },
            btns : {
                type    : Array,
                default : () => {
                    return [
                        {type : 'info', title : 'Show', onClick : (index) => {console.log('show', index)}},
                        {type : 'error', title : 'Delete', onClick : (index) => {console.log('delete', index)}}
                    ]
                }
            },
            propsColumn : {
                type    : Array,
                default : () => {
                    return [{
                        title    : '暂无',
                        key      : 'key',
                        sortable : false,
                    }]
                }
            },
            propsHistoryData : {
                type    : Array,
                default : () => {
                    return [
                    ]
                }
            },
            onShow : {
                type    : Function,
                default : (data) => {
                    console.log('show data', data);
                }
            },
            onRemove : {
                type : Function,
                default : (data, next) => {
                    console.log('remove data', data);
                }
            }
        },
        methods:{
            // 获取历史记录信息
            handleListApproveHistory(){
                // 保存取到的所有数据
                this.ajaxHistoryData = this.propsHistoryData
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.propsHistoryData.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
            },
            changepage(index){
                var _start       = ( index - 1 ) * this.pageSize;
                var _end         = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },
            show (index) {
                this.onShow(this.historyData[index])
                // this.$Modal.info({
                //     title: '用户信息',
                //     content: `姓名：${this.historyData[index].name}<br>年龄：${this.historyData[index].age}<br>地址：${this.historyData[index].address}`
                // })
            },
            remove (index) {
                this.onRemove(this.historyData[index], () => {
                    this.historyData.splice(index, 1);
                })
            },
        },
        computed : {
            columns() {
                let column = [{
                    type: 'expand',
                    width: 50,
                    render : (h, params) => {
                        return h(expandRow, {
                            props: {
                                row : params.row
                            }
                        })
                    }
                },
                ...this.propsColumn,
                {
                    title : '操作',
                    key   : 'action',
                    width : 150,
                    align : 'center',
                    render: (h, params) => {
                        const btns = this.btns.map(val => {
                            return h('Button', {
                                props: {
                                    type : val.type,
                                    size : 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click : () => val.onClick(params.index)
                                }
                            }, val.title)
                        })
                        return h('div', btns);
                    }
                }];
                return column;
            }
        },
        created(){
             this.handleListApproveHistory();
        }
    }
</script>