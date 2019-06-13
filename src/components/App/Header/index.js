import React, { Component } from 'react';
import { Menu, Dropdown, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import { connect } from 'react-redux';
import BreadNav from '../BreadNav';
import { changeLanguage } from '../../../store/actions/app.js';
import { message } from 'antd';
import { setUserName, setToken, setMenuList, setUserId } from '../../../store/actions/user';
import { setUserInLocalstorage } from '../../../libs/util'
class View extends Component {
    constructor(props) {
        super(props);
        this.lang = [{
            text: '简体中文',
            name: 'zh'
        }, {
            text: '繁体中文',
            name: 'hk'
        }, {
            text: '英文',
            name: 'en'
        }];
    }
    changeLocal = (lang) => {
        this.props.onchangeLanguage(lang);
    }
    logoutfunc = () => {
        message.success('退出成功', 0.5, () => {
            this.props.setUserName('');
            this.props.setToken('');
            this.props.setMenuList([]);
            this.props.setUserId('');
            setUserInLocalstorage({})
            window.router.history.push("/login");

        });


    }
    render() {
        let { app } = this.props;
        const menu = (
            <Menu style={{ width: 140 }}>
                <Menu.Item>
                    <Link to="/systemData/user/baseData"><Icon type="bell" /><span style={{ fontSize: '10px', marginLeft: '5px' }}>个人中心</span></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/systemData/code"><Icon type="setting" /><span style={{ fontSize: '10px', marginLeft: '5px' }}>个人设置</span></Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={this.logoutfunc}>
                    <span style={{ fontSize: '10px', marginLeft: '5px' }} >退出登录</span>
                </Menu.Item>
            </Menu>
        );
        const language = (
            <Menu style={{ width: 120, fontSize: '10px' }} selectedKeys={[`${app.language}`]}>
                {this.lang.map(item => <Menu.Item key={item.name} onClick={this.changeLocal.bind(this, item.name)} ><span style={{ fontSize: '10px' }}>{item.text}</span></Menu.Item>)}
            </Menu>
        );
        return (
            <div className={styles.headerwarp}>
                <BreadNav />
                <div className={styles.headermenu}>
                    <div className={styles.menu}>
                        <Icon type="arrows-alt" style={{ 'margin': '23px 8px', fontSize: '18px' }} />
                    </div>
                    <Dropdown overlay={language}>
                        <div className={styles.menu}>
                            <Icon type="global" style={{ 'margin': '23px 8px', fontSize: '18px' }} />
                        </div>
                    </Dropdown>
                    <Dropdown overlay={menu}>
                        <div className={styles.menu}>
                            <Avatar icon="user" size={24} style={{ 'margin': '20px 8px' }} src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
                            <span>张三丰</span>
                        </div>
                    </Dropdown>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        app: state.app,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onchangeLanguage: language => dispatch(changeLanguage(language)),
        setUserName: userName => dispatch(setUserName(userName)),
        setToken: token => dispatch(setToken(token)),
        setMenuList: menuList => dispatch(setMenuList(menuList)),
        setUserId: userId => dispatch(setUserId(userId))
    }
}
const HeaderMenu = connect(
    mapStateToProps, mapDispatchToProps
)(View)


export default HeaderMenu;