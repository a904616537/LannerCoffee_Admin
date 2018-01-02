import * as types  from '../mutation-types'
import Vue         from 'vue';
import querystring from 'querystring';
import Cookie      from 'vue-cookie';

const state = {
	isLogin  : Cookie.get('user-token') != null,
	user     : Cookie.get('user'),
	token    : Cookie.get('user-token'),
}

const actions = {
	Login({commit}, data) {
		commit(types.USER_LOGIN, data);
	}
}

// mutations
const mutations = {
	[types.USER_LOGIN] (state, data) {
		console.log('data', data)
		state.user     = data.user;
		state.token    = data.token;
		state.isLogin  = true;
	}
}

export default {
	state,
	actions,
	mutations
}