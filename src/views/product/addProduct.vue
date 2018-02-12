<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
<template>
    <div>
        <Row>
            <Col span="18">
                <Card>
                    <Form :label-width="80">
                        <FormItem label="商品名称" :error="productError">
                            <Input v-model="name" @on-blur="handleArticletitleBlur" icon="android-list"/>
                        </FormItem>
                        <div class="article-link-con">
                            <transition name="fixed-link">
                                <FormItem v-show="showLink" label="固定链接">
                                    <span>
                                        <span key="pathfixedtext">{{ fixedLink }}</span><span key="pathText" v-if="!editLink">{{ productPath }}</span>
                                        <Input key="pathInput" v-model="productPath" style="display:inline-block;width:auto"  v-else/>
                                    </span>
                                    <span style="float:right;">
                                        <Button :type="editPathButtonType" @click="editArticlePath">{{ editPathButtonText }}</Button>
                                    </span>
                                </FormItem>
                            </transition>
                        </div>
						<FormItem label="价格">
							<InputNumber :disabled="hasSubmit" v-model="price" type="text" placeholder="单价" />
						</FormItem>
						<FormItem label="排序">
							<Select size="small" style="width:90px" v-model="order">
								<Option v-for="item in orders" :value="item" :key="item">{{ item }}</Option>
							</Select>
						</FormItem>

						<FormItem label="Roast：">
                            <Input :disabled="hasSubmit" v-model="roast_title" type="text" placeholder="dark"/>
							<Input :disabled="hasSubmit" v-model="roast" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
						</FormItem>
						<FormItem label="Body：">
                            <Input :disabled="hasSubmit" v-model="body_title" type="text" placeholder="dark"/>
							<Input :disabled="hasSubmit" v-model="body" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
						</FormItem>
						<FormItem label="Flavors：">
                            <Input :disabled="hasSubmit" v-model="flavors_title" type="text" placeholder="dark"/>
							<Input :disabled="hasSubmit" v-model="flavors" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
						</FormItem>
						<FormItem label="Aromas：">
                            <Input :disabled="hasSubmit" v-model="aromas_title" type="text" placeholder="dark"/>
							<Input :disabled="hasSubmit" v-model="aromas" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
						</FormItem>
						<FormItem label="Detail：">
                            <Input :disabled="hasSubmit" v-model="detail_title" type="text" placeholder="dark"/>
							<Input :disabled="hasSubmit" v-model="detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详细信息" />
						</FormItem>
						<FormItem label="More：">
                            <Input :disabled="hasSubmit" v-model="detail_more_title" type="text" placeholder="dark"/>
							<Input :disabled="hasSubmit" v-model="detail_more" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入更多描述" />
						</FormItem>
						<FormItem label="Content：">
							<v-editor
							id      = "editor1"
							v-model = "content"
							></v-editor>
						</FormItem>
                    </Form>
                    
                </Card>
            </Col>
            <Col span="6" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        发布
                    </p>
                    <Row>
                    	<div class="demo-upload-list" v-for="item in uploadList">
							<template v-if="item.status === 'finished'">
								<img :src="item.url">
								<div class="demo-upload-list-cover">
									<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
									<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
								</div>
							</template>
							<template v-else>
								<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
							</template>
						</div>
						<Upload
						ref="upload"
						:show-upload-list="false"
						:default-file-list="defaultList"
						:on-success="handleSuccess"
						:format="['jpg','jpeg','png']"
						:max-size="2048"
						:on-format-error="handleFormatError"
						:on-exceeded-size="handleMaxSize"
						:before-upload="handleBeforeUpload"
						multiple
						type="drag"
						action="http://106.14.94.210:8082/upload"
						style="display: inline-block;width:58px;">
							<div style="width: 58px;height:58px;line-height: 58px;">
								<Icon type="camera" size="20"></Icon>
							</div>
						</Upload>
						<Modal title="View Image" v-model="visible">
							<img :src="imgName" v-if="visible" style="width: 100%">
						</Modal>
                    </Row>
                    <Row class="margin-top-20 publish-button-con">
                        <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
                    </Row>
                </Card>
                <div class="margin-top-10">
                    <Card>
                        <p slot="title">
                            <Icon type="navicon-round"></Icon>
                            分类目录
                        </p>
                        <Tabs type="card">
                            <TabPane label="所有分类目录">
                                <div class="classification-con">
                                    <Tree :data="classificationList" @on-check-change="setClassificationInAll" show-checkbox></Tree>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import Vue                    from 'vue';
import {VueEditor}            from 'vue2-editor';
import {mapState, mapActions} from 'vuex';

export default {
	name : 'artical-publish',
    data () {
        return {
            name             : '',
            price            : 0,
            roast            : '',
            roast_title      : '',
            body             : '',
            body_title       : '',
            flavors          : '',
            flavors_title    : '',
            aromas           : '',
            aromas_title     : '',
            detail           : '',
            detail_title     : '',
            detail_more      : '',
            detail_more_title : '',
			order       : 20,

			defaultList: [],
			imgName    : '',
			visible    : false,
			uploadList : [],

			orders : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
			productError                : '',
			showLink                    : false,
			fixedLink                   : '',
			productPath                 : '',
			productPathHasEdited        : false,
			editLink                    : false,
			editPathButtonType          : 'ghost',
			editPathButtonText          : '编辑',
			editOpenness                : false,
			topArticle                  : false,
			publishTime                 : '',
			publishTimeType             : 'immediately',
			editPublishTime             : false, // 是否正在编辑发布时间
			classificationFinalSelected : [], // 最后实际选择的目录
			classificationList          : [],
			publishLoading              : false,
			hasSubmit                   : false,
			content                     : ''
        }
    },
    components: {
        'v-editor' : VueEditor
    },
    methods: {
        handleArticletitleBlur () {
            if (this.name.length !== 0) {
                localStorage.name = this.name; // 本地存储商品名称
                if (!this.productPathHasEdited) {
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
                    this.productPath = this.name;
                    this.productPathHasEdited = true;
                    this.showLink = true;
                }
            } else {
                this.$Message.error('文章标题不可为空哦');
            }
        },
        // 查看大图
        handleView (name) {
        	console.log('name', name)
            this.imgName = name;
            this.visible = true;
        },
        // 移除文件
		handleRemove (file) {
			const fileList = this.$refs.upload.fileList;
			this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
		},
        // 图片发送成功
        handleSuccess (res, file) {
        	console.log('file', file);
            file.url = file.response.msg;
            file.name = file.response.msg;
        },
        // 图片上传失败提示
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        // 上传大小出错限制
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        // 上传文件个数超过
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        editArticlePath () {
            this.editLink = !this.editLink;
            this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost';
            this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑';
        },
        setPublishTime (datetime) {
            this.publishTime = datetime;
        },
        canPublish () {
            if (this.name.length === 0) {
                this.$Message.error('请输入文章标题');
                return false;
            } else {
                return true;
            }
        },
         setClassificationInAll (selectedArray) {
            this.classificationFinalSelected = selectedArray.map(item => {
                return item.title;
            });
            localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected); // 本地存储所选目录列表
        },
        handlePublish () {
            if (this.canPublish()) {
                this.publishLoading = true;
                const body = JSON.stringify({
					img         : this.$refs.upload.fileList.map(val => val.url),
					name        : this.name,
					price       : this.price,
					order       : this.order,
					roast       : this.roast,
                    roast_title       : this.roast_title,
					body        : this.body,
                    body_title        : this.body_title,
					flavors     : this.flavors,
                    flavors_title     : this.flavors_title,
					aromas      : this.aromas,
                    aromas_title      : this.aromas_title,
					detail      : this.detail,
                    detail_title      : this.detail_title,
					detail_more : this.detail_more,
                    detail_more_title : this.detail_more_title
                });

                fetch(Vue.config.apiUrl + 'product?token=' + this.token, {
					method  :'post',
					headers : {
						'Content-Type' : 'application/json',
					},
					body
	        	})
	        	.then(respone => respone.json())
	        	.then(result => {
	        		this.publishLoading = false;
	        		console.log('result', result);
					this.$Notice.success({
						title : '保存成功',
						desc  : '商品' + this.name + '发布成功'
					});
					// this.$Message.error({
					// 	content  : result.msg,
					// 	duration : 2,
					// 	closable : true
					// })
	        	})
	        	.catch(err => console.log('err', err))
            }
        }
    },
	computed : mapState({
		token : state => state.User.token,
		completeUrl () {
            let finalUrl = this.fixedLink + this.productPath;
            localStorage.finalUrl = finalUrl; // 本地存储完整路径
            return finalUrl;
        }
    }),
    mounted () {
    	this.uploadList = this.$refs.upload.fileList;
        this.classificationList = [{
			title    : 'Bean 1',
			expand   : true,
			children : [{
                    title: 'Bean Category',
                    expand: true
                }, {
                    title: 'Bean Category1',
                    expand: true
                }]
            }, {
				title    : 'Bean 2',
				expand   : true,
				children : [{
					title: 'Bean Category',
					expand   : true
            	}]
            }];
    },
    destroyed () {
    }
};
</script>