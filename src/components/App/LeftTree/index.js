import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { addTablist } from '../../../store/actions/app'
const SubMenu = Menu.SubMenu;

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [''],//当前选中Item
            openKeys: [''],//当前打开SubMenu
        };
        this.getRootSubmenuKeys();
        this.home = window.router.match.path;
    }
    componentWillMount() {
        this.setDataByRouter(this.props.router)
    }
    //监听路由变化
    componentWillReceiveProps(nextprops) {
        this.setDataByRouter(nextprops.router)
    }
    //格式化当前路由["/systemData", "/trace"]
    getRouters(router) {
        this.routers = router.location.pathname.split('/');
        this.routers.shift();
        this.routers = this.routers.map(item => {
            return `${item}`
        })
    }
    //提取带子节点的根节点["video", "outline", "systemData"]
    getRootSubmenuKeys() {
        this.rootSubmenuKeys = [];
        let rootarr = [];
        rootarr = this.props.lefttree.filter((item) => {
            return item.children && item.children.length
        })
        rootarr.forEach(item => {
            this.rootSubmenuKeys.push(item.name)
        })
    }

    setDataByRouter = (router) => {
        this.getRouters(router);
        this.setState({
            openKeys: this.routers.slice(0, -1),
            selectedKeys: this.routers.slice(-1),
        });
    }

    //SubMenu 展开/关闭的回调
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    //点击 MenuItem 调用此函数
    onClick = ({ item, key, keyPath }) => {
        let keyPaths = keyPath.reverse().join('/');
        this.props.onaddTablist({
            meta: item.props.detail.meta,
            name: key,
            path: keyPaths
        })
        this.setState({
            selectedKeys: [key],
        })
    }
    //获取左侧树的节点
    getlistdom = (list, name) => {
        let newlist = list.map(item => {
            let path = name ? `${this.home}/${name}/${item.name}` : `${item.name}`;
            if (item.children && item.children.length) {
                return (
                    <SubMenu key={item.name} title={<span>{
                        item.icon &&
                        // <Icon type={item.icon} />
                        <Icon type="pie-chart" />
                    } <span>{this.$language(item.meta.title)}</span></span>}>
                        {
                            this.getlistdom(item.children, path)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.name} detail={item}>
                        {
                            <Link to={path} replace>
                                {
                                    item.icon &&
                                    <Icon type={item.icon} />
                                }
                                <span>{this.$language(item.meta.title)}</span>
                            </Link>
                        }
                    </Menu.Item>
                )
            }
        })
        return newlist;
    }

    render() {
        let { lefttree, app } = this.props;
        let { selectedKeys, openKeys } = this.state;

        return (
            < Menu
                mode="inline"
                theme={app.themeStyle}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                onClick={this.onClick}
            >
                {
                    lefttree && this.getlistdom(lefttree)
                }

            </Menu >
        );
    }
}
const mapStateToProps = state => {
    return {
        lefttree: state.user.menuList,
        app: state.app
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddTablist: list => {
            dispatch(addTablist(list))
        }
    }
}
const LeftTree = connect(
    mapStateToProps, mapDispatchToProps
)(View)

export default LeftTree;