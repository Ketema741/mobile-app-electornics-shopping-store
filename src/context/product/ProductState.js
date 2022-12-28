import { View, Text } from 'react-native'
import React, { useReducer, useState } from 'react'
import ProductContext from './productContext'
import productReducer from './productReducer'
import { NFTData } from '../../constants'

const initialState = {
    products: NFTData,
    product: null,
    current: "empty",
    filtered: null,

}

const ProductState = (props) => {
    const [state, dispatch] = useReducer(productReducer, initialState);
    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        // Update cart item quantity if already in cart
        if (cart.some((cartItem) => cartItem.id === item.id)) {
            setCart((cart) =>
                cart.map((cartItem) =>
                    cartItem.id === item.id
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

    const removeFromCart = (id) => {
        setCart((cart) =>
            cart.map((cartItem) =>
                cartItem.id === id && cartItem.quantity != 1
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity - 1
                    }
                    : cartItem
            )
        );
    }

    const deleteCartItem = (id) => {
        setCart((cart) => 
            cart.filter((cartItem) => cartItem.id != id )
        );
    }

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                product: state.product,
                current: state.current,
                filtered: state.filtered,
                cart: cart,
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