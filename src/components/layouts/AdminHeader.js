import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Feather } from '@expo/vector-icons';

import { COLORS, FONTS, SIZES, assets } from '../../constants';
const user = "ketema"
const AdminHeader = ({ onSearch }) => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.font,
            }}
        >
            <View
                style = {{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Image
                    source={assets.logo}
                    resizeMode="contain"
                    style={{ width: 90, height: 25 }}
                />

                <TouchableOpacity onPress={() => navigation.navigate("ItemUpload", { user })}>
                    <View style={{ width: 50, height: 50 }} >
                        <View style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: COLORS.white,
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        >
                            <Feather name="upload" size={24} color="black" />
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginVertical: SIZES.font }}>
                <Text
                    style={{
                        fontFamily: FONTS.regular,
                        fontSize: SIZES.small,
                        color: COLORS.white,
                    }}
                >
                    TechTronix 👋
                </Text>

                <Text
                    style={{
                        fontFamily: FONTS.bold,
                        fontSize: SIZES.large,
                        color: COLORS.white,
                        marginTop: SIZES.base / 2,
                    }}
                >
                    Electronics for every budget
                </Text>
            </View>

            <View style={{ marginTop: SIZES.font }}>
                <View
                    style={{
                        width: "100%",
                        borderRadius: SIZES.font,
                        backgroundColor: COLORS.gray,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: SIZES.font,
                        paddingVertical: SIZES.small - 2,
                    }}
                >
                    <Image
                        source={assets.search}
                        resizeMode="contain"
                        style={{ width: 20, height: 20, marginRight: SIZES.base }}
                    />
                    <TextInput
                        placeholder="Search products..."
                        style={{ flex: 1 }}
                        onChangeText={onSearch}
                    />
                </View>
            </View>
        </View>
    );
};

export default AdminHeader;