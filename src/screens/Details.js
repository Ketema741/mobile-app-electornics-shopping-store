import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, StatusBar, FlatList, ActivityIndicator } from "react-native";

import { COLORS, SIZES, assets, SHADOWS, FONTS } from "../constants";
import { SubInfo, DetailsBid, FocusedStatusBar } from "../components/productDetail";
import { CircleButton, RectButton2, } from "../components/layouts/Button";
import productContext from "../context/product/productContext";
import { EthPrice, NFTTitle } from "../components/productDetail/SubInfo";
import { NFTData } from "../constants";
const DetailsHeader = ({ data, navigation }) => {
  if (data) {
    return (
      <View style={{ width: "100%", height: 373 }}>
        <Image
          source={{ uri: data.url }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />

        <CircleButton
          imgUrl={assets.left}
          handlePress={() => navigation.goBack()}
          left={15}
          top={StatusBar.currentHeight + 10}
        />

        <CircleButton
          imgUrl={assets.heart}
          right={15}
          top={StatusBar.currentHeight + 10}
        />
      </View>
    );
  }
}

const Details = ({ route, navigation }) => {
  const ProductContext = useContext(productContext)

  const { addToCart, item } = ProductContext

  const [text, setText] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    if (item) {
      setText(item.description.slice(0, 100))
      setLoading(false)
    }
    
  }, [route.params, item])
  

  const handleAddToCart = () => {
    console.log(item)
    addToCart(item)
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.5)",
          zIndex: 1,
        }}
      >
        <RectButton2
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
          handlePress={handleAddToCart}
        />
      </View>

      <FlatList
        data={NFTData.bids}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: SIZES.extraLarge * 3,
        }}
        ListHeaderComponent={() => (
          <React.Fragment>
            <DetailsHeader data={item} navigation={navigation} />
            <SubInfo />
            <View style={{ padding: SIZES.font }}>
              {item && item.description &&
                <>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <NFTTitle
                      title={item.name}
                      subTitle={item.title}
                      titleSize={SIZES.extraLarge}
                      subTitleSize={SIZES.font}
                    />

                    <EthPrice price={item.price} />
                  </View>

                  <View style={{ marginVertical: SIZES.extraLarge * 1.5 }}>
                    <Text
                      style={{
                        fontSize: SIZES.font,
                        fontFamily: FONTS.semiBold,
                        color: COLORS.primary,
                      }}
                    >
                      Description
                    </Text>
                    <View
                      style={{
                        marginTop: SIZES.base,
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.secondary,
                          fontSize: SIZES.small,
                          fontFamily: FONTS.regular,
                          lineHeight: SIZES.large,
                        }}
                      >
                        {text}
                        {!readMore && "..."}
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: SIZES.small,
                            fontFamily: FONTS.semiBold,
                          }}
                          onPress={() => {
                            if (!readMore) {
                              setText(item.description);
                              setReadMore(true);
                            } else {
                              setText(item.description.slice(0, 100));
                              setReadMore(false);
                            }
                          }}
                        >
                          {readMore ? " Show Less" : " Read More"}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </>
              }

              
            </View>
          </React.Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;
