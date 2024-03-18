import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Platform, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import {FontAwesome} from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';

export default function Menu({navigation}) {
    const {userInfo, logout} = useContext(AuthContext);
    const [isHomeFocused, focusedHome] = useState(false);
    const [isProfFocused, focusedProf] = useState(false);
    const [isListFocused, focusedList] = useState(false);
    const [isPointsFocused, focusedPoints] = useState(false);
    const [isPrivFocused, focusedPriv] = useState(false);
    const [isTermsFocused, focusedTerms] = useState(false);
    const [isLogFocused, focusedLog] = useState(false);

    return (
        <ScrollView style={{paddingTop: Platform.OS === 'ios' ? 60 : 0, backgroundColor: '#fff'}}>
        <StatusBar hidden = {false} translucent = {true}/>
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
            <View style={styles.header_user_info}>
                <View>
                    <Text style={styles.store_name}>{userInfo.details.first_name + ' ' + userInfo.details.last_name}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.store_contact}>{userInfo.details.contact_no}</Text>
                </View>
            </View>
        </View>
        <View style={styles.bottom_inlet_navigation}>
            <View style={styles.inlet_menu_option}>
            <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedHome(true)}
                        onPressOut={()=>focusedHome(false)}
                        onPress={() => navigation.navigate('Home')}>
                       <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isHomeFocused ? 'white' : '#013237'}} name='home' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isHomeFocused ? 'white' : '#013237'}]}>Home</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedProf(true)}
                        onPressOut={()=>focusedProf(false)}
                        onPress={() => navigation.navigate('RiderProfile')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isProfFocused ? 'white' : '#013237'}} name='user' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isProfFocused ? 'white' : '#013237'}]}>Rider Profile</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedList(true)}
                        onPressOut={()=>focusedList(false)}
                        onPress={() => navigation.navigate('OrderList')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isListFocused ? 'white' : '#013237'}} name='list-alt' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isListFocused ? 'white' : '#013237'}]}>Order List</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedPoints(true)}
                        onPressOut={()=>focusedPoints(false)}
                        onPress={() => navigation.navigate('RiderPoints')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isPointsFocused ? 'white' : '#013237'}} name='credit-card'/>
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isPointsFocused ? 'white' : '#013237'}]}>Rider Points</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedPriv(true)}
                        onPressOut={()=>focusedPriv(false)}
                        onPress={() => navigation.navigate('PrivacyPolicy')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isPrivFocused ? 'white' : '#013237'}} name='lock'/>
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isPrivFocused ? 'white' : '#013237'}]}>Privacy Policy</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedTerms(true)}
                        onPressOut={()=>focusedTerms(false)}
                        onPress={() => navigation.navigate('TermsAndConditions')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isTermsFocused ? 'white' : '#013237'}} name='clipboard'/>
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isTermsFocused ? 'white' : '#013237'}]}>Terms and Conditions</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedLog(true)}
                        onPressOut={()=>focusedLog(false)}
                        onPress={() => logout()}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isLogFocused ? 'white' : '#013237'}} name='sign-out'/>
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isLogFocused ? 'white' : '#013237'}]}>Logout</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
            </View>

        </View>
        {/* <View style={{flex: 1, paddingVertical: 10, backgroundColor: '#f2f2f2'}}>
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
                    <Text>Terms And Conditions</Text>
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
        </View> */}
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
        backgroundColor: '#6EB95B',
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12%'
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
    header_user_info: {
        flex: 1, 
        // marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    store_profile: {
        flexDirection: 'column',
        width: '100%',
        paddingBottom: 30,
        backgroundColor: '#6EB95B',
    },
    store_photo_container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    store_photo: {
        width: '30%',
        height: 120,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    store_name: {
        marginTop: 25,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    store_contact: {
        // fontSize: 18,
        // color: '#808080'
        fontSize: 15,
        fontWeight: 'regular',
        color: '#F6F6F6',
    },
    menu_options_container: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    menu_options: {
        alignSelf: 'center',
        width: '95%',
        marginTop: 15,
        paddingVertical: 13,
        backgroundColor: '#C0E6BA',
        borderRadius: 10,
    },
    bottom_inlet_navigation: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inlet_menu_option: {
        flex: 1,
        width: '100%'
    },
    inlet_text: {
        fontSize: 17,
        fontWeight: 'bold',
        // color: '#393E46',
    },
    btn_txt: {
        flex: 1,
        marginHorizontal: 20,
        // alignSelf: 'center',
        // alignItems: 'center'
    },

    btn_int_txt: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: '13%',
        // alignItems: 'flex-start',
        // display: 'flex',
        position: 'absolute',
        // backgroundColor: 'red',
    }
})