import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';

import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import reducerUsers from "./Reducer/reducerUsers";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router : connectRouter(history),
    users: reducerUsers,
});

const middleware = [
    thunk,
    routerMiddleware(history)
];

const store = createStore(rootReducer,  applyMiddleware(...middleware));

export default store;