import { View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import { EditButton, DeleteButton } from '../layouts/Button';
import { COLORS, SIZES, SHADOWS, assets } from '../../constants';
import { SubInfo, EthPrice, NFTTitle } from '../productDetail/SubInfo';


const ProductItem = ({ data }) => {
  const navigation = useNavigation();
  const removeItem = () => {
    // remove item
  } 
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
        }}
      >
        <Image
          source={data.image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </View>
      <EditButton  handlePress={() => navigation.navigate("ItemUpload", { data })} imgUrl={assets.heart} right={10} top={10} />

      <SubInfo />
      <View style={{ width: "100%", padding: SIZES.font }}>
        <NFTTitle
          title={data.name}
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
      </View>
      <View
        style={{
          marginTop: SIZES.font,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EthPrice price={data.price} />
        <DeleteButton
          minWidth={120}
          fontSize={SIZES.font}
          handlePress={removeItem()}
        />
      </View>
    </View>
  )
}

export default ProductItem