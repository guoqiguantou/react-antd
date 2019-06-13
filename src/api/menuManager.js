import http from '../libs/http'

//菜单树
export const systemMenu = () => {
    return http('menu/loadMenu')
}
//菜单表
export const systemMenuTable = (data) => {
    return http('menu/page', data)
}
//一级菜单
export const menuTypeOne = () => {
    return http('menu/showParentMenu')
}
//新增菜单
export const addMenu = (data) => {
    return http('menu/save', data)
}
//删除菜单
export const delMenu = (data) => {
    return http('menu/del', data)
}
//获取修改菜单的信息
export const toUpdateMenu = (data) => {
    return http('menu/toupdate', data)
}
//修改菜单
export const updateMenu = (data) => {
    return http('menu/update', data)
}
