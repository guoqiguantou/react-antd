import React, { Component } from 'react';
import { Form, Input, Select, Button, Table, Row, Col, Modal } from 'antd';
import { connect } from 'react-redux'
import './index.css';
import { systemMenuTable, menuTypeOne, addMenu, delMenu, toUpdateMenu, updateMenu } from '../../../api/menuManager';
const { TextArea } = Input;
const { Option } = Select;
const confirm = Modal.confirm;
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: null,
            index: 1,
            mid: null,
            name: null,
            size: 10,
            tablelist: null,
            count: null,
            visible: false,
            isadd: true,
            menulist: null,
            editdata: []
        }
    }
    componentDidMount() {
        this.getTablelist({
            code: null,
            index: this.state.index,
            mid: null,
            name: null,
            size: this.state.size
        });
    }
    validateTrim = (rule, value, callback) => {
        if (value && value !== "" && value.trim() === "") {
            callback(new Error("请不要只输入空格"));
        } else {
            callback();
        }
    };
    searchHandle = () => {
        this.props.form.validateFields(["codeSearch", "nameSearch"], (err, values) => {
            if (!err) {
                this.getTablelist({
                    code: values.codeSearch,
                    index: this.state.index,
                    mid: null,
                    name: values.nameSearch,
                    size: this.state.size
                });
            }
        });
    }
    searchReset = () => {
        this.props.form.resetFields(["nameSearch", "codeSearch"]);
        this.getTablelist({
            code: null,
            index: this.state.index,
            mid: null,
            name: null,
            size: this.state.size,

        });
    }
    modelReset = () => {
        this.props.form.resetFields(["name", "code", "icon", "memo", "pid", "seq"]);

    }
    async getTablelist(data) {
        const res = await systemMenuTable(data);
        if (res) {
            this.setState({
                tablelist: res.data.list,
                count: res.data.count,
                index: res.data.index
            })
        }
    }
    async menuTypeOne() {
        if (!this.state.menulist) {
            const res = await menuTypeOne();
            if (res) {
                console.log(res.data)
                let data = res.data;
                data.unshift({ name: '无', id: "0" })
                this.setState({
                    menulist: data
                })
            }
        }

    }
    async addMenu(data) {
        const res = await addMenu(data);
        if (res) {
            this.getTablelist({
                code: null,
                index: this.state.index,
                mid: null,
                name: null,
                size: this.state.size,
            });
            this.setState({
                visible: false
            })
            this.modelReset();
        }
    }
    async delMenu(data) {
        const res = await delMenu(data);
        if (res) {
            this.getTablelist({
                code: null,
                index: this.state.index,
                mid: null,
                name: null,
                size: this.state.size
            });
        }
    }
    async toUpdateMenu(data) {
        const res = await toUpdateMenu(data);
        if (res) {
            this.setState({
                editdata: res.data
            })
        }
    }
    async updateMenu(data) {
        const res = await updateMenu(data);
        if (res) {
            this.setState({
                visible: false
            })
            this.getTablelist({
                code: null,
                index: this.state.index,
                mid: null,
                name: null,
                size: this.state.size
            });
        }
    }
    onPageChange = (page, pageSize) => {
        this.getTablelist({
            code: null,
            index: page,
            mid: null,
            name: null,
            size: this.state.size
        });
    }
    addbtn = () => {
        this.setState({
            visible: true,
            isadd: true
        })
        this.menuTypeOne();
    }
    editbtn = (id) => {
        this.editId = id;
        this.toUpdateMenu({ id });
        this.menuTypeOne();
        this.setState({
            visible: true,
            isadd: false
        })

    }
    delbtn = (id) => {
        confirm({
            title: '确定删除该项么?',
            content: '删除后不可撤销',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.delMenu({ id })
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    ModalOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.isadd) {
                    this.addMenu({
                        code: values.code,
                        createdById: this.props.user.id,
                        icon: values.icon,
                        id: "",
                        memo: values.memo,
                        name: values.name,
                        pid: values.pid,
                        seq: values.seq,
                        type: values.pid === "0" ? 1 : 2,
                    })
                } else {
                    this.updateMenu({
                        code: values.code,
                        createdById: this.props.user.id,
                        icon: values.icon,
                        id: this.editId,
                        memo: values.memo,
                        name: values.name,
                        pid: values.pid,
                        seq: values.seq,
                        type: values.pid === "0" ? 1 : 2,
                    })
                }
            }
        });
    }
    ModalCancel = () => {
        this.setState({
            visible: false
        })
        this.modelReset();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { tablelist, count, size, index, visible, isadd, menulist, editdata } = this.state;
        console.log(editdata)
        const columns = [{
            title: '菜单名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        }, {
            title: '菜单类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text, record) => (<span>{text}级菜单</span>)
        }, {
            title: '菜单排序',
            dataIndex: 'seq',
            key: 'seq',
            align: 'center',
        }, {
            title: '导航名称',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
        }, {
            title: '图标名称',
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
        }, {
            title: '创建人',
            dataIndex: 'createdUser',
            key: 'createdUser',
            align: 'center',
        }, {
            title: '创建时间',
            dataIndex: 'createdOn',
            key: 'createdOn',
            align: 'center',
        }, {
            title: '操作',
            dataIndex: "action",
            key: "action",
            align: 'center',
            render: (text, record) => (
                <React.Fragment><span style={{ marginRight: 10, color: '#1890ff' }} onClick={this.editbtn.bind(this, record.id)}>编辑</span><span style={{ color: '#1890ff' }} onClick={this.delbtn.bind(this, record.id)}>删除</span></React.Fragment>
            ),
        }];
        return (<React.Fragment>
            <Form className="fromwarp">
                <Row gutter={24} >
                    <Col span={8} >
                        <Form.Item label="菜单名称" > {
                            getFieldDecorator('nameSearch', {
                                initialValue: null,
                                rules: [{
                                    validator: this.validateTrim,
                                }],
                            })(<Input placeholder="请输入菜单名称" />)}
                        </Form.Item>
                    </Col >
                    <Col span={8} >
                        < Form.Item label="导航名称" > {
                            getFieldDecorator('codeSearch', {
                                initialValue: null,
                                rules: [{
                                    validator: this.validateTrim,
                                }],
                            })(<Input placeholder="请输入导航名称" />)}
                        </Form.Item>
                    </Col >
                    < Col span={8}>
                        <Form.Item >
                            <Button type="primary" onClick={this.searchHandle} > 查询 </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.searchReset} > 重置 </Button>
                        </Form.Item >
                    </Col>
                </Row >
            </Form>
            <Button type="primary" icon="plus" style={{ margin: '10px 0' }} onClick={this.addbtn}> 新增 </Button>
            {
                tablelist && <Table rowKey="id" dataSource={tablelist} columns={columns} pagination={{ total: count, pageSize: size, onChange: this.onPageChange, current: index }} />
            }
            <Modal
                title={isadd ? '新建' : '编辑'}
                visible={visible}
                onCancel={this.ModalCancel}
                footer={[
                    <Button key="back" onClick={this.ModalCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.ModalOk}>确定</Button>,
                ]}
            >
                {

                    <Form onSubmit={this.handleSubmit} className="fromModal" labelCol={{ span: 8 }}>
                        <Row gutter={24} className='formrow'>
                            <Col span={12} >
                                <Form.Item label="菜单名称"> {
                                    getFieldDecorator('name', {
                                        initialValue: isadd ? null : editdata.name,
                                        rules: [{ type: 'string', required: true, message: '请输入菜单名称' }],
                                    })(<Input placeholder="请输入菜单名称" />)}
                                </Form.Item>
                            </Col >
                            <Col span={12} >
                                < Form.Item label="上级菜单"> {
                                    getFieldDecorator('pid', {
                                        initialValue: isadd ? "0" : editdata.pid,
                                    })(<Select placeholder="请选择上级菜单">
                                        {
                                            menulist && menulist.map(item => {
                                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                                            })
                                        }
                                    </Select>)}
                                </Form.Item>
                            </Col >
                        </Row >
                        <Row gutter={24} className='formrow'>
                            <Col span={12} >
                                <Form.Item label="菜单排序"> {
                                    getFieldDecorator('seq', {
                                        initialValue: isadd ? null : editdata.seq,
                                        rules: [{ required: true, message: '请输入菜单排序' }],
                                    })(<Input placeholder="请输入菜单排序" type="number" />)}
                                </Form.Item>
                            </Col >
                            <Col span={12} >
                                < Form.Item label="菜单导航"> {
                                    getFieldDecorator('code', {
                                        initialValue: isadd ? null : editdata.code,
                                        rules: [{ type: 'string', required: true, message: '请输入菜单导航' }],
                                    })(<Input placeholder="请输入菜单导航" />)}
                                </Form.Item>
                            </Col >
                        </Row >
                        <Row gutter={24} className='formrow'>
                            <Col span={12} >
                                <Form.Item label="图标名称"> {
                                    getFieldDecorator('icon', {
                                        initialValue: isadd ? null : editdata.icon,
                                        rules: [{ type: 'string', required: true, message: '请输入图标名称' }],
                                    })(<Input placeholder="请输入图标名称" />)}
                                </Form.Item>
                            </Col >
                        </Row >
                        <Row gutter={24} >
                            <Col span={24} >
                                <Form.Item label="备注" labelCol={{ span: 4 }}> {
                                    getFieldDecorator('memo', {
                                        initialValue: isadd ? null : editdata.meno,
                                        rules: [{
                                            validator: this.validateTrim,
                                        }],
                                    })(<TextArea placeholder="请输入备注信息" autosize={{ minRows: 2, maxRows: 6 }} />)}
                                </Form.Item>
                            </Col >
                        </Row >
                    </Form>
                }
            </Modal>
        </React.Fragment>
        );
    }
}

const From = Form.create({ name: 'horizontal_login' })(Search);

function mapStateToProps(state) {
    const { user } = state
    return {
        user
    }
}

export default connect(mapStateToProps)(From)