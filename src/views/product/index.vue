<style scoped>
</style>
<template>
    <div>
    	<Row>
    		<Col span="24">
    			<Card>
    				<Button type="primary" icon="plus" @click="onCreate">Add Bean</Button>
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
    				<div class="demo-upload-list" style="width: 100px;height: 100px;line-height: 100px;" v-for="item in showData.img">
						<template>
							<img :src="item">
						</template>
					</div>
    			</Row>
				<Row>
					<Col span="6"><p class="notwrap">商品名称:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.name}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">供应商:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.user.name}}</Col>
				</Row>
				<Row>
					<Col span="6"><p class="notwrap">单价:</p></Col>
					<Col span="18" class="padding-left-8">{{showData.price}}</Col>
				</Row>
				<Row v-for="(item, index) in showData.attribute" :key="index">
					<Col span="6"><p class="notwrap">{{item.title}}:</p></Col>
					<Col span="18" class="padding-left-8">{{item.content}}</Col>
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
					// {type : 'error', title : 'Delete', onClick : (index) => {
					// 	this.onRemove(this.propsHistoryData[index], () => {
					// 		this.propsHistoryData.splice(index, 1);
					// 	})
					// }}
				],
				showData    : null,
				visible     : false,
				loading     : false,
				propsColumn : [{
					title    : '商品名称',
					key      : 'name',
					sortable : true,
                },{
					title    : '价格',
					key      : 'price',
					sortable : true,
                },{
					title    : '种类',
					key      : 'category',
					sortable : true,
                },{
					title    : '供应商',
					key      : 'user',
					sortable : true,
                },{
					title    : '上传时间',
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
			onCreate() {
				this.$router.push({path : 'addProduct'})
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
					fetch(Vue.config.apiUrl + 'product?token=' + this.token, {
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
									name       : val.name,
									price      : val.price,
									category   : val.category,
									user       : val.user.name,
									user_id    : val.user._id,
									CreateTime : this.moment(val.CreateTime),
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