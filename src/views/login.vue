<template>
	<div class="login">
		<h1>Log In</h1>
        <form id="loginfrom" class="form">
            <div class="inner">
                <p>User</p>
                <input type="text" id="key" name="key" v-model="username" class="input-type">
            </div>
            <div class="inner">
                <p>Password</p>
                <input type="password" id="password" name="password" v-model="password" class="input-type">
            </div>
            <button type="button" id="login" class="log" @click="onLogin"><strong>Log In</strong></button>
        </form>
	</div>
</template>
<script>
	import Vue         from 'vue';
	import {mapState, mapActions} from 'vuex';
	import Cookie      from 'vue-cookie';
	import querystring from 'querystring';
	export default{
		data() {
			return {
				username : '',
				password : ''
			}
		},
		computed : mapState({
			islogin : state => state.User.isLogin,
            token  : state => state.User.token,
        }),
		methods : {
			...mapActions([
				'Login'
			]),
			onLogin() {
				const body = JSON.stringify({key : this.username, password : this.password});
	        	fetch(Vue.config.apiUrl + 'login', {
					method :'post',
					headers : {
						'Content-Type' : 'application/json',
					},
					body
	        	})
	        	.then(respone => respone.json())
	        	.then(result => {
	        		if(result.errorcode == 500) {
	        			this.$Message.error({
		        			content  : result.msg,
							duration : 2,
							closable : true
						})
	        		} else {
	        			if(!result.data.user.is_admin) {
	        				this.$Message.error({
			        			content  : '非管理员不能登录！',
								duration : 2,
								closable : true
							})	
	        			} else {
	        				this.Login(result.data)
		        			Cookie.set('user-token', result.data.token, { expires: '1h' })
							Cookie.set('user', JSON.stringify(result.data.user), { expires: '1h' })
		        			this.$Message.info({
			        			content  : result.msg,
								duration : 0.5,
								closable : true,
								onClose : () => {
									this.$router.replace({path : '/'})
								}
							})
	        			}
	        		}
	        	})
	        	.catch(err => console.log('err', err))
            },
		},
		created() {
			if(this.islogin) {
				this.$router.replace({path : '/'})
			}
		}
	}
</script>
	
<style>
body{
	background : url(https://subtlepatterns.com/patterns/sativa.png) repeat fixed;
	width      : 100%;
	height     : 100%;
}
.login{
    width  : 50%;
    margin : 100px auto;
}
.login .form{
	background-color : #fff;
	padding          : 30px 30px 50px;
	margin-bottom    : 20px;
	box-shadow       : 3px 3px 3px #ccc;
}
.login .inner{
    margin-bottom : 20px;
}
.login p{
    margin : 0px;
}
.login h1{
	background-color : rgba(255,255,255,.6);
	line-height      : 50px;
	text-align       : center;
}
.login .input-type{
    width       : 100%;
    padding     : 0 10px;
    line-height : 30px;
    border      : 1px solid #e7e7e7;
    outline     : none;
}
.login .icon{
    margin-right : 10px;
}
.login .log{
	background-color : #7DD1F0;
	width            : 120px;
	line-height      : 30px;
	color            : #fff;
	border           : none;
	outline          : none;
}
.login a{
    display     : block;
    line-height : 30px;
    margin-left : 30px;
}
</style>