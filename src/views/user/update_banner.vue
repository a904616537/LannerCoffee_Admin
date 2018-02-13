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
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="paper-airplane"></Icon>
                        Upload Banner Image
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
			defaultList    : [],
			imgName        : '',
			visible        : false,
			uploadList     : [],
			publishLoading : false
        }
    },
    props : {
    	user : Object
    },
    components: {
        'v-editor' : VueEditor
    },
    methods: {
        // 查看大图
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        // 移除文件
		handleRemove (file) {
			console.log('this.$refs.upload.fileList', this.$refs.upload.fileList)
			const fileList = this.$refs.upload.fileList;
			this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
		},
        // 图片发送成功
        handleSuccess (res, file) {
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
        handlePublish () {
            this.publishLoading = true;
            const body = JSON.stringify({
            	_id   : this.user._id,
				key   : 'img',
				value : this.$refs.upload.fileList.map(val => val.url)
            });
			fetch(Vue.config.apiUrl + 'user?token=' + this.token, {
				method  :'put',
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
					desc  : 'Banner更新成功'
				});
			})
			.catch(err => console.log('err', err))
        },
		// onRefresh(imgs) {
		// 	console.log('imgs',imgs)
		// 	// 清空再增加
		// 	this.$refs.upload.clearFiles();
			
		// 	this.defaultList = imgs.map(val => {
		// 		return {
		// 			url    : val,
		// 			name   : val,
		// 			status : 'finished'
		// 		}
		// 	})
		// }
    },
    computed : mapState({
		token : state => state.User.token
    }),
    mounted () {
    	this.uploadList = this.$refs.upload.fileList;
    },
    destroyed () {
    }
};
</script>