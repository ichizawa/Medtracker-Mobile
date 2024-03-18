import { StyleSheet, Text, View, Dimensions, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { BASE_URL, processResponse } from './config';
import { AuthContext } from './context/AuthContext';

const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;



export default function Register({navigation}) {
    // const {register} = useContext(AuthContext);

    const [isFnameFocussed, sestFnameFocused] = useState(false);
    const [isLnameFocused, setLnameFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [isConfirmPassFocused, setConfiirmPassFocussed] = useState(false);

    return (
        <ScrollView style={{flexGrow: 1, backgroundColor: '#fff'}} automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.title_section}>
                <View>
                    <Text style={styles.greeting_title_text}>Create <Text style={{color: '#6EB95B'}}>Account</Text></Text>
                </View>
                <View>
                    <Text style={styles.greeting_subtitle_text}></Text>
                </View>
            </View>
            <View style={styles.form_section}>
                <View>
                    <TextInput
                        style={[styles.text_input, { borderColor: isFnameFocussed ? '#6EB95B' : '#ECE2E2' }]}
                        onFocus={() => sestFnameFocused(true)}
                        onBlur={() => sestFnameFocused(false)}
                        placeholder='FIRST NAME'
                    />
                </View>
                <View>
                    <TextInput
                        style={[styles.text_input, { borderColor: isLnameFocused ? '#6EB95B' : '#ECE2E2' }]}
                        onFocus={() => setLnameFocused(true)}
                        onBlur={() => setLnameFocused(false)}
                        placeholder='LAST NAME'
                    />
                </View>
                <View>
                    <TextInput
                        style={[styles.text_input, { borderColor: isEmailFocused ? '#6EB95B' : '#ECE2E2' }]}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        placeholder='USERNAME / EMAIL'
                    />
                </View>
                <View>
                    <TextInput
                        style={[styles.text_input, { borderColor: isPasswordFocused ? '#6EB95B' : '#ECE2E2' }]}
                        secureTextEntry={true}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                        placeholder='PASSWORD'
                    />
                </View>
                <View>
                    <TextInput
                        style={[styles.text_input, { borderColor: isConfirmPassFocused ? '#6EB95B' : '#ECE2E2' }]}
                        secureTextEntry={true}
                        onFocus={() => setConfiirmPassFocussed(true)}
                        onBlur={() => setConfiirmPassFocussed(false)}
                        placeholder='CONFIRM PASSWORD'
                    />
                </View>
            </View>
            <View style={styles.button_section}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.auth_button}
                    // onPress={() => register(email, password)}
                    >
                    <Text style={styles.auth_button_text}>REGISTER</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom_section}>
                <Text style={{fontSize: 14, fontWeight: '400', color: '#808080'}}>Already have an account? </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.register_button}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.register_button_text}>Login</Text>
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
      borderWidth: 2,
      borderColor: '#ECE2E2',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      paddingHorizontal: 10,
      margin: 10,
  },
  title_section: {
      height: window_height * 0.2,
      justifyContent: 'flex-end',
      padding: 20,
      width: '100%',
  },
  greeting_title_text: {
      fontSize: 38,
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
      paddingTop: '20%'
  },
  auth_button: {
      height: 50,
      backgroundColor: '#6EB95B',
      borderRadius: 10,
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
    //   elevation: 5,
    //   shadowOffset: {width: 0, height: 1},
    //   shadowOpacity: 0.5,
    //   shadowRadius: 3
  },
  register_button: {

  },
  register_button_text: {
      color: '#6EB95B',
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
      paddingTop: 50,
      paddingBottom: 20,
  }
})