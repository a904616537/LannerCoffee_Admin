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
    			<Row>
    				<div class="demo-upload-list" style="width: 100px;height: 100px;line-height: 100px;" v-for="item in showData.img">
						<template>
							<img :src="item">
						</template>
					</div>
    			</Row>
    			<div class="line-gray"></div>
				<Row type="flex" class="user-infor">
					<Col span="8" class="margin-top-10">
						<Row class-name="made-child-con-middle" type="flex" align="middle">
							<img class="avator-img" :src="showData.headerImage" />
						</Row>
					</Col>
					<Col span="16" style="padding-left:6px;">
						<Row class-name="made-child-con-middle" type="flex" align="middle">
							<Col span="16">
								<b class="card-user-infor-name">{{showData.name}}</b>
								<p>Email : {{showData.email}}</p>
								<p>Phone : {{showData.phone}}</p>
							</Col>
							<Col span="8">
								<div class="margin-top-10">
									<Icon type="key"></Icon>管理员 <br/>
									<i-switch v-model="showData.is_admin" @on-change="onChangeAdmin">
										<Icon type="android-done" slot="open"></Icon>
										<Icon type="android-close" slot="close"></Icon>
									</i-switch>
								</div>
								<div class="margin-top-10">
									<Icon type="easel"></Icon>供应商<br/>
									<i-switch v-model="showData.identity" @on-change="onChangeIdentity">
										<Icon type="android-done" slot="open"></Icon>
										<Icon type="android-close" slot="close"></Icon>
									</i-switch>
								</div>
							</Col>
						</Row>
						<Row>
							<div><p>{{showData.desc}}</p></div>
						</Row>
					</Col>
				</Row>
				<div class="line-gray"></div>
				<Row class="margin-top-8">
					<Col span="8"><p class="notwrap">注册时间:</p></Col>
					<Col span="16" class="padding-left-8">{{moment(showData.CreateTime)}}</Col>
				</Row>
				<Row class="margin-top-8">
					<Col span="8">
						<p class="notwrap">Following</p>
						<p>{{showData.following}}</p>
					</Col>
					<Col span="8">
						<p class="notwrap">Followers</p>
						<p>{{showData.followers}}</p>
					</Col>
					<Col span="8">
						<p class="notwrap">Points</p>
						<p>{{showData.points}}</p>
					</Col>
				</Row>
				<Row class="margin-top-8">
					<Col span="8">
						<p class="notwrap">Star</p>
						<p>{{showData.evaluate.star}}</p>
					</Col>
					<Col span="8">
						<p class="notwrap">Star Total</p>
						<p>{{showData.evaluate.total}}</p>
					</Col>
					<Col span="8">
						<p class="notwrap">People Number</p>
						<p>{{showData.evaluate.number}}</p>
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
					title    : '名字',
					key      : 'name',
					sortable : true,
                },{
					title    : '电话',
					key      : 'phone',
					sortable : true,
                },{
					title    : '邮箱',
					key      : 'email',
					sortable : true,
                },{
					title    : '是否为管理员',
					key      : 'is_admin',
					sortable : true,
                },{
					title    : '注册时间',
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
			onChangeAdmin (status) {
				const body = JSON.stringify({
					_id   : this.showData._id,
					key   : 'is_admin',
					value : status
                });

				fetch(Vue.config.apiUrl + 'user?token=' + this.token, {
					method :'put',
					headers : {'Content-Type' : 'application/json'},
					body
				})
				.then(respone => respone.json())
				.then(result => {console.log('request update user is_admin result:', result)})
				.catch(err => console.log('err', err))
            },
            onChangeIdentity (status) {
                const body = JSON.stringify({
					_id   : this.showData._id,
					key   : 'identity',
					value : status
                });

				fetch(Vue.config.apiUrl + 'user?token=' + this.token, {
					method :'put',
					headers : {'Content-Type' : 'application/json'},
					body
				})
				.then(respone => respone.json())
				.then(result => {console.log('request update user is_admin result:', result)})
				.catch(err => console.log('err', err))
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
					fetch(Vue.config.apiUrl + 'user?token=' + this.token, {
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
									phone      : val.phone,
									email      : val.email,
									is_admin   : val.is_admin,
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