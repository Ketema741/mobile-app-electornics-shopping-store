import React, { useState, useContext } from "react";
import { View, SafeAreaView, FlatList } from "react-native";

import FocusedStatusBar from '../layouts/FocusedStatusBar'
import { COLORS } from "../../constants";

import HomeHeader from "../layouts/HomeHeader";
import ProductItem from "./ProductItem";

import productContext from "../../context/product/productContext";


const Products = () => {
  const ProductContext = useContext(productContext)
  const { products } = ProductContext;

  const [nftData, setNftData] = useState(products);

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(products);
    }

    const filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(products);
    } else {
      setNftData(filteredData);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={nftData}
            renderItem={({ item }) => <ProductItem data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View
            style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Products;
