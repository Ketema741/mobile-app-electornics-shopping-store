import React, { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import AuthContext from "../auth/authContext";

import {
    GET_USERS,
    GET_USER,
    ADD_USER,
    ADD_FAVOURITE,
    DELETE_FAVOURITE,
    UPDATE_FAVOURITE,
    DELETE_USER,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_USER,
    FILTER_USERS,
    CLEAR_USERS,
    CLEAR_FILTER,
    USER_ERROR,
} from "../Types";

const UserState = (props) => {
    const initialState = {
        users: null,
        user: null,
        current: null,
        filtered: null,
        favourites: [],
        orderHistory: []
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    // const authContext = useContext(AuthContext);
    // const authenticatedUser = authContext.user;

    // Get users
    const getUsers = async () => {
        try {
            const res = await axios.get("/api/users");
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        } catch (err) {
            let payload = null;
            if (err.response && err.response.msg) {
                payload = err.response.msg;
            }

            dispatch({
                type: USER_ERROR,
                payload
            });

        }
    };

    // Get user
    const getUser = async (_id) => {
        try {
            const res = await axios.get(`api/users/${_id}`);
            dispatch({
                type: GET_USER,
                payload: res.data,
            }); 
        } catch (err) {
            let payload = null;
            if (err.response && err.response.msg) {
                payload = err.response.msg;
            }

            dispatch({
                type: USER_ERROR,
                payload
            });
            
        }
    };

    // add user
    const addUser = async (user, images) => {
        user.userImages = images;
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("api/user", user, config);

            dispatch({ type: ADD_USER, payload: res.data });
        } catch (error) {
            dispatch({ type: USER_ERROR });
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
        } catch (error) {
            dispatch({ type: USER_ERROR });
        }
    };

    // clear users
    const clearUsers = () => {
        dispatch({ type: CLEAR_USERS });
    };

    // Delete User
    const deleteUser = async (_id) => {
        try {
            await axios.delete(`api/user/${_id}`);
            dispatch({
                type: DELETE_USER,
                payload: _id,
            });
        } catch (error) {
            dispatch({ type: USER_ERROR });
        }
    };

    // update User
    const updateUser = async (user) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.put(
                `api/users/${user._id}`,
                user,
                config
            );
            dispatch({
                type: UPDATE_USER,
                payload: res.data,
            });
        } catch (error) {
            dispatch({ type: USER_ERROR });
        }
    };

    // add To favourite
    const addToFavourite = async (user, item) => {
        console.log(user._id);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.put(
                `/api/users/favourite/${user._id}`,
                JSON.stringify(item),
                config
            );
            dispatch({
                type: UPDATE_FAVOURITE,
                payload: item,
            });
        } catch (error) {
            dispatch({ type: USER_ERROR });
        }
    };

    // remove from Favourite
    const removeFavourite = async (userId, itemId) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.put(
                `/api/users/removefavourite/${userId}`,
                config
            );
            dispatch({
                type: DELETE_FAVOURITE,
                payload: userId,
            });
        } catch (error) {
            dispatch({ type: USER_ERROR });
        }
    };

    // load user favourite on first run or refresh
    // useEffect(() => {
    //     if (authenticatedUser && authenticatedUser.favourites) {
    //         dispatch({
    //             type: ADD_FAVOURITE,
    //             payload: authenticatedUser.favourites,
    //         });
    //     }
    // }, [authenticatedUser]);

    // set current
    const setCurrent = (user) => {
        dispatch({ type: SET_CURRENT, payload: user });
    };

    // set current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // filter user
    const filterUsers = (text) => {
        dispatch({ type: FILTER_USERS, payload: text });
    };

    // clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                user: state.user,
                favourites: state.favourites,
                current: state.current,
                filtered: state.filtered,
                orderHistory: state.orderHistory,
                getUsers,
                getUser,
                addUser,
                addToFavourite,
                removeFavourite,
                clearUsers,
                deleteUser,
                removeImage,
                setCurrent,
                clearCurrent,
                updateUser,
                filterUsers,
                clearFilter,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
