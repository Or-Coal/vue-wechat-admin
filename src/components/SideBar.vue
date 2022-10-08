<template>
    <div class="bg">
        <el-menu :collapse="menu.isCollapsed" active-text-color="#ffd04b" background-color="pink" text-color="#fff"  router>

  
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/system/menu">
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                    <span>商品分类</span>
                </el-menu-item>
                <el-menu-item index="/account/issue">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>发布商品</span>
                </el-menu-item>
                <el-menu-item index="/account/product">
                    <el-icon>
                        <Discount />
                    </el-icon>
                    <span>商品列表</span>
                </el-menu-item>
            </el-sub-menu>


            <el-sub-menu index="4">
                <template #title>
                    <el-icon>
                        <DataBoard />
                    </el-icon>
                    <span>订单管理</span>
                </template>
                <el-menu-item index="/account/indent">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>订单列表</span>
                </el-menu-item>
            </el-sub-menu>
       

            <el-sub-menu index="6">
                <template #title>
                    <el-icon>
                        <SetUp />
                    </el-icon>
                    <span>账户设置</span>
                </template>
                <el-menu-item index="/account/list">
                    <el-icon>
                        <Picture />
                    </el-icon>
                    <span>账户信息</span>
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="7">
                <template #title>
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user/list">
                    <el-icon>
                        <Medal />
                    </el-icon>
                    <span>用户列表</span>
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <DataAnalysis />
                    </el-icon>
                    <span>权限设置</span>
                </template>
                <el-menu-item index="/system/edit">
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                    <span>用户角色</span>
                </el-menu-item>
                <el-menu-item index="/system/menu2">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>菜单权限</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>
<script>
    import {useMenuStore} from '@/stores/menu.js'
    export default {
setup(){
    let menu = useMenuStore()
   
    
    return {
        menu
    }
}
    }

</script>
<style lang='less' scoped>
.bg {
    background-color: pink;
    min-height: calc(100vh - 60px);
    height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
