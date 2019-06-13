import React, { Component } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import styles from './index.module.less'
const { TextArea } = Input;
const { Option } = Select;
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
    handleSelectChange = (value) => {
        this.props.form.setFieldsValue({
            type: value === "0" ? 1 : 2,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { extendData, isadd, editData } = this.props;

        let roleIds = editData.roleList ? editData.roleList.map(item => {
            return item.id
        }) : null
        return (
            <Form onSubmit={this.handleSubmit} className={styles.fromModal} labelCol={{ span: 8 }}>
                <Row gutter={24} className={styles.formrow}>
                    <Col span={12} >
                        <Form.Item label="姓名" className={styles.formitem}> {
                            getFieldDecorator('name', {
                                initialValue: isadd ? null : editData.name,
                                rules: [{ type: 'string', required: true, message: '请输入姓名' }],
                            })(<Input placeholder="请输入姓名" />)}
                        </Form.Item>
                    </Col >
                    <Col span={12} >
                        <Form.Item label="手机号" className={styles.formitem}> {
                            getFieldDecorator('mobile', {
                                initialValue: isadd ? null : editData.mobile,
                                rules: [{ type: 'string', required: true, message: '请输入手机号' }],
                            })(<Input placeholder="请输入手机号" />)}
                        </Form.Item>
                    </Col >
                </Row >
                <Row gutter={24} className={styles.formrow}>
                    <Col span={12} >
                        <Form.Item label="账号" className={styles.formitem}> {
                            getFieldDecorator('code', {
                                initialValue: isadd ? null : editData.code,
                                rules: [{ required: true, message: '请输入账号' }],
                            })(<Input placeholder="请输入账号" />)}
                        </Form.Item>
                    </Col >
                    <Col span={12} >
                        <Form.Item label="角色" className={styles.formitem}>
                            {getFieldDecorator('roleIds', {
                                initialValue: isadd ? [] : roleIds,
                                rules: [
                                    { required: true, message: '请选择角色', type: 'array' },
                                ],
                            })(
                                <Select mode="multiple" placeholder="请选择角色">
                                    {
                                        extendData.map(item => {
                                            return <Option value={item.id} key={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col >
                </Row >
                <Row gutter={24} >
                    <Col span={24} >
                        <Form.Item label="备注" labelCol={{ span: 4 }} className={styles.formitem}> {
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