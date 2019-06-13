import React, { Component } from 'react';
import { Row, Col, Tooltip, Icon, Card, Button } from 'antd';
import styles from './index.module.less';
import { CardChart, MiniArea, MiniBar, MiniProgress, Bar, Pie, TimelineChart } from '../../components/Charts';
import { Animation } from '../../components/Animation'
import { systemMenuTable, } from '../../api/menuManager';
import ComTable from '../../components/ComTable';
import QueueAnim from 'rc-queue-anim';
const tabList = [{
    key: 'tab1',
    tab: '销售额',
}, {
    key: 'tab2',
    tab: '趋势额',
}];
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
    title: '创建人',
    dataIndex: 'createdUser',
    key: 'createdUser',
    align: 'center',
}];

export default class Index extends Component {
    state = {
        key: 'tab1',
    }
    gettable = (ref) => {
        this.extend = ref
    }
    componentDidMount() {

    }
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    }
    state = {
        show: true
    };
    onClick = () => {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        return (
            <div>
                <QueueAnim>
                    {/* <Row gutter={20} style={{ marginBottom: 20 }} key="demo1">
                        <Col className={styles.gutterrow} span={24}>
                            <Animation />
                        </Col>
                    </Row> */}
                    <Row gutter={20} style={{ marginBottom: 20 }} key="demo2">
                        <Col className={styles.gutterrow} span={6}>
                            <CardChart
                                title="总销售额"
                                total="345,32"
                                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                contentHeight={45}
                                footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                            >
                                <MiniBar
                                    color="#3AA0FF"
                                    data={
                                        {
                                            xdata: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                                            ydata: [5, 4, 36, 10, 6, 20, 5, 12, 26, 30, 10, 20, 20, 36, 10, 10, 20]
                                        }
                                    }
                                />
                            </CardChart>

                        </Col>
                        <Col className={styles.gutterrow} span={6}>
                            <CardChart
                                title="总销售额"
                                total="345,32"
                                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                            >
                                <MiniArea
                                    color={['#D0E9FF', '#E3F2FF']}
                                    borderColor="#188DFF"
                                    gradualColor={true}
                                    data={
                                        {
                                            xdata: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                                            ydata: [5, 23, 27, 19, 10, 20, 25, 20, 36, 10, 10, 20]
                                        }
                                    }
                                />
                            </CardChart>
                        </Col>
                        <Col className={styles.gutterrow} span={6}>
                            <CardChart
                                title="总销售额"
                                total="345,32"
                                footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            >
                                <MiniArea
                                    color='#975FE4'

                                    data={
                                        {
                                            xdata: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                                            ydata: [5, 23, 27, 19, 10, 20, 25, 20, 36, 10, 10, 20]
                                        }
                                    }
                                />
                            </CardChart>
                        </Col>
                        <Col className={styles.gutterrow} span={6}>
                            <CardChart
                                title="总销售额"
                                total="345,32"
                                footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                            >
                                <MiniProgress
                                    target={100}
                                    color='#13C2C2'
                                    strokeWidth={8}
                                    percent={67}
                                />
                            </CardChart>

                        </Col>
                    </Row>
                    <Row gutter={20} style={{ marginBottom: 20 }} key="demo3">
                        <Col className={styles.gutterrow} span={18}>
                            <Card
                                style={{ width: '100%' }}
                                tabList={tabList}
                                activeTabKey={this.state.key}
                                onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                            >
                                <div style={{ background: '#fff', height: 300 }}>
                                    <Bar
                                        title="销售额趋势"
                                        color="#3AA0FF"
                                        padding='10px'
                                        data={
                                            {
                                                xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                                ydata: [15, 7, 36, 16, 26, 20, 5, 12, 26, 30, 10, 20]
                                            }
                                        }
                                    />
                                </div>
                            </Card>
                        </Col>
                        <Col className={styles.gutterrow} span={6}>
                            <Card
                                title="销售额标题"
                                style={{ width: '100%' }}
                            >
                                <div style={{ background: '#fff', height: 300 }}>
                                    <Pie
                                        title="销售额"
                                        color="#3AA0FF"
                                        padding='10px'
                                        total={100}
                                        data={[{ name: '家用电器', value: 4544 }, { name: '食用酒水', value: 3321 }, { name: '个护健康', value: 3113 }, { name: '服饰箱包', value: 2341 }, { name: '母婴产品', value: 1231 }, { name: '其他', value: 1231 }]}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={20} style={{ marginBottom: 20 }} key="demo4">
                        <Col className={styles.gutterrow} span={12}>
                            <Card
                                title="线上热门搜索"
                                style={{ width: '100%' }}
                            >
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <CardChart
                                            title="总销售额"
                                            total="345,32"
                                            footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                        >
                                            <MiniBar
                                                color="#3AA0FF"
                                                data={
                                                    {
                                                        xdata: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                                                        ydata: [5, 4, 36, 10, 6, 20, 5, 12, 26, 30, 10, 20, 20, 36, 10, 10, 20]
                                                    }
                                                }
                                            />
                                        </CardChart>
                                    </Col>
                                    <Col span={12}>
                                        <CardChart
                                            title="总销售额"
                                            total="345,32"
                                            footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                        >
                                            <MiniProgress
                                                target={100}
                                                color='#13C2C2'
                                                strokeWidth={8}
                                                percent={67}
                                            />
                                        </CardChart>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={24}>
                                        <ComTable
                                            size={4}
                                            columns={columns}
                                            tablelist={systemMenuTable} />
                                    </Col>
                                </Row>

                            </Card>
                        </Col>
                        <Col className={styles.gutterrow} span={12}>
                            <Card
                                title="销售额类别占比"
                                style={{ width: '100%' }}
                            >
                                <Row gutter={20}>
                                    <Col span={12}>
                                        <CardChart
                                            title="总销售额"
                                            total="345,32"
                                            footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                        >
                                            <MiniArea
                                                color={['#D0E9FF', '#E3F2FF']}
                                                borderColor="#188DFF"
                                                gradualColor={true}
                                                data={
                                                    {
                                                        xdata: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', '衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                                                        ydata: [5, 23, 27, 19, 10, 20, 25, 20, 36, 10, 10, 20]
                                                    }
                                                }
                                            />
                                        </CardChart>
                                    </Col>
                                    <Col span={12}>
                                        <CardChart
                                            title="总销售额"
                                            total="345,32"
                                            footer={<div><span>日销售额</span><span style={{ marginLeft: '10px' }}>￥12,423</span></div>}
                                            action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                                        >
                                            <MiniProgress
                                                target={100}
                                                color='#13C2C2'
                                                strokeWidth={8}
                                                percent={67}
                                            />
                                        </CardChart>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={24}>
                                        <ComTable
                                            size={4}
                                            columns={columns}
                                            tablelist={systemMenuTable} />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={20} style={{ marginBottom: 20 }} key="demo5">
                        <Col className={styles.gutterrow} span={24}>
                            <Card
                                title="销售额标题"
                                style={{ width: '100%' }}
                            >
                                <div style={{ background: '#fff', height: 300 }}>
                                    <TimelineChart
                                        title="销售额趋势"
                                        color="#3AA0FF"
                                        padding='10px'
                                        titleMap={{ y1data: '客流量', y2data: '支付笔数' }}
                                        data={
                                            {
                                                xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                                                y1data: [15, 7, 36, 16, 26, 20, 5, 12, 26, 30, 10, 20],
                                                y2data: [5, 27, 16, 26, 12, 20, 35, 22, 16, 10, 20, 10],
                                            }
                                        }
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </QueueAnim>

                {/* <Row gutter={20} style={{ marginBottom: 20 }}>
                    <Col className={styles.gutterrow} span={6}>
                        <div className={styles.gutterbox}>col-6</div>
                    </Col>
                    <Col className={styles.gutterrow} span={6}>
                        <div className={styles.gutterbox}>col-6</div>
                    </Col>
                    <Col className={styles.gutterrow} span={6}>
                        <div className={styles.gutterbox}>col-6</div>
                    </Col>
                    <Col className={styles.gutterrow} span={6}>
                        <div className={styles.gutterbox}>col-6</div>
                    </Col>
                </Row> */}

            </div>

        );
    }
}


