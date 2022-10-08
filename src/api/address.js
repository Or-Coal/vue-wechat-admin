import axios from 'axios';
//获取所有省份
let province = (params) => axios.get('/pcct/province', { params })

//根据省份id获取城市
let city = (params) => axios.get('/pcct/city', { params })

//根据城市id获取县区
let county = (params) => axios.get('/pcct/county', { params })

//根据县区id获取街道（镇）
let town = (params) => axios.get('/pcct/town', { params })

export default {
    town,
    county,
    province,
    city,
}