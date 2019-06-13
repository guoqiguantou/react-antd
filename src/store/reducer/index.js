import {
    combineReducers
} from 'redux'
// import leftTree from './leftTree'
import {
    app
} from './app'
import {
    user
} from './user'

const reducers = combineReducers({
    // lefttree: leftTree,
    app,
    user
})
export default reducers;