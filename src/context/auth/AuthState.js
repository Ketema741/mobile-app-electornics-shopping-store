import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { getStoredToken, setAuthToken } from "../../utils/authToken";
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  SET_CURRENT,
  LOGIN_FAIL,
  LOGOUT,
} from "../Types";

const AuthState = (props) => {
  const localhost = "10.4.104.149"
  const initialState = {
    user: null,
    currentUser: null,
    token: getStoredToken(),
    isUserAuthenticated: null,
    userLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const userRegister = async (formData) => {
    const { name, address, email, password } = formData
    const userData = {
      name,
      address,
      email,
      password,
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`http://${localhost}:4420/api/users`, userData, config);
      Alert.alert("Registered Successfully!!")
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      Alert.alert("Not Registered Successfully!!")
      let payload = null;
      if (err.response && err.response.data) {
        payload = err.response.data;
      }
      dispatch({
        type: REGISTER_FAIL,
        payload
      });

    }
  };

  const removeImage = async (public_id) => {
    const id_obj = {
      public_id: public_id,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`api/users/image`, id_obj, config);
      console.log(res);
    } catch (err) {

      let payload = null;
      if (err.response && err.response.data) {
        payload = err.response.data;
      }

      dispatch({
        type: LOGIN_FAIL,
        payload
      });

      console.log("error ", err.response);
    }
  };

  // login user
  const userLogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`http://${localhost}:4420/api/auth-user`, formData, config);
      Alert.alert("Loged In Successfully!!")

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser()
    } catch (err) {
      Alert.alert("Not Loged In Successfully!!")
      let payload = null;
      if (err.response && err.response.data) {
        payload = err.response.data;
      }

      dispatch({
        type: LOGIN_FAIL,
        payload
      });

      console.log("error ", err.message);
    }
  };

  // logout
  const logout = () => dispatch({ type: LOGOUT });

  // load user
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await axios.get(`http://${localhost}:4420/api/auth-user`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
      console.log(error);
    }
  };

  // set current
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  // set token on initial app loading
  setAuthToken(state.token);

  // load user on first run or refresh
  if (state.userLoading) {
    loadUser();
  }

  // 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  // AuthState Provider Component
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        currentUser: state.currentUser,
        error: state.error,
        isUserAuthenticated: state.isUserAuthenticated,
        userRegister: userRegister,
        setCurrent,
        userLogin,
        logout,
        loadUser,
        removeImage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
