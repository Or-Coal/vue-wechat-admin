import axios from 'axios'
export function login(data) { return axios.post('/admins/login', data) };

export default {
    // 登录
    // login(data) { return axios.post('/admin/login', data) }
    login: (data) => axios.post('/admins/login', data),
    // 注册
    register: (data) => axios.post('/admin/register', data),
    // 检测用户名是否可用
    checkUsername: (data) => axios.post('/admin/check/username', data),
    // 获取管理员列表
    adminList: (params) => axios.get('/admin/list', { params }),
    // 删除账户
    listRemove: (data) => axios.post('/admin/remove', data),
    // 为角色配置菜单
    RoleMenu: (params) => axios.get('/role/menu/', { params }),
    // 获取权限角色列表
    plist: (params) => axios.get('/role/list', { params }),
    //角色配置菜单
    GroleMenu: (data) => axios.post('/role/menu', data),
    // 获取管理员个人资料
    adminInfo: (params) => axios.get('/admins', { params }),
    adminInfoP: (data) => axios.post('/admin/info', data),
    //删除按钮 
    premove: (id, params) => axios.delete(`/role/${id}`, { params }),
    //编辑按钮——————保存编辑
    pedit: (id, data) => axios.put(`/role/${id}`, data)
}