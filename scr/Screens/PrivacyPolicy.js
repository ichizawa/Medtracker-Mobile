import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import {BASE_URL, processResponse}  from '../config'
import { AuthContext } from '../context/AuthContext'
import { WebView } from 'react-native-webview'

export default function PrivacyPolicy({navigation}) {
  const {userInfo} = useContext(AuthContext);
  const [privacyPolicy, setPrivacyPolicy] = useState(null);

  const getPrivacyPolicy = () => {
    try {
      fetch(`${BASE_URL}admin/get-current-privacy-policy`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}`
        },
      })
      .then(processResponse)
      .then(res => {
          const {statusCode, data} = res;
          setPrivacyPolicy(`<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${data.result}</body></html>`);
      })
      .catch((e) => console.log(e))
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getPrivacyPolicy();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity
          underlayColor={'#fff'}
          activeOpacity={0.2}
          style={styles.menu_button}
          onPress={() => navigation.goBack()}
          >
          <Image source={require('../../assets/angle-left.png')} style={styles.menu_icon}/>
          </TouchableOpacity>
          <Text style={styles.header_title}>Privacy Policy</Text>
          <View style={styles.menu_button}/>
      </View>
      {privacyPolicy &&
        <WebView
          //style={styles.container}
          automaticallyAdjustContentInsets={false}
          originWhitelist={['*']}
          source={{ html:  privacyPolicy}}
        />
      }
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
      paddingBottom: 20,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 5,
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
  }
})