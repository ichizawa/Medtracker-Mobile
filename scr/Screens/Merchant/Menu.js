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
    const [isPrivFocused, focusedPriv] = useState(false);
    const [isTermFocused, focusedTerm] = useState(false);
    const [isPointsFocused, focusedPoints] = useState(false);
    const [isItemsFocused, focusedItems] = useState(false);
    const [isLogFocused, focusedLog] = useState(false);

    

    return (
        <ScrollView style={{paddingTop: Platform.OS === 'ios' ? 60 : 0}}>
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
                <View style={styles.main_header}>
                    <View>
                        <Text style={styles.store_name}>{userInfo.details.merchant_name}</Text>
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
                        onPress={() => navigation.navigate('Profile')}>
                         <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25,color: isProfFocused ? 'white' : '#013237'}} name='user' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isProfFocused ? 'white' : '#013237'}]}>My Profile</Text>
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
                            <FontAwesome style={{ fontSize: 25,color: isPrivFocused ? 'white' : '#013237'}} name='lock' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isPrivFocused ? 'white' : '#013237'}]}>Privacy Policy</Text>
                            </View>
                        </View>
                        
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedTerm(true)}
                        onPressOut={()=>focusedTerm(false)}
                        onPress={() => navigation.navigate('TermsAndConditions')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25,color: isTermFocused ? 'white' : '#013237' }} name='clipboard' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isTermFocused ? 'white' : '#013237'}]}>Terms and Conditions</Text>
                            </View>
                        </View>
                      
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedPoints(true)}
                        onPressOut={()=>focusedPoints(false)}
                        onPress={() => navigation.navigate('MerchantPoints')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25,color: isPointsFocused ? 'white' : '#013237' }} name='credit-card' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isPointsFocused ? 'white' : '#013237' }]}>Merchant Points</Text>
                            </View>
                        </View>
                        {/* <Text style={[styles.inlet_text, {color: '#013237'}]}>Merchant Points</Text> */}
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedItems(true)}
                        onPressOut={()=>focusedItems(false)}
                        onPress={() => navigation.navigate('Items')}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isItemsFocused ? 'white' : '#013237' }} name='list-alt' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isItemsFocused ? 'white' : '#013237' }]}>Items</Text>
                            </View>
                        </View>
                        {/* <Text style={[styles.inlet_text, {color: '#013237'}]}>Items</Text> */}
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedLog(true)}
                        onPressOut={()=>focusedLog(false)}
                        onPress={() => logout()}>
                        <View style={[styles.btn_txt, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25,color: isLogFocused ? 'white' : '#013237' }} name='sign-out' />
                            <View style={styles.btn_int_txt}>
                                <Text style={[styles.inlet_text, {color: isLogFocused ? 'white' : '#013237' }]}>Logout</Text>
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
                        <Text>My Orders</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Text>Store Profile</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.menu_options_container}>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('MerchantPoints')}
                    >
                        <Text>Points Wallet</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => console.log('pressed')}
                    >
                        <Text>Insights</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.menu_options_container}>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => console.log('pressed')}
                    >
                        <Text>Earnings</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#fff'}
                        activeOpacity={0.2}
                        style={styles.menu_options}
                        onPress={() => navigation.navigate('Items')}
                    >
                        <Text>My Items</Text>
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
                        <Text>FAQ's</Text>
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
        backgroundColor: '#fff',
        // paddingTop: 20,
    },
    header:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#6EB95B',
        justifyContent: 'space-between',
        paddingTop: '13%'
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
        fontSize: 23,
        fontWeight: 'bold',
        // backgroundColor: '#6EB95B',
    },
    store_profile: {
        flexDirection: 'column',
        width: '100%',
        // height: 200,
        paddingBottom: 20,
        backgroundColor: '#6EB95B',

    },
    store_photo_container: {
        // marginTop: 0,
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
        // fontSize: 32,
        // fontWeight: 'bold',
        marginTop: 25,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    store_contact: {
        // fontSize: 18,
        // color: '#808080'
        fontSize: 15,
        fontWeight: 'regular',
        color: '#F6F6F6',
    },
    menu_options: {
        alignSelf: 'center',
        width: '95%',
        marginBottom: 15,
        paddingVertical: 13,
        backgroundColor: '#C0E6BA',
        borderRadius: 10,
    },
    inlet_text: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    inlet_menu_option: {
        marginVertical: 15,
        width: '100%'
    },
    bottom_inlet_navigation: {
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main_header: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },  
    btn_txt: {
        flex: 1,
        marginHorizontal: 20,
    },
    btn_int_txt: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: '13%',
        position: 'absolute',
    }
    
})