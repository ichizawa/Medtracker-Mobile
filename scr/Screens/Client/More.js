import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Platform, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import {LinearGradient} from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function More({navigation}) {
    const {userInfo, logout} = useContext(AuthContext);
    const [isFocused, setFocused] = useState(false);
    const [isProfFocused, focusedProf] = useState(false);
    const [isPrivFocused, focusedPriv] = useState(false);
    const [isTermFocused, focusedTerm] = useState(false);
    const [isPointsFocused, focusedPoints] = useState(false);
    const [isLogFocused, focusedLog] = useState(false);
    
    return (
        <ScrollView style={{paddingTop: Platform.OS === 'ios' ? 60 : 0, backgroundColor: '#f2f2f2'}}>
            {/* <StatusBar></StatusBar> */}
            <StatusBar hidden = {false} translucent = {true}/>
            {/* <LinearGradient
                colors={['transparent','#6EB95B']}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0
                }}
            /> */}
            <View style={styles.user_profile}>
                <View style={{flex: 1}}>
                    <View style={styles.user_photo_container}>
                        <Image source={require('../../../assets/profile-photo.png')} style={styles.user_photo}/>
                    </View>
                </View>
                <View style={styles.header_user_info}>
                    <View>
                        <Text style={styles.user_name} numberOfLines={2} ellipsizeMode='tail'>{userInfo.details.first_name + ' ' + userInfo.details.last_name}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.user_contact} numberOfLines={2} ellipsizeMode='tail'>{userInfo.details.address}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.bottom_inlet_navigation}>
                <View style={styles.inlet_menu_option}>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>setFocused(true)} 
                        onPressOut={()=>setFocused(false)}
                        onPress={() => navigation.navigate('MyOrders')}>
                        {/* <Text style={[styles.inlet_text, {color: isFocused ? 'white' : '#013237'}]}>My Orders
                            <FontAwesome style={{fontSize: 20}} name='shopping-cart'/>
                        </Text> */}
                        <View style={[styles.btn_text, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isFocused ? 'white' : '#013237'}} name='cart-arrow-down' />
                            <View style={styles.btn_inter_text}>
                                <Text style={[styles.inlet_text, { color: isFocused ? 'white' : '#013237'}]}>My Orders</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedProf(true)} 
                        onPressOut={()=>focusedProf(false)}
                        onPress={() => navigation.navigate('ClientProfile')}>
                        {/* <Text style={[styles.inlet_text, {color: isFocused ? 'white' : '#013237'}]}>My Profile
                            <FontAwesome name='user'/>
                        </Text> */}
                        <View style={[styles.btn_text, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isProfFocused ? 'white' : '#013237'}} name='user' />
                            <View style={styles.btn_inter_text}>
                                <Text style={[styles.inlet_text, {color: isProfFocused ? 'white' : '#013237' }]}>My Profile</Text>
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
                        {/* <Text style={[styles.inlet_text, {color: isFocused ? 'white' : '#013237'}]}>Privacy Policy
                            <FontAwesome name='shield'/>
                        </Text> */}
                        <View style={[styles.btn_text, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isPrivFocused ? 'white' : '#013237'}} name='lock' />
                            <View style={styles.btn_inter_text}>
                                <Text style={[styles.inlet_text, {color: isPrivFocused ? 'white' : '#013237' }]}>Privacy Policy</Text>
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
                        {/* <Text style={[styles.inlet_text, {color: isFocused ? 'white' : '#013237'}]}>Terms & Conditions
                            <FontAwesome name='clipboard'/>
                        </Text> */}
                        <View style={[styles.btn_text, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isTermFocused ? 'white' : '#013237'}} name='clipboard' />
                            <View style={styles.btn_inter_text}>
                                <Text style={[styles.inlet_text, {color: isTermFocused ? 'white' : '#013237' }]}>Terms & Conditions</Text>
                            </View>

                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={'#6EB95B'}
                        // activeOpacity={0.2}
                        style={styles.menu_options}
                        onPressIn={()=>focusedPoints(true)} 
                        onPressOut={()=>focusedPoints(false)}
                        onPress={() => alert('Being worked on.')}>
                        {/* <Text style={[styles.inlet_text, {color: isFocused ? 'white' : '#013237'}]}>Points Wallet
                            <FontAwesome name='google-wallet'/>
                        </Text> */}
                        <View style={[styles.btn_text, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isPointsFocused ? 'white' : '#013237'}} name='credit-card' />
                           <View style={styles.btn_inter_text}>
                           <Text style={[styles.inlet_text, {color: isPointsFocused ? 'white' : '#013237' }]}>Points Wallet</Text>
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
                        <View style={[styles.btn_text, {flexDirection: 'row', alignItems: 'center', width: '100%'}]}>
                            <FontAwesome style={{ fontSize: 25, color: isLogFocused ? 'white' : '#013237'}} name='sign-out' />
                            <View style={styles.btn_inter_text}>
                                <Text style={[styles.inlet_text, {color: isLogFocused ? 'white' : '#013237' }]}>Logout</Text>
                            </View>
                            
                        </View>
                    </TouchableHighlight>
                </View>
                {/* <View style={styles.menu_options_container}>
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
                </View> */}
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
        paddingBottsom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header_user_info: {
        flex: 1, 
        // marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        flexDirection: 'column',
        width: '100%',
        // height: 200,
        paddingTop: 75,
        paddingBottom: 30,
        backgroundColor: '#6EB95B',
        elevation: 5,
    },
    user_photo_container: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_photo: {
        // backgroundColor: 'red',
        // marginTop: 10,
        width: 150,
        height: '100%',
        borderRadius: 100,
        backgroundColor: 'white'
    },
    user_name: {
        marginTop: 25,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    user_contact: {
        fontSize: 13,
        fontWeight: 'regular',
        color: '#F6F6F6',
        // width: 300,
    },
    bottom_inlet_navigation: {
        width: 'auto',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    menu_options: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 15,
        width: '95%',
        backgroundColor: '#C0E6BA',
        borderRadius: 10,
        // elevation: 5,
    },
    inlet_menu_option: {
        marginVertical: 15,
    },
    inlet_text: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    
    btn_text: {
        flex: 1,
        // backgroundColor: 'red'
        marginHorizontal: 20,
        
    },
    btn_inter_text: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: '13%',
        // alignItems: 'flex-start',
        // display: 'flex',
        position: 'absolute',
        // backgroundColor: 'red',
    }
})