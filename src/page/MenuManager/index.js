import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tree, Icon, Card } from 'antd';
import { addTablist } from '../../store/actions/app';
import { logout } from '../../store/actions/user'
import { systemMenu, systemMenuTable, addMenu, delMenu, toUpdateMenu, updateMenu } from '../../api/menuManager';
import searchFrom from './comp/searchFrom';
import submitFrom from './comp/submitFrom';
import ComTable from '../../components/ComTable';
import QueueAnim from 'rc-queue-anim';
const { TreeNode } = Tree;

const columns = (vm) => [{
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    key: 'index',
    render: (text, record, index) => (
        <span>{index + 1}</span>
    ),
}, {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
}, {
    title: '菜单类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (text, record, index) => (
        record.type === 1 ? "一级菜单" : "二级菜单"
    )
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
        <React.Fragment>
            <span style={{ marginRight: 10, color: '#1890ff' }} onClick={() => vm.editbtn({ id: record.id, editApi: updateMenu })}>编辑</span>
            <span style={{ color: '#1890ff' }} onClick={() => vm.delbtn({ id: record.id, delApi: delMenu })}>删除</span>
        </React.Fragment>
    ),
}];
class MenuManagerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treelist: []
        }
    }
    componentDidMount() {
        this.getTreelist()
    }

    async getTreelist() {
        const res = await systemMenu();
        if (res) {
            this.setState({
                treelist: res.data
            })
        }
    }
    gettable = (ref) => {
        this.extend = ref
    }
    tablelist = (id) => {
        this.extend.gettable(id[0])
    }
    render() {
        let { treelist } = this.state;
        let extendData = JSON.parse(JSON.stringify(treelist))
        extendData.push({ id: "0", title: "无" })
        return (
            <div>
                <Row gutter={16}>
                    <QueueAnim animConfig={[
                        { opacity: [1, 0], translateY: [0, 50] },
                        { opacity: [1, 0], translateY: [0, -50] }
                    ]}>
                        <Col span={4} key='1'>
                            <Card
                                hoverable
                                title="主菜单"
                            >
                                <Tree
                                    defaultExpandAll
                                    switcherIcon={<Icon type="down" />}
                                    onSelect={this.tablelist}
                                >
                                    {
                                        treelist && treelist.map(item => {
                                            return (
                                                <TreeNode title={item.title} key={item.id}>
                                                    {
                                                        item.children && item.children.length && item.children.map(li => {
                                                            return (
                                                                <TreeNode title={li.title} key={li.id} />
                                                            )
                                                        })
                                                    }
                                                </TreeNode>
                                            )
                                        })
                                    }
                                </Tree>
                            </Card>
                        </Col>
                        <Col span={20} key='2'>
                            <Card
                                hoverable
                            >
                                <ComTable
                                    gettable={this.gettable}
                                    columns={columns}
                                    tablelist={systemMenuTable}
                                    search={{ comp: searchFrom }}
                                    submit={
                                        {
                                            submitdata: { createdById: this.props.user.userId, },
                                            comp: submitFrom,
                                            extendData: extendData,
                                            addApi: addMenu,
                                            toUpDataApi: toUpdateMenu,
                                        }
                                    } />
                            </Card>
                        </Col>
                    </QueueAnim>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tablist: state.app.tablist,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onaddTablist: list => {
            dispatch(addTablist(list))
        },
        onlogout: () => {
            dispatch(logout())
        }
    }
}

const MenuManager = connect(
    mapStateToProps, mapDispatchToProps
)(MenuManagerView)


export default MenuManager

