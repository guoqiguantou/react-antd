import React, { Component } from 'react';
import styles from './index.module.less';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { loginIn } from '../../api/user'
import { setUserName, setToken, setMenuList, setUserId } from '../../store/actions/user';
import { setUserInLocalstorage } from '../../libs/util.js'
class View extends Component {
    constructor(props) {
        super(props);
        window.router = { history: this.props.history, location: this.props.location, match: this.props.match };
    }
    clickColor = () => {
        window.less.modifyVars({ '@primary-color': this.props.app.themeColor, '@btn-primary-bg': this.props.app.themeColor })

    }
    componentDidMount() {
        this.clickColor();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getLogin(values);
            }
        });
    }
    async getLogin(data) {
        let datas = {
            code: data.userName,
            password: data.passWord
        };
        const res = await loginIn(datas);
        console.log(res)
        if (res) {
            this.props.setUserName(res.data.name);
            this.props.setToken(res.data.token);
            this.props.setMenuList(res.data.menuJson);
            this.props.setUserId(res.data.id);
            setUserInLocalstorage({ ...res.data })
            message.success('登录成功', 0.5, () => {
                this.props.history.replace("/home")
            });

            //return await Promise.resolve();
        } else {
            return await Promise.reject('登录错误');
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.loginwarp}>
                <div className={styles.warpbg}></div>
                <Row align="middle" justify='center' type="flex" style={{ height: '100%' }} >
                    <Col xs={24} sm={24} md={20} lg={20} xl={17} xxl={16} style={{ height: 750 }}>
                        <div className={styles.warpcon}>
                            <Row align="middle" type="flex" justify="end" style={{ height: '100%' }}>
                                <Col xs={8} sm={10} md={7} lg={7} xl={6.5} xxl={6} style={{ height: '45%' }} className={styles.loginforms} pull={3}>
                                    <h3 className="logintitle">视频远程控制</h3>
                                    <Form onSubmit={this.handleSubmit} className={styles.loginform}>
                                        <Form.Item>
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请输入用户名!' }],
                                            })(
                                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('passWord', {
                                                rules: [{ required: true, message: '请输入密码!' }],
                                            })(
                                                <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                                                // <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" password />
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(
                                                <Checkbox>记住密码</Checkbox>
                                            )}
                                            <Button type="primary" htmlType="submit" className={styles.loginformbutton}>登录</Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>

                            <div className={styles.loginform} >

                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

const Logins = Form.create({ name: 'normal_login' })(View);

const Login = withRouter(Logins);
const mapStateToProps = state => {
    return {
        app: state.app
    }
}
const mapDispatchToProps = dispatch => ({
    setUserName: userName => dispatch(setUserName(userName)),
    setToken: token => dispatch(setToken(token)),
    setMenuList: menuList => dispatch(setMenuList(menuList)),
    setUserId: userId => dispatch(setUserId(userId))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login)

