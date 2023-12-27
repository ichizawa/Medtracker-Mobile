import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Platform, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function Menu({navigation}) {
    const {userInfo, logout} = useContext(AuthContext);

    return (
        <ScrollView style={{paddingTop: Platform.OS === 'ios' ? 60 : 0, backgroundColor: '#fff'}}>
        <View style={styles.header}>
            <TouchableHighlight
            underlayColor={'#fff'}
            activeOpacity={0.2}
            style={styles.menu_button}
            onPress={() => navigation.navigate('Home')}
            >
            <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon}/>
            </TouchableHighlight>
            <Text style={styles.header_title}>Account</Text>
            <View style={{width: 20, height: 20}}/>
        </View>
        <View style={styles.store_profile}>
            <View style={{flex: 1}}>
                <View style={styles.store_photo_container}>
                    <Image source={require('../../../assets/pharmacy.png')} style={styles.store_photo}/>
                </View>
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
                <View>
                    <Text style={styles.store_name}>{userInfo.details.first_name + ' ' + userInfo.details.last_name}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.store_contact}>{userInfo.details.contact_no}</Text>
                </View>
            </View>
        </View>
        <View style={{flex: 1, paddingVertical: 10, backgroundColor: '#f2f2f2'}}>
            <View style={styles.menu_options_container}>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_options}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text>Home</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_options}
                    onPress={() => navigation.navigate('RiderProfile')}
                >
                    <Text>My Profile</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.menu_options_container}>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_options}
                    onPress={() => navigation.navigate('OrderList')}
                >
                    <Text>Orders</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_options}
                    onPress={() => navigation.navigate('RiderPoints')}
                >
                    <Text>Points Wallet</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.menu_options_container}>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_options}
                    onPress={() => console.log('pressed')}
                >
                    <Text>Contact Us</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_options}
                    onPress={() => logout()}
                >
                    <Text>Logout</Text>
                </TouchableHighlight>
            </View>
        </View>
        </ScrollView>
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
        height: 20,
        width: 20,
    },
    menu_icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    header_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    store_profile: {
        flexDirection: 'row',
        width: '100%',
        height: 240,
        paddingBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    store_photo_container: {
        width: '100%',
        height: '100%',
        elevation: 5,
        backgroundColor: '#99DFB2',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    store_photo: {
        width: '90%',
        height: '90%',
    },
    store_name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    store_contact: {
        fontSize: 18,
        color: '#808080'
    },
    menu_options_container: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    menu_options: {
        width: '45%',
        height: '90%',
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})