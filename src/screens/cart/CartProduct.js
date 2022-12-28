import React, { useContext, useEffect } from 'react';
import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../../constants";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import productContext from '../../context/product/productContext';


export default CartProduct = ({ product }) => {

    const navigation = useNavigation();

    const ProductContext = useContext(productContext)
    const { addToCart, removeFromCart, deleteCartItem } = ProductContext

    const handlePlus = () => {
        addToCart(product)
    }
    const handleMinus = () => {
        removeFromCart(product.id)
    }

    const hanldeDelete = () => {
        deleteCartItem(product.id)
    }
    return (
        <TouchableOpacity
            key={product.id}
            onPress={() => navigation.navigate('Details', { data: product })}
            style={styles.container}
        >

            <View style={styles.productImageContainer}>
                <Image source={product.image} style={styles.productImage} />
            </View>

            <View style={styles.ProductDetialContainer}>
                <View >
                    <Text style={styles.productName} > {product.name} </Text>
                    <View style={styles.priceContainer} >
                        <Text style={styles.price}> ETB {product.price}  </Text>
                        <Text> ETB 909 </Text>
                    </View>
                </View>

                <View style={styles.plusMinusDeleteContainer}>
                    <View style={styles.plusMinusContainer}>
                        <TouchableOpacity onPress={handleMinus}>
                            <View style={styles.minusContainer}>
                                <AntDesign name='minus' style={styles.plusminus} />
                            </View>
                        </TouchableOpacity>
                        <Text>{product.quantity}</Text>
                        <TouchableOpacity onPress={handlePlus}>
                            <View style={styles.plusContainer}>
                                <AntDesign name='plus' style={styles.plusminus} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={hanldeDelete}>
                        <MaterialIcons name='delete-outline' style={styles.delete} />
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    );
};



// CSS STYLES
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 110,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.white,
        borderBottomWidth: 2,
        marginBottom: 30,
    },
    productImageContainer: {
        width: '30%',
        height: 100,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
        borderRadius: 10,
        marginRight: 22,
        marginBottom: 10,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    ProductDetialContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
    },
    productName: {
        fontSize: 14,
        maxWidth: '100%',
        color: COLORS.primary,
        fontWeight: '600',
        letterSpacing: 1,
    },
    priceContainer: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6,
    },
    price: {
        fontSize: 14,
        fontWeight: '400',
        maxWidth: '85%',
        marginRight: 4,
    },
    delete: {
        fontSize: 20,
        color: COLORS.black,
        backgroundColor: COLORS.white,
        padding: 8,
        borderRadius: 100,
    },
    plusminus: {
        fontSize: 16,
        color: COLORS.primary,
    },
    plusContainer: {
        borderRadius: 100,
        marginLeft: 20,
        padding: 4,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        opacity: 0.5,
    },
    minusContainer: {
        borderRadius: 100,
        marginRight: 20,
        padding: 4,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        opacity: 0.5,
    },
    plusMinusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    plusMinusDeleteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },


});
