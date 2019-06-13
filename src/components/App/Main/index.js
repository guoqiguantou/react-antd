import React, { Component } from 'react';
import { Layout, Icon, Drawer, Button } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import LeftTree from '../LeftTree';
import HeaderMenu from '../Header';
import Theme from '../Theme';
import Tab from '../Tab';
import styles from './index.module.less';
const { Header, Sider, Content, Footer } = Layout;
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            visible: false
        };
        window.router = { history: this.props.history, location: this.props.location, match: this.props.match };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    clickColor = () => {
        window.less.modifyVars({ '@primary-color': this.props.app.themeColor, '@btn-primary-bg': this.props.app.themeColor })

    }

    showDrawer = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };
    componentDidMount() {
        this.clickColor();
    }

    render() {
        let { collapsed } = this.state;
        let { app } = this.props;
        return (
            <Layout className={[styles.main, app.fixedHeader ? styles.fixedheader : null, app.fixedLeft ? styles.fixedLeft : null]}>
                <Sider
                    theme={app.themeStyle}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={250}
                    className={styles.left}
                >
                    <div className={app.themeStyle === 'dark' ? styles.logo : styles.logodark} />
                    <LeftTree router={{ history: this.props.history, location: this.props.location, match: this.props.match }} />
                </Sider>
                <Layout className={[styles.right, collapsed ? styles.rightcollapsed : null]}>
                    <Header className={[styles.header, collapsed ? styles.headercollapsed : null]}>
                        <Icon
                            className={styles.trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <HeaderMenu />
                    </Header>
                    <div className={`${styles.tab} ${collapsed ? styles.tabcollapsed : null}`}>
                        <Tab />
                    </div>
                    <Content className={styles.content}>
                        {this.props.children}
                    </Content>
                    <Footer className={styles.footer}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
                <Button type="primary" icon="setting" onClick={this.showDrawer} className={styles.openbtns} />
                <Drawer
                    placement="right"
                    onClose={this.onClose}
                    visible={this.state.visible}
                    width={300}
                >
                    <Button type="primary" icon={this.state.visible ? 'close' : 'setting'} onClick={this.showDrawer} className={styles.openbtn} />
                    <Theme />
                </Drawer>
            </Layout>
        );
    }
}
const Mains = withRouter(View);

const mapStateToProps = state => {
    return {
        app: state.app
    }
}


const Main = connect(
    mapStateToProps, null
)(Mains)

export default Main;

