import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Modal, Tree } from 'antd';
import { getRoleData, addRoleData, beginUpdateRoleData, updateRoleData, delRoleData, getAuthData, saveAuthData } from '../../api/roleManager';
import searchFrom from './comp/searchFrom';
import submitFrom from './comp/submitFrom';
import ComTable from '../../components/ComTable';
const { TreeNode } = Tree;
class RoleManagerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            getAuthData: null,
            selectdata: []
        }
    }
    async getAuthData(id) {
        let data = {
            roleId: id,
            parentId: 0
        }
        this.roleId = id;
        const res = await getAuthData(data);
        if (res) {
            this.setState({
                getAuthData: res.data,
                selectdata: this.getselect(res.data)
            })
        }
    }
    async saveAuthData() {
        let data = {
            roleId: this.roleId,
            menuIds: this.state.selectdata.join(',')
        }
        const res = await saveAuthData(data);
        if (res) {
            console.log(res)
        }
    }
    gettable = (ref) => {
        this.extend = ref
    }
    handleOk = () => {
        this.saveAuthData()
        this.setState({
            visible: false,
            selectdata: []
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            selectdata: []
        });
    }
    setting = (id) => {
        this.getAuthData(id)
        this.setState({
            visible: true,
        });
    }
    getselect = (data) => {
        this.datalist = [];
        data.forEach(item => {
            if (item.checked) {
                this.datalist.push(item.id);
            }
            if (item.children) {
                item.children.forEach(items => {
                    if (items.checked) {
                        this.datalist.push(items.id);
                    }

                })
            }
        })
        return this.datalist
    }
    onCheck = (checkedKeys) => {
        this.setState({
            selectdata: checkedKeys
        })
    }

    render() {
        let { roleData, visible, getAuthData, selectdata } = this.state;
        const columns = (vm) => [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                align: 'center',
                render: (text, record, index) => (<span>{index + 1}</span>),
            }, {
                title: '角色编码',
                dataIndex: 'code',
                key: 'code',
                align: 'center',
            }, {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            }, {
                title: '菜单权限',
                dataIndex: 'mobile',
                key: 'mobile',
                align: 'center',
                render: (text, record) => (<Button type="primary" size="small" onClick={this.setting.bind(this, record.id)}>设置</Button>),
            }, {
                title: '创建时间',
                dataIndex: 'createdOn',
                key: 'createdOn',
                align: 'center',
            }, {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
                align: 'center',
            }, {
                title: '操作',
                dataIndex: "action",
                key: "action",
                align: 'center',
                render: (text, record) => (
                    <React.Fragment>
                        <span style={{ marginRight: 10, color: '#1890ff' }} onClick={() => vm.editbtn({ id: record.id, editApi: updateRoleData })}>修改</span>
                        <span style={{ color: '#1890ff' }} onClick={() => vm.delbtn({ id: record.id, delApi: delRoleData })}>删除</span>
                    </React.Fragment>
                ),
            }];
        return (
            <div className="warp">
                <Card
                    hoverable
                >
                    <ComTable
                        gettable={this.gettable}
                        columns={columns}
                        tablelist={getRoleData}
                        search={{ comp: searchFrom }}
                        submit={
                            {
                                submitdata: { createdById: this.props.user.userId },
                                comp: submitFrom,
                                extendData: roleData,
                                addApi: addRoleData,
                                toUpDataApi: beginUpdateRoleData,
                            }
                        } />
                </Card>
                <Modal
                    title="权限"
                    okText="确定"
                    cancelText="取消"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tree
                        checkable
                        checkedKeys={selectdata}
                        onCheck={this.onCheck}
                    >
                        {
                            getAuthData && getAuthData.map(item => {
                                return (
                                    <TreeNode title={item.title} key={item.id}>
                                        {
                                            item.children && item.children.length && item.children.map(li => <TreeNode title={li.title} key={li.id} />)
                                        }
                                    </TreeNode>
                                )
                            })
                        }
                    </Tree>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const RoleManager = connect(
    mapStateToProps, null
)(RoleManagerView)
export default RoleManager

