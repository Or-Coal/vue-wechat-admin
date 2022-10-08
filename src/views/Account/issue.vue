
<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>编辑文章</span>
            </div>
        </template>
        <el-form ref="ruleFormRef" :rules="rules" label-width="120px" label-position="left" :model="form"
            class="demo-ruleForm" status-icon>
            <el-form-item label="商品分类" prop="cate_3rd">
                <el-space :size="100">
                    <el-select style="width:150px" placeholder="请选择一级分类" @change="handleCreatChange1"
                        v-model="form.cate_1st">
                        <el-option v-for="item in option_1st" :key="item.id" :value="item.id" :label="item.name">
                        </el-option>
                    </el-select>
                    <el-select style="width:150px" placeholder="请选择二级分类" @change="handleCreatChange2"
                        v-model="form.cate_2nd">
                        <el-option v-for="item in option_2nd" :key="item.id" :value="item.id" :label="item.name">
                        </el-option>
                    </el-select>
                    <el-select style="width:150px" placeholder="请选择三级分类" v-model="form.cate_3rd">
                        <el-option v-for="item in option_3rd" :key="item.id" :value="item.id" :label="item.name">
                        </el-option>
                    </el-select>
                </el-space>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <div>
                    <el-input v-model="form.name" style="width:650px" />
                    <div style="font-size: 12px;color: #999;">商品标题名称长度至少3个字符，最长200个汉字</div>
                </div>
            </el-form-item>
            <el-form-item label="商品卖点">
                <div>
                    <el-input style="width:650px" type="textarea" v-model="form.hotPoint" />
                    <div style="font-size: 12px;color: #999;">商品卖点不能超过140个汉字</div>
                </div>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <div>
                    <el-input v-model="form.price" style="width:200px">
                        <template #append>元</template>
                    </el-input>
                    <div style="font-size: 12px;color: #999;">价格必须是0-999999之间的数字，且不能高于市场价</div>
                    <div style="font-size: 12px;color: #999;">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</div>
                </div>
            </el-form-item>
            <el-form-item label="市场价" prop="marketPrice">
                <div>
                    <el-input v-model="form.marketPrice" style="width:200px">
                        <template #append>元</template>
                    </el-input>
                    <div style="font-size: 12px;color: #999;">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
                </div>
            </el-form-item>
            <el-form-item label="成本价" prop="cost">
                <div>
                    <el-input v-model="form.cost" style="width:200px">
                        <template #append>元</template>
                    </el-input>
                    <div style="font-size: 12px;color: #999;">
                        价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</div>
                </div>
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
                <div>
                    <el-input v-model="form.discount" style="width:200px">
                        <template #append>折</template>
                    </el-input>
                    <div style="font-size: 12px;color: #999;">根据销售价与市场价比例自动生成不需要编辑</div>
                </div>
            </el-form-item>
            <el-form-item label="商品库存" prop="inventory">
                <div>
                    <el-input v-model="form.inventory" style="width:200px">
                        <template #append>件</template>
                    </el-input>
                    <div style="font-size: 12px;color: #999;">库存必须是0-999999之间的整数</div>
                    <div style="font-size: 12px;color: #999;">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
                </div>
            </el-form-item>
            <el-form-item label="商品货号" prop="articleNo">
                <div>
                    <el-input v-model="form.articleNo" style="width:200px">
                    </el-input>
                    <div style="font-size: 12px;color: #999;">商品货号是商家管理商品的编号，买家不可见</div>
                    <div style="font-size: 12px;color: #999;">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</div>
                </div>
            </el-form-item>
            <el-form-item label="商品主图" prop="img_lg">
                <el-upload class="avatar-uploader" action="http://localhost:3003/upload/common" :data="extra"
                    :headers="headers" :show-file-list="false" accept=".jpg,.png,.jpeg"
                    :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="handleBeforeUpload">
                    <img v-if="form.img_lg" :src="form.img_lg" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <div style="font-size: 12px;color: #999;">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
                    800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>

            </el-form-item>
            <el-form-item label="商品轮播图" prop="slider">
                <el-upload v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
                    :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
                <div style="font-size: 12px;color: #999;">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
                    800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>

            </el-form-item>
            <div style="background-color: #f5f5f5;padding: 10px;margin-bottom: 10px;">商品详情描述</div>
            <el-form-item label="商品品牌" prop="brand">
                <el-input style="width:650px" v-model="form.brand">
                </el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="detail">
                <div class="editor-box">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.detail"
                        :defaultConfig="editorConfig" @onCreated="handleCreated" />
                </div>
            </el-form-item>
            <div style="background-color: #f5f5f5;padding: 10px;margin-bottom: 10px;">商品物流信息</div>

            <el-form-item label="所在地">
                <el-space :size="100">
                    <el-select style="width:150px" placeholder="请选择省" @change="handleCity" v-model="form.province">
                        <el-option v-for="item in provinceList" :key="item._id" :value="item.province_id"
                            :label="item.name">
                        </el-option>
                    </el-select>
                    <el-select @change="handleCounty" style="width:150px" placeholder="请选择城市" v-model="form.city">
                        <el-option v-for="item in cityList" :key="item._id" :value="item.city_id" :label="item.name">
                        </el-option>
                    </el-select>
                    <el-select @change="handleTown" style="width:150px" placeholder="请选择区/县" v-model="form.county">
                        <el-option v-for="item in countyList" :key="item._id" :value="item.county_id"
                            :label="item.name">
                        </el-option>
                    </el-select>
                    <el-select style="width:150px" placeholder="请选择街道" v-model="form.street">
                        <el-option v-for="item in townList" :key="item._id" :value="item.street_id" :label="item.name">
                        </el-option>
                    </el-select>
                </el-space>
            </el-form-item>
            <el-form-item label="运费" prop="freight">
                <div>
                    <el-input v-model="form.freight" style="width:200px">
                        <template #append>元</template>
                    </el-input>
                    <div style="font-size: 12px;color: #999;">运费设为0，前台商品将显示免运费</div>
                </div>
            </el-form-item>
            <el-form-item>
                <template #default="scope">
                    <el-button @click="handleSave(ruleFormRef)" type="primary">提交</el-button>
                </template>
            </el-form-item>
        </el-form>
    </el-card>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router'
import Goods from '@/api/goods';
import Address from '@/api/address';

import { onBeforeUnmount, ref, shallowRef, onMounted, reactive, watchEffect } from 'vue'

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { Plus } from '@element-plus/icons-vue';

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

let fileList = ref([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 编辑器实例，必须用 shallowRef(浅层)
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

//配置
const toolbarConfig = {}
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
}

//上传图片配置
editorConfig.MENU_CONF['uploadImage'] = {
    //form-data fileName,默认值'wangeditor-uploaded-image'
    fileName: 'file',
    server: 'http://localhost:3001/upload/editor/',
    //自定义添加 http header
    headers: {
        Authorization: `Bearer ${sessionStorage.token}`
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

//创建阶段
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

let form = ref({})

//获取当前路径的对象
let route = useRoute();

//请求子级分类列表
let loadSubcate = async (pId) => {
    let { status, msg, data } = await Goods.subcate({ pId });
    if (status) {
        // console.log(data)
        return data;
    }
}
//加载一级分类
let option_1st = ref([])
let option_2nd = ref([])
let option_3rd = ref([])
onMounted(async () => {
    //请求一级分类
    option_1st.value = await loadSubcate(1)
    // console.log(option_1st.value)
})
//监听一级分类选择，请求二级分类
let handleCreatChange1 = async (value) => {
    //请求二级分类
    option_2nd.value = await loadSubcate(value);
    //默认选中第一项
    form.value.cate_2nd = option_2nd.value[0].name
}
//监听二级分类选择，请求三级分类
let handleCreatChange2 = async (value) => {
    //请求二级分类
    option_3rd.value = await loadSubcate(value);
    //默认选中第一项
    form.value.cate_3rd = option_3rd.value[0].name
}


//请求省份列表
let loadProvince = async (_id) => {
    let { status, msg, data } = await Address.province({ _id });
    if (status) {
        // console.log(data)
        return data;
    }
}
//请求市
let loadCity = async (id) => {

    let { status, msg, data } = await Address.city({ id });
    if (status) {
        console.log(data)
        return data;
    }
}
//请求县、区
let loadCounty = async (id) => {

    let { status, msg, data } = await Address.county({ id });
    if (status) {
        return data;
    }
}
//请求街道
let loadTown = async (id) => {

    let { status, msg, data } = await Address.town({ id });
    if (status) {
        return data;
    }
}
let provinceList = ref([])
let cityList = ref([])
let countyList = ref([])
let townList = ref([])

//获取省份
onMounted(async () => {
    provinceList.value = await loadProvince()
})
//监听省份，请求市
let handleCity = async (value) => {

    cityList.value = await loadCity(value);
    // countyList.value = await loadCounty(value);
    // townList.value = await loadTown(value);
    //默认选中第一项
    form.value.city = cityList.value[0].name;
    // form.value.county = countyList.value[0].name;
    // form.value.street = townList.value[0].name;

}
//监听省份，请求市
let handleCounty = async (value) => {

    countyList.value = await loadCounty(value);

    //默认选中第一项
    form.value.county = countyList.value[0].name;
}
//监听省份，请求市
let handleTown = async (value) => {

    townList.value = await loadTown(value);

    //默认选中第一项
    form.value.street = townList.value[0].name;
}

//保证顺序(四种方法)

watchEffect(async () => {
    //三个ajax使用await放在同一个async函数里
    try {
        //加载一级分类
        option_1st.value = await loadSubcate(0)
        provinceList.value = await loadProvince()
    }
    catch (error) {
        console.log(error)
    }
})



//表单验证规则
const rules = reactive({
    cate_3rd: [
        { required: true, message: '请选择商品分类！', trigger: 'change' },
    ],
    name: [
        { required: true, message: '请输入商品名称！', trigger: 'blur' },
        { min: 3, max: 200, message: '商品标题名称长度至少3个字符，最长200个汉字', trigger: 'blur' },

    ],
    price: [
        { required: true, message: '请输入商品价格！', trigger: 'blur' },
        { min: 0, max: 999999, message: '价格必须是0-999999之间的数字，且不能高于市场价', trigger: 'blur' },
    ],
    marketPrice: [
        { required: true, message: '请输入市场价！', trigger: 'blur' },
        { min: 0, max: 999999, message: '价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写', trigger: 'blur' },
    ],
    cost: [
        { required: true, message: '请输入成本价！', trigger: 'blur' },
        { min: 0, max: 999999, message: '价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示', trigger: 'blur' },
    ],
    inventory: [
        //非空校验
        { required: true, message: '请输入商品库存！', trigger: 'blur' },
        { min: 0, max: 999999, message: '库存必须是0-999999之间的整数', trigger: 'blur' },
    ],
    articleNo: [
        //非空校验
        { required: true, message: '请输入商品货号！', trigger: 'blur' },
        // { message: '最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点', trigger: 'blur' },
    ],
    img_lg: [
        { required: true, message: '请添加主图！', trigger: 'blur' },
    ],
    // slider: [
    //     { required: true, message: '请添加轮播图！', trigger: 'blur' },
    // ],
    brand: [
        { required: true, message: '请输入商品品牌！', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入商品描述', trigger: 'blur' },
    ],
    street: [
        { required: true, message: '请选择完整地址！', trigger: 'change' },
    ],
    freight: [
        { required: true, message: '请输入运费！', trigger: 'blur' },
        { min: 0, max: 999999, message: '运费必须是0-999999之间的数字', trigger: 'blur' },
    ],
})



//提取token
let token = sessionStorage.token;

let headers = { Authorization: `Bearer ${token}` };
//附加参数 (data)
let extra = { type: 'avatar' }


//上传成功
const handleUploadSuccess = ({ status, msg, src }, uploadFile) => {
    //上传成功
    if (status) {
        //生成图片的地址，预览图片
        form.value.img_lg = src;
    } else {
        //上传失败
        ElMessage.error(msg)
    }
}

//上传失败
let handleUploadError = (error, uploadFile) => {
    //转换
    let { status, msg } = JSON.parse(error.message);
    //消息通知
    ElMessage.error(msg)
}

//上传之前的检查
const handleBeforeUpload = (rawFile) => {
    //判断图片格式
    let isValid = /^image\/(jpeg|png|jpg)$/.test(rawFile.type);

    if (!isValid) {
        ElMessage.error("主图必须是JPG/PNG格式!")
        return false
    }
    //判断图片体积
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('主图体积不能超过2MB!')
        return false
    }
    return true
}

//获取form组件实例
let ruleFormRef = ref()
//获取router实例对象
let router = useRouter()
//保存修改
function handleSave(formEl) {
    //校验整个表单
    formEl.validate(async (valid, fields) => {
        if (valid) {
            //通过校验
            let { status, msg, data } = await Goods.release({ ...form.value })
            console.log({ ...form })
            if (status) {
                //保存成功
                ElMessage.success(msg);
                //跳转页面
            } else {
                //保存失败
                ElMessage.error(msg)
            }
        } else {
            //没通过校验
            console.log('失败字段', fields);
        }
    });
}
</script>


<style scoped>
.avatar-uploader .avatar {
    width: 148px;
    height: 148px;
    display: block;
}

.editor-box {
    border: 1px solid #ccc;
    border-radius: 3px;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    text-align: center;
}
</style>