import axios from "axios";

//获取所有账户订单信息
let allorderlist = (params) => axios.get('/seller/order/list', { params });

export default {
    allorderlist,
}