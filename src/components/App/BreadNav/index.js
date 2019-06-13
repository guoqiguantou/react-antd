import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class BreadNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navlist: []
        };

    }
    componentDidMount() {
        this.getNavList(this.props)
    }
    componentWillReceiveProps(nextprops) {
        this.getNavList(nextprops)
    }
    getNavList(props) {
        let { pathname } = props.location;
        let navlist = pathname.split('/');
        navlist.splice(0, 2);
        navlist = this.getNavTitle(props, navlist);
        this.setState({
            navlist
        })
    }
    getNavTitle(props, navlist) {
        let arr = [];
        let newarr = [];
        if (navlist.length !== 0) {
            for (let i in navlist) {
                if (i === '0') {
                    newarr = props.lefttree.filter((item) => {
                        return item.name === `${navlist[0]}`
                    })
                    newarr.length ? arr.push(newarr[0].meta.title) : console.log('面包屑导航未匹配');
                } else {
                    newarr = newarr[0].children.filter((item) => {
                        return item.name === `${navlist[i]}`
                    })
                    newarr.length ? arr.push(newarr[0].meta.title) : console.log('面包屑导航未匹配');
                }

            }
        }
        return arr;
    }

    render() {
        let { navlist } = this.state;
        return (
            <Breadcrumb style={{ lineHeight: '64px' }}>
                {/* <Breadcrumb.Item>
                    <Link to='/' >
                        <Icon type="home" className="indexhome" />
                    </Link>
                </Breadcrumb.Item> */}
                {
                    navlist.length === 0 && <Breadcrumb.Item>
                        <Link to='/' >
                            {/* <Icon type="home" style={{ marginRight: 5 }} /> */}
                            <span>首页</span>
                        </Link>
                    </Breadcrumb.Item>
                }

                {
                    navlist && navlist.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={index}>
                                <span>
                                    {this.$language(item)}
                                </span>
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        );
    }
}
const BreadNavs = withRouter(BreadNav);
const mapStateToProps = state => {
    return {
        lefttree: state.user.menuList,
    }
}
const LeftTree = connect(
    mapStateToProps, null
)(BreadNavs)

export default LeftTree;
