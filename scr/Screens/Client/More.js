import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Platform, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function More({navigation}) {
    const {userInfo, logout} = useContext(AuthContext);

    return (
        <ScrollView style={{paddingTop: Platform.OS === 'ios' ? 60 : 0, backgroundColor: '#f2f2f2'}}>
            <View style={styles.user_profile}>
                <View style={{flex: 1}}>
                    <View style={styles.user_photo_container}>
                        <Image source={require('../../../assets/profile-photo.png')} style={styles.user_photo}/>
                    </View>
                </View>
                <View style={{flex: 1, marginLeft: 20}}>
                    <View>
                        <Text style={styles.user_name} numberOfLines={2} ellipsizeMode='tail'>{userInfo.details.first_name + ' ' + userInfo.details.last_name}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.user_contact} numberOfLines={2} ellipsizeMode='tail'>{userInfo.details.address}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 1, paddingVertical: 10}}>
                <View style={styles.menu_options_container}>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('MyOrders')}
                    >
                        <Text>My Orders</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('ClientProfile')}
                    >
                        <Text>My Profile</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.menu_options_container}>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('PrivacyPolicy')}
                    >
                        <Text>Privacy Policy</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('TermsAndConditions')}
                    >
                        <Text>Terms & Conditions</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.menu_options_container}>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => alert('Being worked on.')}
                    >
                        <Text>Points Wallet</Text>
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
    user_profile: {
        flexDirection: 'row',
        width: '100%',
        height: 240,
        paddingBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    user_photo_container: {
        width: '100%',
        height: '100%',
        elevation: 5,
        backgroundColor: '#99DFB2',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_photo: {
        width: '90%',
        height: '90%',
    },
    user_name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    user_contact: {
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