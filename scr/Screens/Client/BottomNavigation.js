import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './Home'
import More from './More'
import Medicines from './Medicines'
import Cart from './Cart'
import Clinics from './Clinics'

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarHideOnKeyboard: true}}>
        <Tab.Screen name="ClientHome"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused ? require('../../../assets/home.png') : require('../../../assets/home-greyscale.png') } style={{width: 25, height: 25}}/>
                ),
                unmountOnBlur: true
            }}
        />
        <Tab.Screen name="Medicines"
            component={Medicines}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused ? require('../../../assets/capsule.png') : require('../../../assets/capsule-greyscale.png') } style={{width: 25, height: 25}}/>
                ),
            }}
        />
        <Tab.Screen
            name="Clinics"
            component={Clinics}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused ? require('../../../assets/clinic.png') : require('../../../assets/clinic-greyscale.png') } style={{width: 25, height: 25}}/>
                ),
            }}
        />
        <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
                unmountOnBlur: true,
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused ? require('../../../assets/shopping-cart.png') : require('../../../assets/shopping-cart-greyscale.png') } style={{width: 25, height: 25}}/>
                ),
            }}
        />
        <Tab.Screen
            name="Account"
            component={More}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused ? require('../../../assets/man.png') : require('../../../assets/man-greyscale.png') } style={{width: 25, height: 25}}/>
                ),
            }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})