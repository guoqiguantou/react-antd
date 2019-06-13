import React, { Component } from 'react';
import { Tabs, Icon, Menu } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addTablist, removeTablist, removeOtherTablist, removeAllTablist } from '../../../store/actions/app';
import styles from './index.module.less'
const TabPane = Tabs.TabPane;
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'home',
            rightshow: false,
            position: {
                left: 0,
                top: 0
            }
        };
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        this.props.onremoveTablist({
            path: targetKey,
            isactive: targetKey === activeKey
        });
    }
    tabclick = (key) => {
        if (key === 'home') {
            window.router.history.push(`/home`);
        } else {
            window.router.history.push(`/home/${key}`);
        }

    }
    componentDidMount() {
        this.getactiveKey(this.props)
        document.onclick = () => {
            this.setState({
                rightshow: false
            })
        }
    }
    componentWillUnmount() {
        document.onclick = null
    }
    getactiveKey(props) {
        for (let i in props.tablist) {
            if (`${props.match.path}/${props.tablist[i].path}` === props.location.pathname) {
                this.setState({
                    activeKey: props.tablist[i].path,
                })
            }
        }
    }
    componentWillReceiveProps(nextprops) {
        for (let i in nextprops.tablist) {
            if (`${nextprops.match.path}/${nextprops.tablist[i].path}` === nextprops.location.pathname) {
                this.setState({
                    activeKey: nextprops.tablist[i].path,
                })
            }
        }
    }
    rightTab = (item, event) => {
        event.preventDefault();
        event.returnValue = false;
        let position = {
            left: event.pageX,
            top: event.pageY
        }
        this.setState({
            position,
            rightshow: true
        })
        this.eventitem = item
    }
    removeOtherTablist = () => {
        this.props.onremoveOtherTablist(this.eventitem.path)
    }
    removeAllTablist = () => {
        this.props.onremoveAllTablist()
    }
    render() {
        let { tablist } = this.props;
        const menu = (
            <Menu className={styles.itemul}>
                <Menu.Item className={styles.itemli} onClick={this.removeOtherTablist}>
                    <span>关闭其他</span>
                </Menu.Item>
                <Menu.Item className={styles.itemli} onClick={this.removeAllTablist}>
                    <span>关闭所有</span>
                </Menu.Item>
                <Menu.Item className={styles.itemli}>
                    <span>刷新页面</span>
                </Menu.Item>
            </Menu>
        );
        let { position, rightshow } = this.state;
        return (

            <div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    tabBarStyle={{ background: '#fff', margin: '0px 0 0', padding: '0px 15px' }}
                    onTabClick={this.tabclick}
                    tabBarGutter={5}
                >
                    {tablist && tablist.map(item =>
                        <TabPane tab={!item.closable ? <span onContextMenu={this.rightTab.bind(this, item)}> {item.meta.title} </span> : <span><Icon type="home" />{item.meta.title}</span>} key={item.path} closable={!item.closable} />
                    )}
                </Tabs>
                {rightshow &&
                    <div style={{ position: 'fixed', zIndex: 999, ...position }}>{menu}</div>
                }

            </div>
        );
    }
}
const Tabwarp = withRouter(View);
const mapStateToProps = state => {
    return {
        tablist: state.app.tablist
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onaddTablist: list => {
            dispatch(addTablist(list))
        },
        onremoveTablist: list => {
            dispatch(removeTablist(list))
        },
        onremoveOtherTablist: path => {
            dispatch(removeOtherTablist(path))
        },
        onremoveAllTablist: () => {
            dispatch(removeAllTablist())
        }
    }
}
const Tab = connect(
    mapStateToProps, mapDispatchToProps
)(Tabwarp)

export default Tab;
