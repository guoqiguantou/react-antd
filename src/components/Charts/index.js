
import React, { Component } from "react";
import { Card, } from 'antd';
import styles from './index.module.less';
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require("echarts/lib/component/dataZoom");
/** 
title	卡片标题	
action	卡片操作	
total	数据总量	
footer	卡片底部	
contentHeight	内容区域高度
*/
export class CardChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 800)
    }
    render() {
        const { loading } = this.state;
        const { title, total, footer, action, contentHeight } = this.props;
        return (
            <Card style={{ height: '170px' }} className={styles.cardChart} bodyStyle={{ padding: '10px 20px' }} loading={loading} bordered={false}>
                <div className={styles.cardChartTop}>
                    <p>{title}</p>
                    {action && <span>{action}</span>}

                </div>
                <div className={styles.cardChartSum}>{total}</div>
                <div style={{ width: '100%', height: contentHeight ? contentHeight : '50px', display: 'flex', alignItems: 'center', justify: 'center' }}  >
                    {this.props.children}
                </div>{
                    footer && <div className={styles.cardChartBottom}>
                        {footer}
                    </div>
                }

            </Card>
        );
    }
}

export class MiniArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        var myChart = echarts.init(this.mapCon);
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        opacity: 0
                    }
                }
            },
            grid: {
                left: '0%',
                top: '10%',
                bottom: '0%',
                right: '0%'
            },
            xAxis: {
                data: this.props.data.xdata,
                show: false
            },
            yAxis: {
                show: false
            },
            series: [{
                type: 'line',
                data: this.props.data.ydata,
                areaStyle: {
                    opacity: 1,
                    color: this.props.gradualColor ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.props.color[0]
                    }, {
                        offset: 1,
                        color: this.props.color[1],
                    }]) : this.props.color,
                },
                itemStyle: {
                    color: this.props.borderColor ? this.props.borderColor : this.props.color,
                },
                smooth: true,
                showSymbol: false
            }]
        });
    }
    render() {
        return (
            <div ref={(el) => { this.mapCon = el }} style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export class MiniBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        var myChart = echarts.init(this.mapCon);
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            grid: {
                left: '0%',
                top: '10%',
                bottom: '0%',
                right: '0%'
            },
            xAxis: {
                data: this.props.data.xdata,
                show: false
            },
            yAxis: {
                show: false
            },
            series: [{
                type: 'bar',
                barCategoryGap: '50%',
                data: this.props.data.ydata,
                itemStyle: {
                    color: this.props.gradualColor ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.props.color[0]
                    }, {
                        offset: 1,
                        color: this.props.color[1],
                    }]) : this.props.color
                }
            }]
        });
    }
    render() {
        return (
            <div ref={(el) => { this.mapCon = el }} style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export class MiniProgress extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }
    render() {
        const { target, color, strokeWidth, percent } = this.props;
        return (
            <div className={styles.MiniProgress} style={{ height: strokeWidth }}>
                <div className={styles.MiniProgresscon} style={{ backgroundColor: color, width: percent / target * 100 + '%' }}></div>
                <div className={styles.MiniProgressitem} style={{ backgroundColor: color, left: percent / target * 100 + 2 + '%' }}></div>
            </div>
        );
    }
}

export class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        var myChart = echarts.init(this.mapCon);
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            grid: {
                left: '10px',
                top: '10px',
                bottom: '10px',
                right: '10px',
                containLabel: true,
            },
            xAxis: {
                data: this.props.data.xdata,
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }

                },
                axisLabel: {
                    color: '#333'
                }
            },
            yAxis: {
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#EDEDED',
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                type: 'bar',
                barCategoryGap: '50%',
                data: this.props.data.ydata,
                itemStyle: {
                    color: this.props.gradualColor ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.props.color[0]
                    }, {
                        offset: 1,
                        color: this.props.color[1],
                    }]) : this.props.color
                }
            }]
        });
    }
    render() {
        let { title, padding } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: '100%', height: '100%' }}>
                    <div className={styles.title}>{title}</div>
                    <div ref={(el) => { this.mapCon = el }} style={{ width: '100%', height: 'calc(100% - 40px)', padding }}></div>
                </div>
            </React.Fragment>
        );
    }
}

export class Pie extends Component {
    componentDidMount() {
        var myChart = echarts.init(this.mapCon);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{b}{d}%"
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                borderRadius: 4,
                orient: 'vertical',
                align: 'left',
                left: 'right',
                top: 'center',
                formatter: (name) => {
                    let index, sum = 0;
                    this.props.data.forEach((item, i) => {
                        sum += item.value;
                        if (item.name === name) {
                            index = i;
                        }
                    });
                    let value = this.props.data[index].value / sum;
                    return `${name}  ${Math.floor(value * 100)}%`;
                },

                tooltip: {
                    show: true
                }
            },
            color: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            series: [
                {
                    name: this.props.title,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: this.props.data
                }
            ]
        });
    }
    render() {
        let { title, padding } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: '100%', height: '100%' }}>
                    <div className={styles.title}>{title}</div>
                    <div ref={(el) => { this.mapCon = el }} style={{ width: '100%', height: 'calc(100% - 40px)', padding }}></div>
                </div>
            </React.Fragment>
        );
    }
}

export class TimelineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        var myChart = echarts.init(this.mapCon);
        // 绘制图表
        myChart.setOption({
            color: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '10px',
                top: '10px',
                bottom: '50px',
                right: '10px',
                containLabel: true,
            },
            xAxis: {
                data: this.props.data.xdata,
                axisLine: {
                    lineStyle: {
                        color: '#BFBFBF'
                    }

                },
                axisLabel: {
                    color: '#333'
                }
            },
            yAxis: {
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#EDEDED',
                        type: 'dashed'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 70,
                },
                //缩放
                // {
                //     type: 'inside',
                //     show: true,
                //     realtime: true,
                //     start: 0,
                //     end: 70,
                // }
            ],
            series: [{
                name: this.props.titleMap.y1data,
                type: 'line',
                data: this.props.data.y1data,
                smooth: true,
                showSymbol: false
            },
            {
                name: this.props.titleMap.y2data,
                type: 'line',
                data: this.props.data.y2data,
                smooth: true,
                showSymbol: false
            },]
        });
    }
    render() {
        let { title, padding } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: '100%', height: '100%' }}>
                    <div className={styles.title}>{title}</div>
                    <div ref={(el) => { this.mapCon = el }} style={{ width: '100%', height: 'calc(100% - 40px)', padding }}></div>
                </div>
            </React.Fragment>
        );
    }
}