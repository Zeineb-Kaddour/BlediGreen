import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scan from '../screens/scan';
import HomePage from '../screens/HomePage';
import Map from '../screens/Map';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/home 1.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Scan"
                component={Scan}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/Group 5.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/location 1.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        // Add any additional styles you want to apply to the icons here
    },
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70,
        // Add any additional styles you want to apply to the tabBarStyle here
    },
});

const screenOptions = {
    TabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: styles.tabBarStyle,
}

export default BottomNavigation;
