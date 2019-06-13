
import React, { Component } from "react";
import { Button, Table, Modal, message } from 'antd';
import styles from './index.module.less';
import QueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
const TableContext = React.createContext(false);
const confirm = Modal.confirm;
class ComTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: null,
            size: props.size ? props.size : 10,
            index: 1,
            tablelist: null,
            visible: false,
            isadd: true,
            editData: [],
            isPageTween: false,
        }
        this.extend = {}
        props.gettable && props.gettable(this);
        //动画函数
        this.enterAnim = [
            {
                opacity: 0, x: 30, backgroundColor: '#fffeee', duration: 0,
            },
            {
                height: 0,
                duration: 200,
                type: 'from',
                delay: 250,
                ease: 'easeOutQuad',
                onComplete: this.onEnd,
            },
            {
                opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad',
            },
            { delay: 1000, backgroundColor: '#fff' },
        ];
        this.pageEnterAnim = [
            {
                opacity: 0, duration: 0,
            },
            {
                height: 0,
                duration: 150,
                type: 'from',
                delay: 150,
                ease: 'easeOutQuad',
                onComplete: this.onEnd,
            },
            {
                opacity: 1, duration: 150, ease: 'easeOutQuad',
            },
        ];
        this.leaveAnim = [
            { duration: 250, opacity: 0 },
            { height: 0, duration: 200, ease: 'easeOutQuad' },
        ];
        this.pageLeaveAnim = [
            { duration: 150, opacity: 0 },
            { height: 0, duration: 150, ease: 'easeOutQuad' },
        ];
        // 动画标签，页面切换时改用 context 传递参数；
        this.animTag = ($props) => {
            return (
                <TableContext.Consumer>
                    {(isPageTween) => {
                        return (
                            <TweenOneGroup
                                component="tbody"
                                enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                                leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                                appear={false}
                                exclusive
                                {...$props}
                            />
                        );
                    }}
                </TableContext.Consumer>
            );
        };
    }
    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }
    pageChange = () => {
        this.setState({
            isPageTween: true,
        });
    };
    gettable = (mid) => {
        this.getTablelist({
            index: this.state.index,
            mid: mid,
            size: this.state.size
        })
    }
    componentDidMount() {
        this.getTablelist({
            index: this.state.index,
            size: this.state.size
        });
    }
    //搜索
    searchHandle = () => {
        this.extend.searchForm.props.form.validateFields((err, values) => {
            if (!err) {
                this.getTablelist({
                    ...values,
                    index: 1,
                    size: this.state.size,
                    ...(this.extend.searchForm.extend && this.extend.searchForm.extend(values))
                });
            }
        });
    }
    //搜索重置
    searchReset = () => {
        this.extend.searchForm.props.form.resetFields();
        this.getTablelist({
            index: 1,
            size: this.state.size
        });
    }
    //获取搜索表单
    getSearchData = (ref) => {
        this.extend.searchForm = ref;
    }
    //获取提交表单
    getSumitData = (ref) => {
        this.extend.submitForm = ref;
    }
    //改变分页
    onPageChange = (page) => {
        this.getTablelist({
            index: page,
            size: this.state.size
        });
    }
    //新增按钮
    addbtn = () => {
        this.setState({
            visible: true,
            isadd: true
        })
    }
    //编辑按钮
    editbtn = (data) => {
        this.editId = data.id;
        this.editApi = data.editApi;
        this.toUpdateMenu({ id: data.id });
        this.setState({
            visible: true,
            isadd: false
        })
    }
    //删除按钮
    delbtn = (data) => {
        if (data.nodel) {
            this.delMenu(data)
        } else {
            confirm({
                title: '确定删除该项么?',
                content: '删除后不可撤销',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    this.delMenu(data)
                },
            });
        }

    }
    //模态框确定
    ModalOk = () => {
        this.extend.submitForm.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.isadd) {
                    this.addMenu({
                        ...values,
                        ...this.props.submit.submitdata,
                        ...(this.extend.submitForm.extend && this.extend.submitForm.extend(values))
                    })
                } else {
                    this.updateMenu({
                        ...values,
                        id: this.editId,
                        ...this.props.submit.submitdata
                    })
                }
                this.extend.submitForm.props.form.resetFields();
            }
        });
    }
    //模态框取消
    ModalCancel = () => {
        this.setState({
            visible: false
        })
        this.extend.submitForm.props.form.resetFields();
    }
    async getTablelist(data) {
        const res = await this.props.tablelist(data);
        if (res) {
            this.setState({
                tablelist: res.data.list,
                count: res.data.count,
                index: res.data.index,
                isPageTween: false,
            })
        }
    }
    async addMenu(data) {
        const res = await this.props.submit.addApi(data);
        if (res) {
            this.getTablelist({
                index: this.state.index,
                size: this.state.size,
            });
            this.setState({
                visible: false,

            })
            this.extend.submitForm.props.form.resetFields();
        }
    }
    async delMenu(data) {
        const { delApi, ...datas } = data;
        const res = await delApi({ ...datas });
        if (res) {
            message.success('成功！', 0.5);
            this.getTablelist({
                index: this.state.index,
                size: this.state.size
            });
        }
    }
    async toUpdateMenu(data) {
        const res = await this.props.submit.toUpDataApi(data);
        if (res) {
            this.setState({
                editData: res.data
            }, () => {
                console.log(this.state.editData)
            })

        }
    }
    async updateMenu(data) {
        const res = await this.editApi(data);
        if (res) {
            this.setState({
                visible: false
            })
            this.getTablelist({
                index: this.state.index,
                size: this.state.size
            });
        }
    }
    render() {
        const { columns, search, submit } = this.props;
        const { count, size, index, tablelist, visible, isadd, editData } = this.state;
        return (
            <React.Fragment>
                {search && <div className={styles.searchwarp}>
                    <search.comp getSearchData={this.getSearchData} />
                    <div className={styles.searchbtn}>
                        <Button type="primary" onClick={this.searchHandle} > 查询 </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.searchReset} > 重置 </Button>
                    </div>
                </div>}
                {submit && <Button type="primary" icon="plus" style={{ margin: '10px 0' }} onClick={this.addbtn}> 新增 </Button>}

                {tablelist &&
                    <TableContext.Provider value={this.state.isPageTween}>
                        <Table
                            className={styles.animationtable}
                            rowKey="id"
                            dataSource={tablelist}
                            columns={columns(this)}
                            components={{ body: { wrapper: this.animTag } }}
                            onChange={this.pageChange}
                            pagination={{ total: count, pageSize: size, onChange: this.onPageChange, current: index }}
                        />
                    </TableContext.Provider>
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
                    {submit && submit.comp && <submit.comp isadd={isadd} extendData={submit.extendData} editData={editData} getSumitData={this.getSumitData} />}
                </Modal>
            </React.Fragment>
        );
    }
}


export default ComTable