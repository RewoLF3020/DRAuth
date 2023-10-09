import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    LOGOUT
} from "./types";
import { ILogin, IResetPasswordConfirm } from "../utils/interfaces";

export const checkAuthenticated = () => async (dispatch: any) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') })
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (response.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (error: any) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const loadUser = () => async (dispatch: any) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            });
        } catch (error: any) {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
}


export const login = ({email, password}: ILogin) => async (dispatch: any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });

        dispatch(loadUser());
    } catch (error: any) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
}

export const resetPassword = (email: string) => async (dispatch: any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (error: any) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
}

export const reset_password_confirm = ({uid, token, new_password, re_new_password}: IResetPasswordConfirm) => async (dispatch: any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (error: any) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
}

export const logout = () => (dispatch: any) => {
    dispatch({
        type: LOGOUT,
    });
}