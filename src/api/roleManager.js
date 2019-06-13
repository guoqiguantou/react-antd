import http from '../libs/http'

// 角色管理
export const getRoleData = (data) => {
    return http('role/page', data)
}
// 添加角色
export const addRoleData = (data) => {
    return http('role/save', data)
}
// 角色准备修改
export const beginUpdateRoleData = (data) => {
    return http('role/toupdate', data)
}
// 角色修改
export const updateRoleData = (data) => {
    return http('role/update', data)
}
// 角色删除
export const delRoleData = (data) => {
    return http('role/del', data)
}
// 获取权限树
export const getAuthData = (data) => {
    return http('role/loadCheckMenuInfo', data)
}
// 修改权限树
export const saveAuthData = (data) => {
    return http('role/saveMenuSet', data)
}