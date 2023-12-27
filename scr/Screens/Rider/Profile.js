import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import * as ImagePicker from 'expo-image-picker'

export default function Profile({navigation}) {
  const {userInfo} = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const getMyProfile = () => {
    try {
        fetch(`${BASE_URL}rider/rider-profile`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
            //body: JSON.stringify({})
        })
        .then(processResponse)
        .then(res => {
            const {statusCode, data} = res;
            console.log(data.result);
            setFirstName(data.result.first_name);
            setLastName(data.result.last_name);
            setAddress(data.result.address);
            setPhoneNumber(data.result.contact_no);
            setEmail(data.result.email);
        })
        .catch((e) => console.log(e))
    } catch (e) {
        console.log(e);
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
        quality: 0.8,
    });
    if (!result.canceled) {
        setImage('data:image/webp;base64,'+result.assets[0].base64);
    } else {
        console.log('canceled');
    }
}
  useEffect(() => {
    getMyProfile();
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
            <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon}/>
          </TouchableOpacity>
          <Text style={styles.header_title}>Edit Profile</Text>
          <TouchableOpacity
          underlayColor={'#fff'}
          activeOpacity={0.2}
          style={styles.menu_button}
          onPress={() => setEditProfile(!editProfile)}
          >
            <Image source={require('../../../assets/file-edit.png')} style={styles.menu_icon}/>
          </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
          <View style={{paddingBottom: 10}}>
            <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Store Profile</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{height: 150, width: 150}}>
              {image ?
                  <Image source={{uri: image}} style={{width: '100%', height: '100%', borderRadius: 10, resizeMode: 'contain'}}/>
                :
                  <View style={{width: '100%', height: '100%', borderRadius: 10, backgroundColor: '#f2f2f2'}}/>
              }
            </View>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => pickImage()}
              >
                <>
                  <Image source={require('../../../assets/camera.png')} style={{width: 25, height: 25, resizeMode: 'contain', marginRight: 10, tintColor: '#79AC78'}}/>
                  <Text style={{fontWeight: 'bold', color: '#79AC78'}}>Upload Photo</Text>
                </>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
          <View style={{paddingBottom: 20}}>
            <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Rider Info</Text>
          </View>
          <View style={{marginBottom: 30}}>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>First Name</Text>
              <TextInput value={firstName} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={false}/>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>Last Name</Text>
              <TextInput value={lastName} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={false}/>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>Phone Number</Text>
              <TextInput value={phoneNumber} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={false}/>
            </View>
          </View>
          <View>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>Email</Text>
              <TextInput value={email} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={false}/>
            </View>
          </View>
        </View>
        <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
          <View style={{paddingBottom: 20}}>
            <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Address</Text>
          </View>
          <TextInput value={address} selection={{start: 0, end: 0}} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={false}/>
        </View>
      </ScrollView>
      {editProfile === true &&
        <TouchableOpacity
          style={{padding: 20, alignItems: 'center', backgroundColor: '#79AC78'}}
          onPress={() => console.log('pressed')}
        >
          <Text style={{color: '#fff'}}>Update Profile</Text>
        </TouchableOpacity>
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