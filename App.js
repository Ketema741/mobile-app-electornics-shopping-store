
import ProductState from "./src/context/product/ProductState";
import TabNavigator from './src/components/navigators/TabNavigator';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";

// import { API_URL } from "./src/config/config";
// import { Button, Alert, View } from 'react-native'
import axios from "axios";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  const [publishableKey, setPublishableKey] = useState('')

  useEffect(() => {
    const getPublishabkeKey = async () => {
      try {
        const res = await axios.post('http://localhost:6000/api/payment/create-checkout-session')
        const { publishableKey } = await res.data;

        setPublishableKey(publishableKey)
      } catch (error) {
        console.log(error)
      }
    }
    getPublishabkeKey()
    console.log(publishableKey)
  }, [])
  return (
    <StripeProvider
      publishableKey={publishableKey}
    >
      <NavigationContainer>
        <ProductState>
          <TabNavigator />
        </ProductState>
      </NavigationContainer>
    </StripeProvider>
  );
}
export default App
