import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../Actions/actionType";

const initialState = {
    user: null,
    registerError: null,
    registerLoading: false,
    loginError: null,
    loginLoading: false
};

const reducerUsers = (state = initialState, action) =>{
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.user, registerError: null, registerLoading: false};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error, registerLoading: false};
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null, loginLoading: false};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error, loginLoading: false};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null};
        default:
            return state
    }
};

export default reducerUsers;