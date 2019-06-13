import {
    createStore
} from 'redux'
import reducers from './reducer'
let store = createStore(reducers);

// if (
//     process.env.NODE_ENV !== "production" &&
//     window.__REDUX_DEVTOOLS_EXTENSION__
// ) {
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//     console.log(composeEnhancers)
//     store = createStore(
//         reducers,
//         composeEnhancers()
//     );
// } else {
//     store = createStore(reducers);
// }
// console.log(composeEnhancers)
// store = createStore(reducers, composeEnhancers());
export default store;