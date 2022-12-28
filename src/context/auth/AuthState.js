import React, { useReducer } from 'react'
import authReducer from './authReducer'
import authContext from './authContext';

const initialState = {
    user: null,
    token: localStorage.token,
    isUserAuthenticated: null,
    userLoading: true,
    error: null,
  };

const AuthState = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <authContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isUserAuthenticated: state.isUserAuthenticated,
                userLoading: state.userLoading,
                error: state.error,
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState