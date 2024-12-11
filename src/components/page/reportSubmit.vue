<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> Submit Report</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <div class="content-title">Support drag and drop</div>
            <el-upload
            class="upload-demo"
            drag
            action="/api/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag and drop files here, or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">Only pdf files are supported, and the file size cannot exceed 5mb
                <br>
                <br>
            </div>
            </el-upload>
            <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                               :crop="true"
                               text="Upload"
                               url="/api/posts/"
                               extensions="png,gif,jpeg,jpg"
                               @:imageuploaded="imageuploaded"
                               @:errorhandle="handleError"></vue-core-image-upload>
        </div>
        <div>
            <div class="content-title">Support drag and drop</div>
            <el-upload
            class="upload-demo"
            drag
            action="/api/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag and drop files here, or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">Only pdf files are supported, and the file size cannot exceed 5mb
                <br>
                <br>
            </div>
            </el-upload>
            <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                               :crop="true"
                               text="Upload"
                               url="/api/posts/"
                               extensions="png,gif,jpeg,jpg"
                               @:imageuploaded="imageuploaded"
                               @:errorhandle="handleError"></vue-core-image-upload>
        </div>
    </div>
</template>

<script>
    import VueCoreImageUpload  from 'vue-core-image-upload';
    export default {
        data: function(){
            return {
                src: './static/img/img.jpg',
                fileList: []
            }
        },
        components: {
                VueCoreImageUpload
        },
        methods:{
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{
        width:250px;
        height: 250px;
        margin-bottom: 20px;
    }
</style>