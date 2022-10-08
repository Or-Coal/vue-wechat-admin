<template>
    <el-upload class="avatar-uploader " action="http://localhost:3003/upload/common/" :headers="headers"
        :show-file-list="false" accept=".jpg,.png,.jpeg" :on-success="handleUploadSuccess" :data="extra"
        :before-upload="handleBeforeUpload" :on-error="handleUploadError">
        <img v-if="modelValue" :src="modelValue" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import {ref} from 'vue';

let props = defineProps({
    modelValue: {
        type: String,
        default: '',//默认值
        required: true,//必传
    },
})

//组件events
let emit = defineEmits(["update:modelValue"]);

//提前token
let token = sessionStorage.token;

let headers = { Authorization: `Bearer ${token}` };

//附加参数
let extra = { type: 'common' };

//上传成功
const handleUploadSuccess = ({ status, msg, src }, uploadFile) => {
    // console.log(response,uploadFile);
    // 上传成功
    if (status) {
        // imageUrl.value = URL.createObjectURL(uploadFile.raw);
        console.log(src);
        emit('update:modelValue', src);
        console.log(props.modelValue);
        ElMessage.success(msg);
    } else {
        //上传失败
        ElMessage.error(msg);
    }


}

// 上传失败
let handleUploadError = (error, uploadFile) => {
    // 转换
    console.log(error.message);
    let { status, msg } = JSON.parse(error.message);
    //通知
    ElMessage.error(msg);
}
const handleBeforeUpload = (rawFile) => {
    console.log(rawFile);
    //判断图片格式/^image/[jpeg]
    let isValid = /^image\/(jpeg|png|jpg)$/.test(rawFile.type);
    if (!isValid) {
        ElMessage.error('头像必须是JPG/PNG格式!')
        return false;
    }
    //判断图片的体积
    else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像体积不能超过2MB!')
        return false
    }
    return true
}
</script>

<style scoped>
.avatar-uploader {
    border: 1px dashed #d9d9d9;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>