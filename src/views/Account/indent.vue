<template>
    <el-card class="box-card" style="width: 100%">
        <template #header>
            <div class="card-header">
                <span>订单列表</span>
            </div>
        </template>
        <el-table :data="orderlist" style="width: 100%">
            <el-table-column label="#" prop="id" />

            <el-table-column width="600px">
                <template #default="scope">
                    <el-table :data="orderlist[scope.$index].goodsList" style="width: 100%;font-size: 10px;">
                        <el-table-column label="商品" width="380">
                            <template #default="scope">
                                <div style="display:flex;align-items: center;">
                                    <div>
                                        <el-image style="width: 80px; height: 80px" :src="scope.row.img_md"
                                            fit="fill" />
                                    </div>
                                    <div>{{scope.row.name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_price" label="单价" />
                        <el-table-column prop="goods_num" label="数量" />
                    </el-table>
                </template>

            </el-table-column>
            <el-table-column prop="payment" label="付款总额" />
            <el-table-column prop="create_time" label="下单时间" sortable />
            <el-table-column prop="status" label="状态" sortable />
            <el-table-column prop="operation" label="操作" #default="scope">
                <el-button type="primary" plain @click="handleEdit(scope.row.id,scope.$index)">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                </el-button>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import Order from '@/api/order';

let orderlist = ref([]);
async function loadlist() {
    let { status, msg, data } = await Order.allorderlist({ status: "all" });
    console.log(data);
    if (status) {
        orderlist.value = data;
    }
}
loadlist();
// console.log(orderlist.goodsList);

</script>

<style scoped>
.innerflex {
    display: flex;
    justify-content: space-between;
}
</style>