import { createStackNavigator } from "@react-navigation/stack";

import Details from "../../screens/Details";
import ItemUpload from "../admin/ItemUpload";
import EditItem from "../admin/EditItem";

import Home from "../../screens/Home";
import Cart from '../../screens/cart/Cart'
import PaymentSheet from "../../screens/cart/PaymentSheet";
import Login from '../auth/Login';
import Register from '../auth/Register';
import Admin from "../../screens/admin/Admin";
import UserProfile from "../../screens/profile/UserProfile";


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
            <Stack.Screen name="Register" component={Register} />

            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="ItemUpload" component={ItemUpload} />
            <Stack.Screen name="EditItem" component={EditItem} />

            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    );
}
export default StackNavigator