import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Rate, Switch, Icon,Tooltip  } from 'antd';
import styles from './index.module.less';
import { changeStyle, changeColor, fixedHeader, fixedLeft } from '../../../store/actions/app'
class View extends Component {
    constructor(props) {
        super(props);
        this.themeColor = [{ color: '#f5222d', name: 'red',text:'薄暮' }, { color: '#fa541c', name: 'orange',text:'火山'  }, { color: '#faad14', name: 'yellow',text:'日暮'  }, { color: '#19be6b', name: 'green' ,text:'鲜绿' }, { color: '#1890ff', name: 'blue',text:'拂晓蓝(默认)'}, { color: '#2F54EB', name: 'dblue',text:'极客蓝' }, { color: '#722ed1', name: 'purple',text:'酱紫' }];
        this.themeStyle = ['dark', 'light']
    }
    clickColor = (item) => {
        this.props.onchangeColor(item.color);
        window.less.modifyVars({ '@primary-color': item.color, '@btn-primary-bg': item.color })
    }
    clickStyle = (item) => {
        this.props.onchangeStyle(item)
    }
    fixedheader = (checked) => {
        this.props.onfixedHeader(checked)
    }
    fixedleft = (checked) => {
        this.props.onfixedLeft(checked)
    }
    hideheader=(checked)=>{
        console.log(checked)
    }
    render() {
        let { app } = this.props;
        return (
            <div className={styles.themewarp}>
                <p>整体风格设置</p>
                <ul className={styles.themestyle}>
                    {
                        this.themeStyle.map((item, index) => {
                            return (
                                <Tooltip title={item==='dark'?'暗色菜单风格':'亮色菜单风格'}>
                                 <li onClick={() => this.clickStyle(item)} key={index} style={{ 'background': 'dark' === item ? '#333' : '#ccc' }}>
                                    {app.themeStyle === item &&
                                        <span><Icon type="check" /></span>
                                    }
                                </li>
                                </Tooltip>
                            )
                        })
                    }
                </ul>
                <p>主题色</p>
                <ul className={styles.themecolor}>
                    {
                        this.themeColor.map((item, index) => {
                            return (
                                <Tooltip title={item.text}>
                                <li style={{ 'background': item.color }} key={index} onClick={() => this.clickColor(item)}>
                                    {app.themeColor === item.color &&
                                        <Icon type="check" />
                                    }
                                </li>
                                </Tooltip>
                            )
                        })
                    }
                </ul>
                <Divider />
                <div className={styles.themeitem}>
                    <span>固定头部导航</span>
                    <Switch size="small" checked={app.fixedHeader} onChange={this.fixedheader} />
                </div>
                <div className={styles.themeitem}>
                    <span>下滑时隐藏 Header</span>
                    <Switch size="small" checked={app.hideHeader} onChange={this.hideheader} />
                </div>
                <div className={styles.themeitem}>
                    <span>固定侧边栏</span>
                    <Switch size="small" checked={app.fixedLeft} onChange={this.fixedleft} />
                </div>
                <Divider />
                <p>对我们的星级评价</p>
                <Rate defaultValue={3} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        app: state.app
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onchangeStyle: style => {
            dispatch(changeStyle(style))
        },
        onchangeColor: color => {
            dispatch(changeColor(color))
        },
        onfixedHeader: bool => {
            dispatch(fixedHeader(bool))
        },
        onfixedLeft: bool => {
            dispatch(fixedLeft(bool))
        }
    }
}

const Theme = connect(
    mapStateToProps, mapDispatchToProps
)(View)

export default Theme;
//export default Theme;