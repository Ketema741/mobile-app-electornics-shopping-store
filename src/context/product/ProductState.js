import { View, Text, Alert } from 'react-native'
import React, { useReducer, useState } from 'react'
import ProductContext from './productContext'
import productReducer from './productReducer'
import { NFTData } from '../../constants'
import axios from 'axios';
import {
    GET_ITEMS,
    GET_ITEM,
    ADD_ITEM,
    DELETE_ITEM,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ITEM,
    FILTER_ITEMS,
    CLEAR_ITEMS,
    CLEAR_FILTER,
    ITEM_ERROR,
} from "../Types";

const initialState = {
    items: null,
    item: null,
    current: null,
    filtered: null,
}

const ProductState = (props) => {
    const localhost = '10.4.112.184'
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [cart, setCart] = useState([])

    // add item
    const uploadItem = async (data) => {
        const headers = { 'Content-Type': 'application/json' };
        try {
            const res = await axios.post(`http://${localhost}:4420/api/products`, data, { headers });
            Alert.alert("Item Uploaded Successfully!!")
            dispatch({ type: ADD_ITEM, payload: res.data });

        } catch (error) {
            Alert.alert("Item Not Uploaded Successfully!!")
            let payload = null;
            if (err.response && err.response.data) {
                payload = err.response.data;
            }
            dispatch({
                type: ITEM_ERROR,
                payload
            });
            console.log(error.message)
        }
    }

    // Get Items
    const getItems = async () => {
        try {
            const res = await axios.get(`http://${localhost}:4420/api/products`);
            console.log(res.data)
            dispatch({
                type: GET_ITEMS,
                payload: res.data,
            });
        } catch (err) {
            let payload = null;
            if (err.response && err.response.data) {
                payload = err.response.data;
            }
            dispatch({
                type: ITEM_ERROR,
                payload
            });
        }
    };



    // Get Item
    const getItem = async (_id) => {
        try {
            const res = await axios.get(`http://${localhost}:4420/api/products/${_id}`);
            console.log(res.data)
            dispatch({
                type: GET_ITEM,
                payload: res.data,
            });
        } catch (err) {
            let payload = null;
            if (err.response && err.response.data) {
                payload = err.response.data;
            }
            dispatch({
                type: ITEM_ERROR,
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
            const res = await axios.post(`api/items/image`, id_obj, config);
            console.log(res);
        } catch (error) {
            let payload = null;
            if (error.response && error.response.data) {
                payload = error.response.data;
            }
            dispatch({
                type: ITEM_ERROR,
                payload
            });
        }
    };

    // clear Items
    const clearItems = () => {
        dispatch({ type: CLEAR_ITEMS });
    };

    // Delete Item
    const deleteItem = async (_id) => {
        try {
            await axios.delete(`http://${localhost}:4420/api/products/${_id}`);
            dispatch({
                type: DELETE_ITEM,
                payload: _id,
            });
            Alert.alert('item removed successfully')
        } catch (error) {
            Alert.alert('not item removed successfully')

            let payload = null;
            if (error.response && error.response.data) {
                payload = error.response.data;
            }
            dispatch({
                type: ITEM_ERROR,
                payload
            });
        }
    };

    // update Item
    const updateItem = async (item) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.put(`http://${localhost}:4420/api/products/${item._id}`, item, config);
            dispatch({
                type: UPDATE_ITEM,
                payload: res.data,
            });

            Alert.alert('Item Updated successfully')

        } catch (error) {
            Alert.alert('Item Not Updated successfully')

            let payload = null;
            if (error.response && error.response.data) {
                payload = error.response.data;
            }
            dispatch({
                type: ITEM_ERROR,
                payload
            });
        }
    };

    // set current
    const setCurrent = (item) => {
        dispatch({ type: SET_CURRENT, payload: item });
    };

    // set current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // filter Items
    const filterItems = (text) => {
        dispatch({ type: FILTER_ITEMS, payload: text });
    };

    // clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // add to cart
    const addToCart = (item) => {
        // Update cart item quantity if already in cart
        if (cart.some((cartItem) => cartItem._id === item._id)) {
            setCart((cart) =>
                cart.map((cartItem) =>
                    cartItem._id === item._id
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity + 1
                        }
                        : cartItem
                )
            );
            return;
        }



        // Add to cart
        setCart((cart) => [
            ...cart,
            { ...item, quantity: 1 } // <-- initial quantity 1
        ]);
        console.log(cart)

    }



    const removeFromCart = (_id) => {
        setCart((cart) =>
            cart.map((cartItem) =>
                cartItem._id === _id && cartItem.quantity != 1
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity - 1
                    }
                    : cartItem
            )
        );
    }

    const deleteCartItem = (_id) => {
        setCart((cart) =>
            cart.filter((cartItem) => cartItem._id != _id)
        );
    }

    return (
        <ProductContext.Provider
            value={{
                items: state.items,
                item: state.item,
                current: state.current,
                filtered: state.filtered,
                cart: cart,

                uploadItem: uploadItem,
                getItems: getItems,
                getItem: getItem,
                updateItem: updateItem,
                deleteItem: deleteItem,
                clearItems: clearItems,
                clearFilter: clearFilter,
                filterItems: filterItems,
                clearCurrent: clearCurrent,
                setCurrent: setCurrent,

                addToCart: addToCart,
                removeFromCart: removeFromCart,
                deleteCartItem: deleteCartItem,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState