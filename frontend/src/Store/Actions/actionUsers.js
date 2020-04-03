import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "./actionType";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserError = error => ({type: REGISTER_USER_ERROR, error});

export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserError = error => ({type: LOGIN_USER_ERROR, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const registerUser = (user)=> {
    return async (dispatch) => {
        try{
            dispatch(registerUserRequest());
            const res = await axiosApi.post('/users', user);
            dispatch(registerUserSuccess(res.data));
            dispatch(push('/chat'))
        }catch (e) {
            dispatch(registerUserRequest());
            if (e.response && e.response.data){
                dispatch(registerUserError(e.response.data))
            }else{
                dispatch(registerUserError(e))
            }
        }
    }
};

export const loginUser = (user) => {
    return async (dispatch) => {
        try{
            dispatch(loginUserRequest());
            const res = await axiosApi.post('/users/sessions', user);
            dispatch(loginUserSuccess(res.data));
            dispatch(push('/chat'))
        }catch (e) {
            dispatch(loginUserRequest());
            if (e.response && e.response.data){
                dispatch(loginUserError(e.response.data))
            }else{
                dispatch(loginUserError(e))
            }
        }
    }
};




export const logoutUser = () => {
  return async (dispatch, getState) => {
      const token = getState().users.user.token;
      const config = {headers: {'Authorization' : 'Token ' + token}};
      try{
            await axiosApi.delete('/users/sessions', config);
            dispatch(logoutUserSuccess());
          dispatch(push('/login'))
      }catch (e) {
            console.error(e)
      }
  }
};