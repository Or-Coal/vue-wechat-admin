<template>
    <el-card class="box-card" style="width: 100%">
        <template #header>
            <div class="card-header">
                <span>商品列表</span>
            </div>
        </template>
        <el-table :data="clotheslist" style="width: 100%">
            <el-table-column width="90px" label="商品名称">
                <template #default="scope">
                    <el-avatar shape="square" :src="scope.row.img_md" class="img" />
                </template>
            </el-table-column>
            <el-table-column prop="name" width="300px" />
            <el-table-column prop="price" label="价格" sortable />
            <el-table-column prop="inventory" label="库存" sortable />
            <el-table-column prop="create_time" label="发布时间" width="170px" sortable />
            <el-table-column prop="operation" label="操作" width="300" #default="scope">
                <el-space>
                    <el-link :href="`/#/goods/goodsedit/${scope.row.id}`">
                        <el-button type="primary">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                        </el-button>
                    </el-link>
                    <el-button type="danger" plain @click="handleRemove(scope.row.id,scope.$index)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                </el-space>
            </el-table-column>
        </el-table>
        <div style="display:flex;justify-content:end;margin-top: 10px;">
            <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[4, 8, 16, 32]"
                small :disabled="disabled" background layout=" prev, pager, next,sizes" :total="goodsTotal"
                @size-change="handleSizeChange(pageSize)" @current-change="handleCurrentChange(currentPage)" />
            <div>共<span>{{goodsTotal}}</span>条</div>
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import Goods from '@/api/goods';

let clotheslist = ref([]);
let goodsTotal = ref();
const currentPage = ref(1)
const pageSize = ref(4)
async function loadlist() {
    let { status, msg, data, total } = await Goods.list({ pageSize: pageSize.value, pageIndex: currentPage.value });
    console.log(data);
    if (status) {
        goodsTotal.value = total;
        clotheslist.value = data;
    }
}
loadlist();

const handleSizeChange = (pageSize) => {
    loadlist()
}
const handleCurrentChange = (currentPage) => {
    loadlist()
}

//编辑操作：


//删除操作：
function handleRemove(id, i) {
    //confirm弹窗
    ElMessageBox.confirm('确定要删除该商品吗？删除之后无法恢复!', { type: 'error', cancelButtonText: "取消", confirmButtonText: "确认" })
        .then(async () => {
            //确认
            //1.ajax            
            let { status, msg } = await Goods.remove(id, { ...i });
            if (status) {
                //删除成功
                ElMessage.success(msg)
                //2.操作DOM
                clotheslist.value.splice(i, 1);
            } else {
                ElMessage.error(msg)
            }
        })
        .catch(() => {
            //取消
            ElMessage("取消成功！")
        })
}

</script>

<style scoped>
.img {
    width: 70px;
}

.goodsname {
    white-space: nowrap;
    /* 文字不允许折行 */
    overflow: hidden;
    /* 裁剪超出部分 */
    text-overflow: ellipsis;
    /* 文字省略符号 */
}
</style>