import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { getUserData, getUserRoleData, getAddUserData, beginUpdateUserData, getUpdateUserData, changeUserStatus, resetPass } from '../../api/userManager'
import searchFrom from './comp/searchFrom';
import submitFrom from './comp/submitFrom';
import ComTable from '../../components/ComTable';
import QueueAnim from 'rc-queue-anim';
const columns = (vm) => [{
    title: '用户状态',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
    render: (text, record, index) => (
        record.status === 1 ? <React.Fragment>
            <span style={{ marginRight: 10 }}>已禁用</span>
            <span style={{ color: '#1890ff' }} onClick={() => vm.delbtn({ id: record.id, status: record.status === 0 ? 1 : 0, delApi: changeUserStatus, nodel: true })} > 启用</span>
        </React.Fragment> : <React.Fragment>
                <span style={{ marginRight: 10 }}>正常</span>
                <span style={{ color: '#FF0000' }} onClick={() => vm.delbtn({ id: record.id, status: record.status === 0 ? 1 : 0, delApi: changeUserStatus, nodel: true })}>禁用</span>
            </React.Fragment>
    ),
}, {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    render: (text, record, index) => (
        <span>{index + 1}</span>
    ),
}, {
    title: '账号',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
}, {
    title: '用户名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
}, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    align: 'center',
}, {
    title: '角色',
    dataIndex: 'roleList',
    key: 'roleList',
    align: 'center',
    render: (text, record) => (
        <React.Fragment>
            {record.roleList.map(item => <span style={{ marginRight: 5 }} key={item.id}>{item.name}</span>)}
        </React.Fragment>
    ),
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
    title: '更新人',
    dataIndex: 'modifiedUser',
    key: 'modifiedUser',
    align: 'center',
}, {
    title: '更新时间',
    dataIndex: 'modifiedOn',
    key: 'modifiedOn',
    align: 'center',
}, {
    title: '操作',
    dataIndex: "action",
    key: "action",
    align: 'center',
    render: (text, record) => (
        <React.Fragment>
            <span style={{ marginRight: 10, color: '#1890ff' }} onClick={() => vm.editbtn({ id: record.id, editApi: getUpdateUserData })}>修改</span>
            <span style={{ color: '#1890ff' }} onClick={() => vm.delbtn({ id: record.id, delApi: resetPass, nodel: true })}>重置密码</span>
        </React.Fragment>
    ),
}];
class UserManagerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treelist: []
        }
    }
    componentDidMount() {
        this.getUserRoleData();
    }
    async getUserRoleData() {
        const res = await getUserRoleData();
        if (res) {
            this.setState({
                roleData: res.data
            })
        }
    }
    gettable = (ref) => {
        this.extend = ref
    }
    render() {
        let { roleData } = this.state;
        return (
            <div className="warp">
                <QueueAnim animConfig={[
                    { opacity: [1, 0], translateY: [0, 50] },
                    { opacity: [1, 0], translateY: [0, -50] }
                ]}>
                    <Card
                        key="0"
                        hoverable
                    >
                        <ComTable
                            gettable={this.gettable}
                            columns={columns}
                            tablelist={getUserData}
                            search={{ comp: searchFrom }}
                            submit={
                                {
                                    submitdata: { createdById: this.props.user.userId, },
                                    comp: submitFrom,
                                    extendData: roleData,
                                    addApi: getAddUserData,
                                    toUpDataApi: beginUpdateUserData,
                                }
                            } />
                    </Card>
                </QueueAnim>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}



const UserManager = connect(
    mapStateToProps, null
)(UserManagerView)


export default UserManager

