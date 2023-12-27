import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, Platform } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PendingOrders from './Orders/PendingOrders'
import AcceptedOrders from './Orders/AcceptedOrders'
import CompletedOrders from './Orders/CompletedOrders'
import CancelledOrders from './Orders/CancelledOrders'

const Tab = createMaterialTopTabNavigator();

export default function MyOrders({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
              <TouchableHighlight
              underlayColor={'#fff'}
              activeOpacity={0.2}
              style={styles.menu_button}
              onPress={() => navigation.goBack()}
              >
              <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon}/>
              </TouchableHighlight>
              <Text style={styles.header_title}>My Orders</Text>
              <View style={{width: 25, height: 25}}/>
          </View>
          <Tab.Navigator
              screenOptions={{
                  tabBarActiveTintColor: '#99DFB2',
                  tabBarInactiveTintColor: '#808080',
                  tabBarIndicatorStyle: {
                      height: 0
                  },
                  tabBarLabelStyle: {
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: 16
                  },
                  tabBarScrollEnabled: true
              }}
              
          >
              <Tab.Screen name="Pending Orders" component={PendingOrders}/>
              <Tab.Screen name="Accepted Orders" component={AcceptedOrders}/>
              <Tab.Screen name="Completed" component={CompletedOrders}/>
              <Tab.Screen name="Cancelled" component={CancelledOrders}/>
          </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  header:{
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menu_button: {
    height: 25,
    width: 25,
  },
  menu_icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  header_title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})