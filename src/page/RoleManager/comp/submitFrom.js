import React, { Component } from 'react';
import { Form, Input, Row, Col } from 'antd';
import styles from './index.module.less'
const { TextArea } = Input;
class submitFrom extends Component {
    constructor(props) {
        super(props);
        props.getSumitData(this);
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
        const { isadd, editData } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.fromModal} labelCol={{ span: 4 }}>
                <Row gutter={24} className={styles.formrow}>
                    <Col span={24} >
                        <Form.Item label="角色编码" className={styles.formitem}> {
                            getFieldDecorator('code', {
                                initialValue: isadd ? null : editData.code,
                                rules: [{ type: 'string', required: true, message: '请输入角色编码' }],
                            })(<Input placeholder="请输入角色编码" />)}
                        </Form.Item>
                    </Col >
                </Row >
                <Row gutter={24} className={styles.formrow}>
                    <Col span={24} >
                        <Form.Item label="角色名称" className={styles.formitem}> {
                            getFieldDecorator('name', {
                                initialValue: isadd ? null : editData.name,
                                rules: [{ type: 'string', required: true, message: '请输入角色名称' }],
                            })(<Input placeholder="请输入角色名称" />)}
                        </Form.Item>
                    </Col >
                </Row >
                <Row gutter={24} >
                    <Col span={24} >
                        <Form.Item label="备注" className={styles.formitem}> {
                            getFieldDecorator('memo', {
                                initialValue: isadd ? null : editData.memo,
                                rules: [{
                                    validator: this.validateTrim,
                                }],
                            })(<TextArea placeholder="请输入备注信息" autosize={{ minRows: 2, maxRows: 6 }} />)}
                        </Form.Item>
                    </Col >
                </Row >
            </Form>
        );
    }
}

const From = Form.create({ name: 'submitFrom' })(submitFrom);
export default From