import axios from 'axios';
import { returnErrors } from './errorActions';

//use getState() to pull in token and set headers

export const loadUser = () => (dispatch, getState) => {
    // User loading

    dispatch({ type: 'USER_LOADING' });

    axios.get('http://localhost:3001/users/user', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: 'USER_LOADED',
                payload: res
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'AUTH_ERROR'
                });
            } else {
                console.log(err);
            }

        })
}


// Register User
export const signUpUser = ({ username, email, password }) => (
    dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ username, email, password });

    axios
        .post('http://18.191.229.171:3001/auth/signup', body, config)
        .then(res =>
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
            );
            dispatch({
                type: 'REGISTER_FAIL'
            });
        });
};


// Login User
export const loginUser = ({ email, password }) => (
    dispatch
) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
        .post('http://18.191.229.171:3001/auth/login', body, config)
        .then(res =>
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'LOGIN_ERROR'
                });
            } else {
                alert(err);
            }
        });
};


// Logout User
export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['authorization'] = token;
    }

    return config;
};