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

    extend = (value) => ({
        type: value.pid === "0" ? 1 : 2,

    })

    validateTrim = (rule, value, callback) => {
        if (value && value !== "" && value.trim() === "") {
            callback(new Error("请不要只输入空格"));
        } else {
            callback();
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { extendData, isadd, editData } = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className={styles.fromModal} labelCol={{ span: 8 }}>
                <Row gutter={24} className={styles.formrow}>
                    <Col span={12} >
                        <Form.Item label="菜单名称" className={styles.formitem}> {
                            getFieldDecorator('name', {
                                initialValue: isadd ? null : editData.name,
                                rules: [{ type: 'string', required: true, message: '请输入菜单名称' }],
                            })(<Input placeholder="请输入菜单名称" />)}
                        </Form.Item>
                    </Col >
                    <Col span={12} >
                        < Form.Item label="上级菜单" className={styles.formitem}> {
                            getFieldDecorator('pid', {
                                initialValue: isadd ? "0" : editData.pid,
                            })(<Select placeholder="请选择上级菜单" >
                                {
                                    extendData && extendData.map(item => {
                                        return <Option value={item.id} key={item.id}>{item.title}</Option>
                                    })
                                }
                            </Select>)}
                        </Form.Item>
                    </Col >
                </Row >
                <Row gutter={24} className={styles.formrow}>
                    <Col span={12} >
                        <Form.Item label="菜单排序" className={styles.formitem}> {
                            getFieldDecorator('seq', {
                                initialValue: isadd ? null : editData.seq,
                                rules: [{ required: true, message: '请输入菜单排序' }],
                            })(<Input placeholder="请输入菜单排序" type="number" />)}
                        </Form.Item>
                    </Col >
                    <Col span={12} >
                        < Form.Item label="菜单导航" className={styles.formitem}> {
                            getFieldDecorator('code', {
                                initialValue: isadd ? null : editData.code,
                                rules: [{ type: 'string', required: true, message: '请输入菜单导航' }],
                            })(<Input placeholder="请输入菜单导航" />)}
                        </Form.Item>
                    </Col >
                </Row >
                <Row gutter={24} className={styles.formrow}>
                    <Col span={12} >
                        <Form.Item label="图标名称" className={styles.formitem}> {
                            getFieldDecorator('icon', {
                                initialValue: isadd ? null : editData.icon,
                                rules: [{ type: 'string', required: true, message: '请输入图标名称' }],
                            })(<Input placeholder="请输入图标名称" />)}
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