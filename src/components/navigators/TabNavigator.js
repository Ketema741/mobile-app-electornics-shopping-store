import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../../screens/Home';
import StackNavigator from './StackNavigator';
import UserProfile from '../../screens/profile/UserProfile';
import Admin from '../../screens/admin/Admin'


const TabNavigator = () => {
    const screenOptions = {
        headerShown: false,
    };
    const Tab = createBottomTabNavigator()

    return (
        <>
            <Tab.Navigator {...{ screenOptions }}>
                <Tab.Screen
                    name="Stack"
                    component={StackNavigator}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="home" size={24} color="black" />
                        ),
                    }}
                />
                
                <Tab.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        tabBarLabel: 'Cart',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="shopping-cart" size={24} color="black" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={UserProfile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="user" size={24} color="black" />
                            
                        ),
                    }}
                />
                <Tab.Screen
                    name="Admin"
                    component={Admin}
                    options={{
                        tabBarLabel: 'Admin',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="admin-panel-settings" size={24} color="black" />

                        ),
                    }}
                />

            </Tab.Navigator>

        </>
    );
}
export default TabNavigator