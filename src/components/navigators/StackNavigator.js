
import { createStackNavigator } from "@react-navigation/stack";


import Details from "../../screens/Details";
import ItemUpload from "../../screens/admin/ItemUpload";
import addminProduct from '../admin/Products'

import Home from "../../screens/Home";
import Cart from '../../screens/cart/Cart'
import PaymentSheet from "../../screens/cart/PaymentSheet";
import AddProduct from '../../screens/admin/AddProduct';
import Login from '../auth/Login';
import Products from './../products/Products';

const Stack = createStackNavigator();

const StackNavigator = () => {


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Payment" component={PaymentSheet} />

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="ItemUpload" component={ItemUpload} />
            <Stack.Screen name="addminProduct" component={addminProduct} />
        </Stack.Navigator>
    );
}
export default StackNavigator