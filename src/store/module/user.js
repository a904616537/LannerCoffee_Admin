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
	},
	Logout({commit}, data) {
		commit(types.USER_LOGOUT, data);
	}
}

// mutations
const mutations = {
	[types.USER_LOGIN] (state, data) {
		state.user     = data.user;
		state.token    = data.token;
		state.isLogin  = true;
		Cookie.set('user-token', data.token, { expires: '1h' })
		Cookie.set('user', JSON.stringify(data.user), { expires: '1h' })

	},
	[types.USER_LOGOUT] (state, data) {
		state.user     = {};
		state.token    = '';
		state.isLogin  = false;
		Cookie.delete('user-token');
		Cookie.delete('user');
	}
}

export default {
	state,
	actions,
	mutations
}