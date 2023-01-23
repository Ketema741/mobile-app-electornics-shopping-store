import React, { useState, useContext, useEffect } from "react";
import { View, SafeAreaView, FlatList } from "react-native";

import FocusedStatusBar from '../layouts/FocusedStatusBar'
import { COLORS } from "../../constants";

import AdminHeader from "../layouts/AdminHeader";
import ProductItem from "./ProductItem";

import productContext from "../../context/product/productContext";


const Products = () => {
  const ProductContext = useContext(productContext)
  const { items, getItems } = ProductContext;

  const [itemData, setData] = useState(items);

  useEffect(async () => { 
    await getItems()
    setData(items)
  }, [])


  const handleSearch = (value) => {
    if (value.length === 0) {
      setData(items);
    }

    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setData(items);
    } else {
      setData(filteredData);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar background={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={items}
            renderItem={({ item }) => <ProductItem data={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<AdminHeader onSearch={handleSearch} />}
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