import {
    SETTOKEN,
    SETUSERNAME,
    SETMENULIST,
    SETUSERID,
    LOGOUT
} from '../actionType/user';
import {
    getUserFromLocalstorage,
    setUserInLocalstorage
} from './../../libs/util'
/**
{
	avatorImgPath:""//用户头像
    menuList:[]//用户菜单
    token:"59bb1001285f29b4acbf928d58de4237"
    userId:"1"
    userName:"admin"
} */

export const user = (state = {
    avatorImgPath: "",
    menuList: getUserFromLocalstorage().menuJson || [],
    token: getUserFromLocalstorage().token || "",
    userId: getUserFromLocalstorage().id || "",
    userName: getUserFromLocalstorage().name || ""
}, action) => {
    switch (action.type) {
        case SETTOKEN:
            return {
                ...state,
                token: action.token
            };
        case SETUSERNAME:
            return {
                ...state,
                userName: action.userName
            };
        case SETUSERID:
            return {
                ...state,
                userId: action.userId
            };
        case SETMENULIST:
            return {
                ...state,
                menuList: action.menuList
            };
        case LOGOUT:
            setUserInLocalstorage({})
            return {
                ...state,
                userName: '',
                token: '',
                menuList: '',
                userId: ''
            };
        default:
            return state;

    }
}