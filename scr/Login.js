import { StyleSheet, Text, View, Image, Dimensions, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from './context/AuthContext';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';


const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

export default function Login({ navigation }) {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
    }

    useEffect(() => {
        getLocationPermission();
    }, [])

    // onfocus(() => {
    //     this.setState({
    //         backgroundColor: 'green'
    //     });
    // })
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);

    return (
        // style={{flexGrow: 1, backgroundColor: '#fff'}}
        <ScrollView style={styles.maincontainer} automaticallyAdjustKeyboardInsets={true}>
            {/* <View style={styles.title_section}>
                <View>
                    <Text style={styles.greeting_title_text}>Hello!</Text>
                </View>
                <View>
                    <Text style={styles.greeting_subtitle_text}>Please sign in to continue</Text>
                </View>
            </View>
            <View style={styles.form_section}>
                <View>
                    <TextInput
                        style={styles.text_input}
                        placeholder='Email'
                        value={email}
                        onChangeText={(e) => setEmail(e)}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.text_input}
                        secureTextEntry={true}
                        placeholder='Password'
                        value={password}
                        onChangeText={(e) => setPassword(e)}
                    />
                </View>
            </View>
            <View style={styles.button_section}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.auth_button}
                    onPress={() => login(email, password)}
                >
                    <Text style={styles.auth_button_text}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom_section}>
                <Text style={{fontSize: 14, fontWeight: '400', color: '#808080'}}>Don't have an account? </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.register_button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.register_button_text}>Register</Text>
                </TouchableOpacity>
            </View> */}
            <StatusBar hidden = {false} translucent = {true}/>
            <View style={styles.inletcontainer}>
                <View style={styles.inletText}>
                    {/* PUT DESIGN IN HEADER HERE */}
                    <Image style={{height: 100, width: 100}} source={require('../assets/logo/logo-updated.png')} />
                    <Text style={styles.text_inner_title}>
                        MedTrackerPH 
                    </Text> 
                </View>
            </View>
            <View style={styles.outletcontainer}>
                <View>
                    <Text style={styles.greeting_text}>Welcome back!</Text>
                </View>
                <View>
                    <Text style={styles.greeting_sub_text}>Login to your existing account of MedTracker</Text>
                </View>
            </View>
            <View style={{marginHorizontal: 15,}}>
                <View style={styles.input_inlet}>
                    <View style={styles.input_forms}>
                        <Text style={[styles.label_input,
                        { color: isEmailFocused ? 'green' : '#ECE2E2' }
                            ]}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}>
                            Email
                        </Text>
                        <TextInput
                            style={[
                                styles.text_input,
                                { borderColor: isEmailFocused ? 'green' : '#ECE2E2' }
                            ]}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                            placeholder=''
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>
                    <View style={styles.input_forms}>
                        <Text style={[styles.label_input, 
                        { color: isPasswordFocused ? 'green' : '#ECE2E2' }]}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}>
                            Password
                        </Text>
                        <TextInput
                            style={[
                                styles.text_input,
                                { borderColor: isPasswordFocused ? 'green' : '#ECE2E2' }
                            ]}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            secureTextEntry={true}
                            placeholder=''
                            value={password}
                            onChangeText={(e) => setPassword(e)}
                        />
                    </View>
                </View>
                <View style={styles.button_inlet}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.auth_button}
                        onPress={() => login(email, password)}>
                        <Text style={styles.auth_text}>LOG IN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.exteriorcontainer}>
                    <Text style={{fontSize: 14, fontWeight: '400', color: '#808080'}}>Don't have an account? </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.register_button}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.register_button_text}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
     maincontainer: {
        // flexDirection: 'column',
        width: 'auto',
        height: 'auto',
        backgroundColor: 'white',
        // backgroundColor: 'red'
    },
    inletcontainer: {
        // backgroundColor: '#6EB95B',
        // height: '20%',
        padding: '5%',
        paddingTop: '15%'
    },
    inletText: {
        // height: '100%',
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text_inner_title: {
        
    },
    inletheading: {
        alignItems: 'center',
        // marginTop: '50%',
    },
    outletcontainer: {
        marginTop: '10%',
        // alignItems: 'center',
        marginHorizontal: '5%',
        paddingBottom: '3%'
    },
    greeting_text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    greeting_sub_text: {
        fontSize: 15,
        color: 'lightgrey',
    },
    input_inlet: {
        marginTop: '5%',
    },
    input_forms: {
        justifyContent: 'space-around',
        marginTop: 10,
        // marginLeft: 25,
        // marginRight: 25,
    },
    label_input: {
        fontWeight: 'regular',
        color: '#ece2e2',
        fontSize: 17,
    },
    text_input: {
        height: 60,
        borderWidth: 2,
        borderColor: '#ECE2E2',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    button_inlet: {
        alignItems: 'center',
        marginTop: 25,
    },
    auth_button: {
        height: 60,
        backgroundColor: '#6EB95B',
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 5,
        // shadowOffset: {width: 0, height: 1},
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
        // fontWeight: 'bold', 
    },
    auth_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white', 
    
    },
    exteriorcontainer: {
        marginTop: '20%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',

    },
    register_button: {
        marginLeft: 5,
    },
    register_button_text: {
        color: '#6EB95B',
    }
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    // },
    // text_input: {
    //     height: 60,
    //     borderWidth: 1,
    //     borderColor: '#808080',
    //     backgroundColor: '#ffffff',
    //     borderRadius: 10,
    //     paddingHorizontal: 10,
    //     margin: 10,
    // },
    // title_section: {
    //     height: window_height * 0.4,
    //     justifyContent: 'flex-end',
    //     padding: 20,
    //     width: '100%',
    // },
    // greeting_title_text: {
    //     fontSize: 48,
    //     fontWeight: 'bold'
    // },
    // greeting_subtitle_text: {
    //     fontSize: 18,
    //     fontWeight: '300',
    //     color: '#808080'
    // },
    // form_section: {
    //     justifyContent: 'space-around',
    //     width: '100%',
    //     paddingHorizontal: 10
    // },
    // button_section: {
    //     width: '100%',
    //     alignItems: 'flex-end',
    //     padding: 20,
    //     paddingTop: 10
    // },
    // auth_button: {
    //     height: 50,
    //     backgroundColor: '#79AC78',
    //     borderRadius: 10,
    //     width: 150,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 5,
    //     shadowOffset: {width: 0, height: 1},
    //     shadowOpacity: 0.5,
    //     shadowRadius: 3
    // },
    // register_button: {

    // },
    // register_button_text: {
    //     color: '#79AC78',
    //     fontSize: 14,
    //     fontWeight: 'bold'
    // },
    // auth_button_text: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#ffffff'
    // },
    // bottom_section: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingTop: 60,
    //     paddingBottom: 20,
    // }
})