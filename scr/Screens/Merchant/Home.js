import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, Platform } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import NewOrders from './NewOrders';
import OrderHistory from './OrderHistory';

const Tab = createMaterialTopTabNavigator();

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor={'#fff'}
          activeOpacity={0.2}
          style={styles.menu_button}
          onPress={() => navigation.navigate('Menu')}
        >
          <Image source={require('../../../assets/menu-burger.png')} style={styles.menu_icon}/>
        </TouchableHighlight>
        <Text style={styles.header_title}>Orders</Text>
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
          }
        }}
        
      >
        <Tab.Screen name="New Orders" component={NewOrders}/>
        <Tab.Screen name="Order History" component={OrderHistory}/>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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