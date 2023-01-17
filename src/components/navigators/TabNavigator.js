
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Home from '../../screens/Home';

import StackNavigator from './StackNavigator';

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
                    name="Search"
                    component={Home}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="search" size={24} color="black" />
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
                    component={Cart}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Feather
                                name="user"
                                size={24} color="black" />
                        ),
                    }}
                />

            </Tab.Navigator>

        </>
    );
}
export default TabNavigator