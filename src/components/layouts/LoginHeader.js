import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


import { COLORS, FONTS, SIZES, assets } from '../../constants';
const user = "ketema"
const LoginHeader = ({ onSearch }) => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.font,
            }}
        >
            <View
                style={{
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

        </View>
    );
};

export default LoginHeader;