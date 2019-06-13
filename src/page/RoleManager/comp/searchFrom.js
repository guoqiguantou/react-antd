import React, { Component } from 'react';
import { Form, Input, Row, Col, DatePicker } from 'antd';
import styles from './index.module.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker
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
    extend = (value) => ({
        startTime: value.time ? moment(value.time[0], dateFormat) : null,
        endTime: value.time ? moment(value.time[1], dateFormat) : null,
    })
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.formwarp}>
                <Row gutter={24} >
                    <Col span={12} >
                        <Form.Item label="角色名称" className={styles.formitem}> {
                            getFieldDecorator('name', {
                                initialValue: null,
                                rules: [{
                                    validator: this.validateTrim,
                                }],
                            })(<Input placeholder="请输入角色名称" />)}
                        </Form.Item>
                    </Col >
                    <Col span={12} >
                        <Form.Item label="选择时间" className={styles.formitem}>{
                            getFieldDecorator('time', {
                            })(<RangePicker format={dateFormat} locale={locale} />)}
                        </Form.Item>
                    </Col >

                </Row >
            </Form>
        );
    }
}

const From = Form.create({ name: 'searchFrom' })(searchFrom);
export default From