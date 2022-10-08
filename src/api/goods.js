//商品
import axios from "axios";

//商品所有分类
let allcategory = (params) => axios.get('/category/all', { params });
//获取子级分类
let subcate = (params) => axios.get('/category/sub', { params })
//编辑（更新）分类
let categoryedit = (id, data) => axios.put(`/category/${id}`, data);
// 添加分类
let categoryadd = (data) => axios.post('/category', data);
// 删除分类
let categorydelete = (id, params) => axios.delete(`/category/${id}`, { params });



//发布商品
let release = (data) => axios.post('/seller/goods', data);

//商品列表
let list = (params) => axios.get('/seller/goods/list', { params });

//删除
let remove = (id, data) => axios.delete(`/seller/goods/${id}`, data)

export default {
    allcategory,
    subcate,
    categoryedit,
    categoryadd,
    categorydelete,
    release,
    list,
    remove,
}