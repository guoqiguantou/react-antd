import {
    CHANGETHEMESTYLE,
    CHANGETHEMECOLOR,
    FIXEDHEADER,
    FIXEDLEFT,
    CHANGELANGUAGE,
    ADDTABLIST,
    REMOVETABLIST,
    REMOVEOTHERTABLIST,
    REMOVEALLTABLIST
} from '../actionType/app';
import {
    setThemeLocalstorage,
    getThemeLocalstorage,
    getLanguageLocalstorage,
    setLanguageLocalstorage,
    setTabNavListLocalstorage,
    getTabNavListLocalstorage
} from './../../libs/util'
/**
 * {
	themestyle:"light|dark",//主题样式
    themecolor:"blue",  //主题颜色
    fixedHeader: true,//固定头部
    fixedLeft: true,//固定左侧
    hideHeader:true,//下滑时隐藏Header
	breadCrumbList: [],//面包屑导航
    tablist: [],//选项卡导航
    homeRoute: {},//首页路由
    local:"",//中英文切换 zh en
} */

export const app = (state = {
    themeStyle: "dark",
    themeColor: getThemeLocalstorage() || "#1890ff",
    fixedHeader: true,
    fixedLeft: true,
    hideHeader: true,
    breadCrumbList: [],
    homeRoute: {},
    language: getLanguageLocalstorage() || "zh",
    tablist: getTabNavListLocalstorage() || [{
        meta: {
            icon: "md-funnel",
            title: "首页",
        },
        name: "home",
        path: 'home',
        closable: true,
    }],
}, action) => {
    switch (action.type) {
        case CHANGETHEMESTYLE:
            return {
                ...state,
                themeStyle: action.style
            };
        case CHANGETHEMECOLOR:
            setThemeLocalstorage(action.color)
            return {
                ...state,
                themeColor: action.color
            };
        case FIXEDHEADER:
            return {
                ...state,
                fixedHeader: action.bool
            };
        case FIXEDLEFT:
            return {
                ...state,
                fixedLeft: action.bool
            };
        case CHANGELANGUAGE:
            setLanguageLocalstorage(action.language)
            return {
                ...state,
                language: action.language
            };
        case ADDTABLIST:
            let falg = false;
            state.tablist.forEach((item) => {
                if (item.name === action.list.name) {
                    falg = true;
                }
            })
            if (falg) {
                setTabNavListLocalstorage(state.tablist)
                return state;
            } else {
                setTabNavListLocalstorage([...state.tablist, {
                    meta: action.list.meta,
                    name: action.list.name,
                    path: action.list.path
                }])
                return {
                    ...state,
                    tablist: [...state.tablist, {
                        meta: action.list.meta,
                        name: action.list.name,
                        path: action.list.path
                    }]
                };

            }
        case REMOVETABLIST:
            let tablists = state.tablist;
            let activeIndex;
            tablists = tablists.filter(item => {
                return item.path !== action.list.path
            })
            if (action.list.isactive) {
                //删除选中项目
                state.tablist.forEach((item, index) => {
                    if (item.path === action.list.path) {
                        activeIndex = index;
                    }
                })
                if (activeIndex === state.tablist.length - 1) {
                    //删除最后一项
                    if (state.tablist.length === 2) {
                        //前面只有首页
                        window.router.history.push('/home');
                    } else {
                        window.router.history.push(`/home/${state.tablist[activeIndex - 1].path}`);
                    }
                } else {
                    //删除中间项
                    window.router.history.push(`/home/${state.tablist[activeIndex + 1].path}`);
                }
            }
            setTabNavListLocalstorage(tablists)
            return {
                ...state,
                tablist: tablists
            }
        case REMOVEOTHERTABLIST:
            let tablist = state.tablist;
            let homelist = state.tablist[0];
            tablist = tablist.filter(item => {
                return item.path === action.path
            })
            window.router.history.push(`/home/${action.path}`);
            setTabNavListLocalstorage([homelist].concat(tablist))
            return {
                ...state,
                tablist: [homelist].concat(tablist)
            }
        case REMOVEALLTABLIST:
            let hometablist = state.tablist[0];
            window.router.history.push('/home');
            setTabNavListLocalstorage([hometablist])
            return {
                ...state,
                tablist: [hometablist]
            }
        default:
            return state;

    }
}