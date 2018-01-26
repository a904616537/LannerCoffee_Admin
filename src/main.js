import Vue       from 'vue';
import iView     from 'iview';
import VueRouter from 'vue-router';
import Routers   from './router';
import Store     from './store';
import Vuex      from 'vuex';
import Util      from './libs/util';
import App       from './app.vue';
import 'iview/dist/styles/iview.css';


Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

Vue.config.apiUrl = "http://106.14.94.210:8050/";
// Vue.config.apiUrl = "http://localhost:8050/";



// 路由配置
const RouterConfig = {
    mode   : 'history',
    routes : Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});



new Vue({
    el     : '#app',
    router : router,
    store  : Store,
    render : h => h(App)
});