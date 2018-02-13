<style scoped>
    .layout{
		border     : 1px solid #d7dde4;
		background : #f5f7f9;
		position   : relative;
        height    : 100%;
    }
    .ivu-row-flex{
		height : 100%;
    }
    .layout-breadcrumb{
		padding    : 10px 15px 0;
		text-align : left;
    }
    .layout-content{
		/*min-height    : 200px;*/
		margin        : 15px;
		overflow      : hidden;
		background    : #fff;
		border-radius : 4px;
		text-align    : left;
    }
    .layout-content-main{
		padding : 10px;
    }
    .layout-copy{
		text-align : center;
		padding    : 10px 0 20px;
		color      : #9ea7b4;
    }
    .layout-menu-left{
		background : #464c5b;
    }
    .layout-header{
		height     : 60px;
		background : #fff;
		box-shadow : 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
		width         : 90%;
		height        : 30px;
		background    : #5b6270;
		border-radius : 3px;
		margin        : 15px auto;
    }
    .menuicon {
        padding: 0 15px;
    }
    .logout {
        height        : 60px;
        line-height   : 60px;
        padding-right : 20px;
        text-align    : right;
    }
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <Col span="5" class="layout-menu-left">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>

                    <Submenu v-for="(item, index) in $router.options.routes" v-if="!item.hidden" :name="index" :key="index">
                        <template slot="title">
                            <Icon :type="item.iconCls"></Icon>
                            {{item.title}}
                        </template>
                        <MenuItem v-for="(val, key) in item.children" v-if="!val.hidden" :name="index+'-'+key" :key="index+'-'+key">
                            <div @click="$router.push(val.path)"><Icon class="menuicon" :type="val.iconCls"></Icon>{{val.title}}</div>
                        </MenuItem>
                    </Submenu>

                </Menu>
            </Col>
            <Col span="19">
                <div class="layout-header">
                    <div @click="onLogout" class="logout"><p>Logout</p></div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                        <BreadcrumbItem>iView</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
		            <div class="layout-content-main">
		            	<!-- <router-link to="/table">table</router-link> -->
		            	<router-view></router-view>
		            </div>
		        </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    export default {
        data() {
        	return {
        	}
        },
        methods: {
            ...mapActions([
                'Logout'
            ]),
            onSelect(name) {
                // this.$router.push(val.path)
            },
            onLogout() {
                this.Logout()
                window.location.reload();
            }
        }
    }
</script>