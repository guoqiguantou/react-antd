export default (state = [
    {
        "meta": {
            "title": "首页",
        },
        "name": "/",
        "icon": "pie-chart",
        "id": "0",
        "state": "closed"
    },
    {
        "meta": {
            "title": "关于"
        },
        "name": "/about",
        "icon": "desktop",
        "id": "9",
        "state": "closed"
    },
    {
        "children": [
            {
                "meta": {
                    "icon": "antangkousousuo",
                    "title": "菜单管理"
                },
                "name": "/trace",
                "id": "12",
                "state": "open"
            },
            {
                "meta": {
                    "title": "用户管理"
                },
                "name": "/user",
                "id": "3c53e8a8e14e43d78ef6b47c1e9875a3",
                "state": "open",
                "children": [
                    {
                        "meta": {
                            "title": "基础信息管理"
                        },
                        "name": "/baseData",
                        "id": "1",
                        "state": "closed"
                    }
                ]
            },
            {
                "meta": {
                    "title": "角色管理"
                },
                "name": "/code",
                "id": "3c",
                "state": "open"
            }
        ],
        "meta": {

            "title": "系统管理"
        },
        "icon": "calendar",
        "name": "/systemData",
        "id": "4",
        "state": "closed"
    },
    {
        "children": [
            {
                "meta": {
                    "title": "字典类型"
                },
                "name": "/dictionaryData",
                "id": "10",
                "state": "open"
            }
        ],
        "meta": {
            "icon": "zidianguanli",
            "title": "字典管理"
        },
        "name": "/dictionary",
        "icon": "appstore",
        "id": "3",
        "state": "closed"
    }
]
    , action) => {
    return state
}