import http from '../libs/http'
//登录
export const loginIn = (data) => {
    return http('admin/login', data)
}
//获取角色
export const roleList = (data) => {
    return http('role/listRole', data)
}