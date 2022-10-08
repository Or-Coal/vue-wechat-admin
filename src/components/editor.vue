<template>
    <div class="editor-box">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor style="height: 500px; overflow-y: hidden; " v-model="content" :defaultConfig="editorConfig"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ref, onBeforeUnmount, shallowRef } from 'vue';

let props = defineProps({
    modelValue: {
        type: String,
        default: '123',//默认值
        required: true,//必传
    },
})
let content=ref('');
content.value=props.modelValue;
//组件events
let emit = defineEmits(["update:modelValue"]);

//向外部发送update事件同时携带数据
function handleChange() {
    console.log(content.value);
    emit('update:modelValue', content.value);
}

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
</script>