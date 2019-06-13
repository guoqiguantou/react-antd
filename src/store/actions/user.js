import { SETTOKEN, SETUSERNAME, SETMENULIST, SETUSERID, LOGOUT } from '../actionType/user';
export const setToken = (token) => (
    {
        type: SETTOKEN,
        token: token
    }
)
export const setUserName = (userName) => (
    {
        type: SETUSERNAME,
        userName: userName
    }
)
export const setMenuList = (menuList) => (
    {
        type: SETMENULIST,
        menuList: menuList
    }
)
export const setUserId = (userId) => (
    {
        type: SETUSERID,
        userId: userId
    }
)
export const logout = () => (
    {
        type: LOGOUT
    }
)

