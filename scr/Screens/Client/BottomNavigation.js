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
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        height: 60,
        backgroundColor: 'white',
        paddingVertical: 10,
      },
    }}>
        <Tab.Screen name="ClientHome"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarActiveTintColor: 'darkgreen',
                // tabBarActiveBackgroundColor: 'darkgreen',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused? require('../../../assets/home.png') : require('../../../assets/home-greyscale.png') } style={{width: 35, height: 35}}/>
                ),
                unmountOnBlur: true
            }}
        />
        <Tab.Screen name="Medicines"
            component={Medicines}
            options={{
                tabBarLabel: 'Medicines',
                tabBarActiveTintColor: 'darkgreen',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused? require('../../../assets/capsule.png') : require('../../../assets/capsule-greyscale.png') } style={{width: 35, height: 35}}/>
                ),
            }}
        />
        <Tab.Screen
            name="Clinics"
            component={Clinics}
            options={{
                tabBarActiveTintColor: 'darkgreen',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused? require('../../../assets/clinic.png') : require('../../../assets/clinic-greyscale.png') } style={{width: 35, height: 35}}/>
                ),
            }}
        />
        <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
                tabBarActiveTintColor: 'darkgreen',
                unmountOnBlur: true,
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused? require('../../../assets/shopping-cart.png') : require('../../../assets/shopping-cart-greyscale.png') } style={{width: 35, height: 35}}/>
                ),
            }}
        />
        <Tab.Screen
            name="Account"
            component={More}
            options={{
                tabBarActiveTintColor: 'darkgreen',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Image source={focused? require('../../../assets/man.png') : require('../../../assets/man-greyscale.png') } style={{width: 35, height: 35}}/>
                ),
            }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})