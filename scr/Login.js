import { StyleSheet, Text, View, Dimensions, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from './context/AuthContext';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;

export default function Login({ navigation }) {
    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView style={{flexGrow: 1, backgroundColor: '#fff'}} automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.title_section}>
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
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text_input: {
        height: 60,
        borderWidth: 1,
        borderColor: '#808080',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 10,
        margin: 10,
    },
    title_section: {
        height: window_height * 0.4,
        justifyContent: 'flex-end',
        padding: 20,
        width: '100%',
    },
    greeting_title_text: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    greeting_subtitle_text: {
        fontSize: 18,
        fontWeight: '300',
        color: '#808080'
    },
    form_section: {
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10
    },
    button_section: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 20,
        paddingTop: 10
    },
    auth_button: {
        height: 50,
        backgroundColor: '#79AC78',
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
    register_button: {

    },
    register_button_text: {
        color: '#79AC78',
        fontSize: 14,
        fontWeight: 'bold'
    },
    auth_button_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    bottom_section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 20,
    }
})