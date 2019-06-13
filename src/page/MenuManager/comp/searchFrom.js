import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import styles from './index.module.less'
class searchFrom extends Component {
    constructor(props) {
        super(props);
        props.getSearchData(this);
    }
    validateTrim = (rule, value, callback) => {
        if (value && value !== "" && value.trim() === "") {
            callback(new Error("请不要只输入空格"));
        } else {
            callback();
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.formwarp}>
                <Row gutter={24} >
                    <Col span={12} >
                        <Form.Item label="菜单名称" className={styles.formitem}> {
                            getFieldDecorator('name', {
                                initialValue: null,
                                rules: [{
                                    validator: this.validateTrim,
                                }],
                            })(<Input placeholder="请输入菜单名称" style={{ flex: 1 }} />)}
                        </Form.Item>
                    </Col >
                    <Col span={12} >
                        < Form.Item label="导航名称" className={styles.formitem}> {
                            getFieldDecorator('code', {
                                initialValue: null,
                                rules: [{
                                    validator: this.validateTrim,
                                }],
                            })(<Input placeholder="请输入导航名称" />)}
                        </Form.Item>
                    </Col >
                </Row >
            </Form>
        );
    }
}

const From = Form.create({ name: 'searchFrom' })(searchFrom);
export default From