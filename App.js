
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from 'react-native';

import axios from "axios";

import TabNavigator from './src/components/navigators/TabNavigator';

import ProductState from "./src/context/product/ProductState";
import AuthState from './src/context/auth/AuthState';
import UserState from './src/context/user/UserState';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const App = () => {
  const [fontsLoaded] = useFonts({
    "InterBold": require("./assets/fonts/Inter-Bold.ttf"),
    "InterSemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "InterMedium": require("./assets/fonts/Inter-Medium.ttf"),
    "InterRegular": require("./assets/fonts/Inter-Regular.ttf"),
    "InterLight": require("./assets/fonts/Inter-Light.ttf"),
  });
  
  


  const [publishableKey, setPublishableKey] = useState('')

  useEffect(() => {
    const getPublishabkeKey = async () => {
      try {
        const res = await axios.post('http://10.4.112.184:4420/api/payment/checkout/session')
        const { publishableKey } = await res.data;
        


        setPublishableKey(publishableKey)
      } catch (error) {
        console.log(error)
      }
    }
    getPublishabkeKey()
    console.log(publishableKey)
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  
  if (!publishableKey) {
    return <AppLoading />;
  }
  
  return (
    <StripeProvider
      publishableKey={publishableKey}
    >
      <NavigationContainer>
        <UserState>
        <AuthState>
          <ProductState>
            <TabNavigator />
          </ProductState>
        </AuthState>
        </UserState>
      </NavigationContainer>
    </StripeProvider>
  );
}

const AppLoading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{ marginTop: 10, fontSize: 18 }}>Loading...</Text>
    </View>
  );
}; 
export default App