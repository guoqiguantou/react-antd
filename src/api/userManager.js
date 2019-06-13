import http from '../libs/http'
// 用户管理
export const getUserData = (data) => {
    return http('user/page', data)
}
// 用户角色
export const getUserRoleData = (data) => {
    return http('user/showRole', data)
}
// 添加用户
export const getAddUserData = (data) => {
    return http('user/save', data)
}
// 用户准备修改
export const beginUpdateUserData = (data) => {
    return http('user/toupdate', data)
}
// 用户修改
export const getUpdateUserData = (data) => {
    return http('user/update', data)
}
// 用户状态
export const changeUserStatus = (data) => {
    return http('user/isforbidden', data)
}
// 重置密码
export const resetPass = (data) => {
    return http('user/resetPwd', data)
}