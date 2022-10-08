<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <span>发布新商品</span>
            </template>
            <el-form :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-col :span="8">
                        <el-select v-model="form.cate_1st" @change="handleCateChange" placeholder="请选择文章一级分类">
                            <el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.cate_2nd" placeholder="请选择文章二级分类">
                            <el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="主图">
                    <el-upload class="avatar-uploader" action="/upload/common/" :data="{type:'common'}"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.main_photo" :src="form.main_photo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="内容">
                    <div class="editor-box">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                            :defaultConfig="toolbarConfig" />
                        <Editor style="height: 500px; overflow-y: hidden; " v-model="form.content"
                            :defaultConfig="editorConfig" @onCreated="handleCreated" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSubmit()" type="primary">保存修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
// import "@wangeditor/editor/dist/css/style.css"; // 引入 css
// import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import Article from '@/api/article';
// import Category from '@/api/category';
import { useRouter,useRoute  } from 'vue-router';

import { ref, onMounted, watchEffect, watch, onBeforeUnmount, shallowRef } from 'vue';

// 请求子级分类
let loadSubcate = async (id) => {
    let { status, msg, data } = await Category.subcate({ id });
    if (status) {
        return data;
    }
};

// 一级分类
let options_1st = ref([]);
// 二级分类
let options_2nd = ref([]);

// 获取当前路径对象
let route = useRoute();

let form = ref({
    title: '',
    description: '',
    cate_1st: '',
    cate_2nd: '',
    main_photo: '',
    content: '',
});
// 初始化自动执行，自行分析依赖，监听依赖变化，请求结果
watchEffect(async () => {
    // 三个ajax使用await放在同一个async函数中
    try {
        // 1、加载一级分类
        options_1st.value = await loadSubcate(0);
        // 2、加载文章详情
        let { status, msg, data } = await Article.detail({ id: route.params.id });
        // 3.根据上面的文章详情，加载二级分类
        options_2nd.value = await loadSubcate(data.cate_1st);
        // 4.还原表单
        form.value = data;

    } catch (error) {
        console.log(error);
    }
});

// 监听一级分类选择，请求二级分类
let handleCateChange = async (value) => {
    // 请求二级分类
    options_2nd.value = await loadSubcate(value);
    // 默认选中第一项
    form.value.cate_2nd = options_2nd.value[0].id;
}


//王编辑器
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");
//配置
const toolbarConfig = {};
const editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {},
};
//上传图片配置
editorConfig.MENU_CONF["uploadImage"] = {
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    fieldName: "file",
    server: "http://localhost:3001/upload/editor/",
    // 自定义增加 http  header
    headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
    },
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};

//获取router实例对象
let router = useRouter();
// 修改文章
async function handleSubmit() {
    let { status, msg } = await Article.edit(form.value);
    if (status) {
        //缓存数据
        ElMessage.success(msg);
        //跳转页面
        router.push('/article/list');
    } else {
        //登陆失败
        ElMessage.error(msg);
    }
}
</script>

<style scoped>
.editor-box {
    border: 1px solid #ccc;
    border-radius: 2px;
}

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
