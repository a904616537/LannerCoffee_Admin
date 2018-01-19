<style scoped>
.avator-img {
	display   : block;
	width     : 80%;
	max-width : 100px;
	height    : auto;
}
.line-gray {
    height: 0;
    border-bottom: 2px solid #dcdcdc;
}
.margin-top-10 {
    margin-top: 10px;
}
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
    	<Modal title="Show User Info" v-model="visible" width="850">
    		<Card v-if="showData">
				<Row type="flex" class="user-infor">
					<Col span="8" class="margin-top-10">
						<Row class-name="made-child-con-middle" type="flex" align="middle">
							<img class="avator-img" :src="showData.banner" />
						</Row>
					</Col>
					<Col span="16" style="padding-left:6px;">
						<Row class-name="made-child-con-middle" type="flex" align="middle">
							<Col span="24">
								<b class="card-user-infor-name">{{showData.title}}</b>
								<p>User : {{showData.user.name}}</p>
								<p>Phone : {{showData.user.phone}}</p>
								<p>Email : {{showData.user.email}}</p>
							</Col>
						</Row>
						<Row>
							<div v-for="(item, index) in showData.content" :key="index">
								<p v-if="item.type=='string'">{{item.value}}</p>
								<p v-else><img class="avator-img" :src="item.value" /></p>
							</div>
						</Row>
					</Col>
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
					title    : 'Title',
					key      : 'title',
					sortable : true,
                },{
					title    : '上传用户',
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
			onShow(index) {
				this.showData = this.propsHistoryData[index];
				this.visible = true;
			},
			moment(date) {
				return moment(date).format('YYYY-MM-DD, h:mm:ss');
			},
			onRemove(data, next) {
				const body = JSON.stringify({
					_id : data._id
                });
				fetch(Vue.config.apiUrl + 'article?token=' + this.token, {
					method :'delete',
					headers : {
						'Content-Type' : 'application/json',
					},
					body
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
	        			next();
	        		}
	        	})
	        	.catch(err => console.log('err', err))
			},
			getList() {
				this.loading = true;
				setTimeout(() => {
					fetch(Vue.config.apiUrl + 'article?token=' + this.token, {
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
									title      : val.title,
									user       : val.user.name,
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