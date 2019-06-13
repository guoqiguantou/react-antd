import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Main from '../components/App/Main';
import Index from '../page/Index';
import FromPage from '../page/FromPage';
import Login from '../page/Login';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from '../lang/zh-CN.js';
import enUS from '../lang/en-US.js';
import enHK from '../lang/zh-HK.js';
import PrivateRoute from '../components/PrivateRoute';
import MenuManager from '../page/MenuManager';
import UserManager from '../page/UserManager';
import RoleManager from '../page/RoleManager'
Component.prototype.$language = (key) => <FormattedMessage id={key} />

addLocaleData([...en, ...zh]);
let language = {
    en: enUS,
    zh: zhCN,
    hk: enHK
}


const Home = ({ match }) => (
    <div>
        <h2>{match.url}</h2>
    </div>
)

const NoMatch = ({ match }) => (
    <div>
        <h2>组件没有找到</h2>
    </div>
)
const NoFount = ({ match }) => (
    <div>
        <h2>404</h2>
    </div>
)
const App = ({ match }) => (
    < Main match={match}>
        <Switch>
            <PrivateRoute exact path={`${match.url}`} component={Index} />
            <Route exact path={`${match.url}/about`} component={FromPage} />
            <PrivateRoute path="/user" component={FromPage} />
            <PrivateRoute exact path={`${match.url}/systemData/menuManager`} component={MenuManager} />
            <PrivateRoute exact path={`${match.url}/systemData/userManager`} component={UserManager} />
            <PrivateRoute exact path={`${match.url}/systemData/roleManager`} component={RoleManager} />

            <PrivateRoute exact path={`${match.url}/video/videoManager`} component={Home} />
            <PrivateRoute exact path={`${match.url}/video/cameraManager`} component={Home} />

            <PrivateRoute exact path={`${match.url}/outline/outline`} component={Home} />
            <PrivateRoute exact path={`${match.url}/dictionary/dictionaryData`} component={Home} />
            <PrivateRoute component={NoMatch} />
        </Switch>
    </Main>
);



const View = (props) => {
    return (
        <IntlProvider locale="zh" messages={language[`${props.app.language}`]}>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Redirect exact from="/" to="/home" />
                    <Route path="/home" component={App} />
                    <Route component={NoFount} />
                </Switch>
            </Router>
        </IntlProvider >
    )
}
const mapStateToProps = state => {
    return {
        app: state.app
    }
}
const Root = connect(
    mapStateToProps, null
)(View)
export default Root