import Vue        from 'vue'
import Router     from 'vue-router'
import Index      from './views/index'
import Login      from './views/login'
import Product    from './views/product/index'
import AddProduct from './views/product/addProduct'
import User       from './views/user/index'
import Table      from './template/table'


Vue.use(Router);

const routes = [
	{
		path      : '/',
		title : 'Home',
		component : Index,
		iconCls   : 'home',//图标样式class
		children  : [{
			hidden    : true,
			path      : '/'
		},{
			title     : 'Users',
			path      : '/table',
			component : Table,
			iconCls   : 'person'
		},
		// {
		// 	title     : 'Products',
		// 	path      : '/product',
		// 	component : Product,
		// 	iconCls   : 'person'
		// },{
		// 	title     : 'Create Product',
		// 	path      : '/addproduct',
		// 	component : AddProduct,
		// 	iconCls   : 'plus-circled'
		// }
		]
	},{
		path      : '/product',
		title     : 'Product',
		component : Index,
		iconCls   : 'ios-filing',//图标样式class
		children  : [{
			title     : 'Product List',
			path      : '/product',
			component : Product,
			iconCls   : 'ios-folder-outline'
		},{
			title     : 'Create Product',
			path      : '/addproduct',
			component : AddProduct,
			iconCls   : 'plus-circled'
		}]
	},{
		path      : '/user',
		title     : 'User',
		component : Index,
		iconCls   : 'person-stalker',//图标样式class
		children  : [{
			title     : 'User List',
			path      : '/user',
			component : User,
			iconCls   : 'person'
		}]
	},{
		path      : '/login',
		component : Login,
		hidden    : true,
	},{
		path     : '*',
		hidden   : true,
		redirect : { path: '/404' }
    }
];


export default routes
