<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>商品列表</span>
            </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        <el-pagination v-model:currentPage="currentPage2" v-model:page-size="pageSize2"
            :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
            layout=" prev, pager, next,sizes" :total="1000" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
const currentPage2 = ref(5)
const pageSize2 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
let handleCurrentChange = (a)=>{console.log(a)}
</script>
<style lang='less' scoped>

</style>
