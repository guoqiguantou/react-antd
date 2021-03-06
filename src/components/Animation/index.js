import React, { Component } from "react";
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import { TweenOneGroup } from 'rc-tween-one';
import './index.css'
const TableContext = React.createContext(false);


export class Animation extends Component {


    constructor(props) {
        super(props);
        this.columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Address', dataIndex: 'address', key: 'address' },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span
                        className={`${this.props.className}-delete`}
                        onClick={(e) => { this.onDelete(record.key, e); }}
                    >
                        Delete
          </span>
                ),
            },
        ];
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
        this.data = [
            {
                key: 1,
                name: 'John Brown',
                age: 32,
                address: 'New York No.1 Lake Park',
            },
            {
                key: 2,
                name: 'Jim Green',
                age: 42,
                address: 'London No.1 Lake Park',
            },
            {
                key: 3,
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No.1 Lake Park',
            },
            {
                key: 4,
                name: 'Jim Red',
                age: 18,
                address: 'London No.1 Lake Park',
            },
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

        this.state = {
            data: this.data,
            isPageTween: false,
        };
    }

    onEnd = (e) => {
        const dom = e.target;
        dom.style.height = 'auto';
    }

    onAdd = () => {
        const { data } = this.state;
        const i = Math.round(Math.random() * (this.data.length - 1));
        data.unshift({
            key: Date.now(),
            name: this.data[i].name,
            age: this.data[i].age,
            address: this.data[i].address,
        });
        this.setState({
            data,
            isPageTween: false,
        });
    };

    onDelete = (key, e) => {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data, isPageTween: false });
    }

    pageChange = () => {
        this.setState({
            isPageTween: true,
        });
    };

    render() {
        return (
            <div>
                <div className={`table-enter-leave-demo-table-wrapper`}>
                    <div className={`table-enter-leave-demo-action-bar`}>
                        <Button type="primary" onClick={this.onAdd}>Add</Button>
                    </div>
                    <TableContext.Provider value={this.state.isPageTween}>
                        <Table
                            columns={this.columns}
                            pagination={{ pageSize: 4 }}
                            dataSource={this.state.data}
                            className={`table-enter-leave-demo-table`}
                            components={{ body: { wrapper: this.animTag } }}
                            onChange={this.pageChange}
                        />
                    </TableContext.Provider>
                </div>
                {/* <div className={`table-enter-leave-demo-wrapper`}>
                    <div className='table-enter-leave-demo'>
                        <div className={`table-enter-leave-demo-header`}>
                            <ul>
                                <li />
                                <li />
                                <li />
                                <li />
                                <li />
                            </ul>
                        </div>
                        <div className={`table-enter-leave-demo-nav`}>
                            <span>
                                <img
                                    height="24"
                                    alt="img"
                                    src="https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg"
                                />
                                <img
                                    height="14"
                                    alt="img"
                                    src="https://zos.alipayobjects.com/rmsportal/bNfCyCcgnyTgRmz.svg"
                                />
                            </span>
                        </div>
                        <div className={`table-enter-leave-demo-list`}>
                            <QueueAnim type="bottom" component="ul">
                                <li key="0" />
                                <li key="1" />
                                <li key="2" />
                                <li key="3" />
                                <li key="4" />
                            </QueueAnim>
                        </div>
                        
                    </div>
                </div>
             */}
            </div>
        );
    }
}

