<style scoped>
</style>
<template>
    <div>
    	<Row>
    		<Col span="24">
    			<Card>
    				<Button type="primary" icon="refresh" @click="getList" :loading="loading">Refresh</Button>
    			</Card>
    		</Col>
    	</Row>
    	<Row>
    		<Col span="24">
    			<v-Table :propsHistoryData="propsHistoryData" :propsColumn="propsColumn" :loading="loading" :btns="btns"/>
    		</Col>
    	</Row>
    	<Modal title="Show Product" v-model="visible" width="850">
    		<Card v-if="showData">
    			<Row>
    				<div v-for="item in showData.order_item">
						<template>
							<Row>
								<Col span="6"><img style="width : 100px;" :src="item.product?item.product.img[0]:''"></Col>
								<Col span="18" class="padding-left-8">
									<b class="card-user-infor-name">{{item.product.name}}</b>
									<p>Price : {{item.price}}</p>
									<p>Number : {{item.number}}</p>
									<p>Subtotal : {{item.total}}</p>
								</Col>
							</Row>
						</template>
					</div>
    			</Row>
				<Row>
					<Col span="6"><p class="notwrap">订单号:</p></Col>
					<Col span="18" class="padding-left-8">{{showData._id}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">下单用户:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.user.name}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">供应商:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.supplier.name}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">总价:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.total}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">下单时间:</p></Col>
					<Col span="18" class="padding-left-8">{{moment(showData.createTime)}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">订单状态:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.status}}</Col>
				</Row>
    		</Card>
		</Modal>
    </div>
</template>
<script>
	import Vue                    from 'vue';
	import {mapState, mapActions} from 'vuex';
	import moment                 from 'moment';
	import VTable                 from '../../template/table';

    export default {
        components: { 
            VTable
        },
        data () {
            return {
				btns : [
					{type : 'info', title : 'Show', onClick : (index) => {
						this.showData = this.propsHistoryData[index].data;
						console.log('this.propsHistoryData[index]', this.propsHistoryData[index])
						this.visible = true;
					}},
					{type : 'error', title : 'Delete', onClick : (index) => {
						this.onRemove(this.propsHistoryData[index], () => {
							this.propsHistoryData.splice(index, 1);
						})
					}}
				],
				showData    : null,
				visible     : false,
				loading     : false,
				propsColumn : [{
					title    : '订单号',
					key      : '_id',
					sortable : true,
                },{
					title    : '用户',
					key      : 'user',
					sortable : true,
                },{
					title    : '供应商',
					key      : 'supplier',
					sortable : true,
                },{
					title    : 'Total',
					key      : 'total',
					sortable : true,
                },{
					title    : '状态',
					key      : 'status',
					sortable : true,
                },{
					title    : '下单时间',
					key      : 'CreateTime',
					sortable : true,
                }],
                propsHistoryData : []
            }
        },
		computed : mapState({
			token : state => state.User.token,
        }),
		methods : {
			onRemove(data, next) {
				next();
			},
			onShow(index) {
				this.showData = this.propsHistoryData[index];
				this.visible = true;
			},
			moment(date) {
				return moment(date).format('YYYY-MM-DD, h:mm:ss');
			},
			getList() {
				this.loading = true;
				setTimeout(() => {
					fetch(Vue.config.apiUrl + 'order?token=' + this.token, {
						method :'get',
		        	})
		        	.then(respone => respone.json())
		        	.then(result => {
		        		if(result.statusCode == 401) {
		        			this.$Message.error({
			        			content  : result.msg,
								duration : 2,
								closable : true
							})
		        		} else {
		        			this.propsHistoryData.splice(0, this.propsHistoryData.length);
		        			result.data.map(val => {
		        				this.propsHistoryData.push({
									_id        : val._id,
									user       : val.user.name,
									supplier : val.supplier.name,
									total      : val.total,
									status     : val.status,
									CreateTime : this.moment(val.createTime),
									data       : val
		        				})
		        				return val;
		        			})
		        		}
		        	})
		        	.catch(err => console.log('err', err))
		        	this.loading = false;
				}, 1000);
            },
        },
        created(){
        	this.getList()
        }
    }
</script>