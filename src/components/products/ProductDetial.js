import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../../constants'
import { EthPrice } from '../productDetail/SubInfo'

const ProductDetial = ({ product }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.base,
      }}
      key={product.id}
    >
      <Image
        source={product.image}
        resizeMode="contain"
        style={{ width: 48, height: 48 }}
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: SIZES.base,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: SIZES.small,
            color: COLORS.primary,
          }}
        >
          product placed by {product.name}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.small - 2,
            color: COLORS.secondary,
            marginTop: 3,
          }}
        >
          {product.date}
        </Text>
      </View>

      <EthPrice price={product.price} />
    </View>
  )
}

export default ProductDetial