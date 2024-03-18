import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import Mapbox from '@rnmapbox/maps'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar'
import {FontAwesome} from '@expo/vector-icons'
Mapbox.setAccessToken('pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg');

export default function Profile({navigation}) {
  const {userInfo} = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [image, setImage] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const [isFirstFocused, setFirstFocused] = useState(false);
  const [isLastFocused, setLastFocused] = useState(false);
  const [isPhoneFocused, setPhoneFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isAddressFocused, setAddressFocused] = useState(false);

  const getCurrentLocation = async () => {
    setLongitude(null);
    setLatitude(null);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      getCurrentOrder();
    }
    let location = await Location.getCurrentPositionAsync({});
    setLongitude(location.coords.longitude);
    setLatitude(location.coords.latitude);
  }
  const getMyProfile = () => {
    try {
        fetch(`${BASE_URL}customer/my-profile`, {
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
            setFirstName(data.result.first_name);
            setLastName(data.result.last_name);
            setAddress(data.result.address);
            setPhoneNumber(data.result.contact_no);
            setLongitude(data.result.long);
            setLatitude(data.result.lat);
            setEmail(data.result.email);
        })
        .catch((e) => console.log(e))
    } catch (e) {
        console.log(e);
    }
  }
  const updateMyProfile = () => {
    try {
        fetch(`${BASE_URL}customer/update-customer-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              contact_no: phoneNumber,
              address: address,
              long: longitude,
              lat: latitude
            })
        })
        .then(processResponse)
        .then(res => {
            const {statusCode, data} = res;
            if(statusCode === 200) {
              alert(data.result);
              getMyProfile();
              setEditProfile(false);
            }
        })
        .catch(e => console.log(e))
    } catch (e) {
        console.log(e);
    }
  }
  // const updateMyProfiles = () => {
  //   try {
  //       fetch(`${BASE_URL}customer/update-profile`, {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': `Bearer ${userInfo.token}`
  //           },
  //           body: JSON.stringify({
              
  //           })
  //       })
  //       .then(processResponse)
  //       .then(res => {
  //           const {statusCode, data} = res;
  //           if(statusCode === 200) {
  //             alert(data);
  //             getMyProfile();
  //           }
  //           console.log(data);
  //       })
  //       .catch((e) => console.log(e))
  //   } catch (e) {
  //       console.log(e);
  //   }
  // }
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
      <StatusBar hidden = {false} translucent = {true}/>
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
        <View style={[styles.inner_form]}>
          <View style={[styles.profile_form]}>
              <View style={[styles.profile_image]}>
                {image ? 
                  <Image source={{uri: image}} style={{width: '100%', height: '100%', borderRadius: 100, resizeMode: 'contain'}}/>
                  :
                  <View style={{width: '100%', height: '100%', borderRadius: 100, borderWidth: 3, borderColor: 'green'}}/>
                }
              </View>
              <TouchableOpacity 
                onPress={() => {
                  pickImage()
                }}
                style={{flexDirection: 'row'}}>
              <View style={{alignSelf: 'flex-end', justifyContent: 'center', marginLeft: '75%', marginBottom: '5%', position: 'absolute', backgroundColor: 'white', borderRadius: 100, padding: 5}}>
                <FontAwesome name='camera' size={25}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
            <View style={{paddingBottom: 20}}>
              <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Info</Text>
            </View>
            <View style={{marginBottom: 20}}>
              <View>
                <Text style={{color: isFirstFocused ? 'green' : '#b2b2b2', fontWeight: 'bold'}}>First Name</Text>
                <TextInput value={firstName} style={[{borderWidth: 1.5,borderRadius: 10, borderColor: isFirstFocused ? 'green' : '#b2b2b2', fontSize: 18, paddingVertical: 10, paddingLeft: 10}]} editable={editProfile} onChangeText={(e) => setFirstName(e)}
                  onFocus={() => setFirstFocused(true)}
                  onBlur={() => setFirstFocused(false)}/>
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <View>
                <Text style={{color:isLastFocused ? 'green' : '#b2b2b2', fontWeight: 'bold'}}>Last Name</Text>
                <TextInput value={lastName} style={{borderWidth: 1.5, borderRadius:10,borderColor: isLastFocused ? 'green' : '#b2b2b2', fontSize: 18, paddingVertical: 10, paddingLeft: 10}} editable={editProfile} onChangeText={(e) => setLastName(e)}
                onFocus={() => setLastFocused(true)}
                onBlur={() => setLastFocused(false)}/>
              </View>
            </View>
            <View style={{marginBottom: 20}}>
              <View>
                <Text style={{color: isPhoneFocused ? 'green' : '#b2b2b2', fontWeight: 'bold'}}>Phone Number</Text>
                <TextInput value={phoneNumber} style={{borderWidth: 1.5, borderRadius:10,borderColor: isPhoneFocused ? 'green' : '#b2b2b2', fontSize: 18, paddingVertical: 10, paddingLeft: 10}} editable={editProfile} onChangeText={(e) => setPhoneNumber(e)}
                 onFocus={() => setPhoneFocused(true)}
                 onBlur={() => setPhoneFocused(false)}/>
              </View>
            </View>
            <View>
              <View>
                <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>Email</Text>
                <TextInput value={email} style={{borderWidth: 1.5, borderRadius:10,borderColor: 'grey', fontSize: 18, paddingVertical: 10, paddingLeft: 10}} editable={false}/>
              </View>
            </View>
          </View>
          <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20, }}>
            <View style={{paddingBottom: 10}}>
              <Text style={{color: isAddressFocused ? 'green' : '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Address</Text>
            </View>
            <TextInput value={address} selection={{start: editProfile === true ? address.length : 0, end: editProfile === true ? address.length : 0}} style={{borderWidth: 1.5, borderRadius:10,borderColor: isAddressFocused ? 'green' : '#b2b2b2', fontSize: 20, paddingVertical: 10, paddingLeft: 10}} editable={editProfile} onChangeText={(e) => setAddress(e)}
            onFocus={() => setAddressFocused(true)}
            onBlur={() => setAddressFocused(false)}/>
          </View>
          <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
            <View style={{paddingBottom: 20}}>
              <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Location</Text>
            </View>
            <View style={{width: '100%', height: 300}}>
              <Mapbox.MapView
                style={{flex: 1, width: '100%'}}
                logoEnabled={false}
                compassEnabled={false}
                attributionEnabled={false}
                onPress={(feature) => {
                  if(editProfile) {
                    setLongitude(null);
                    setLatitude(null);
                    setLongitude(feature.geometry.coordinates[0]);
                    setLatitude(feature.geometry.coordinates[1])
                  }
                }}
                zoomEnabled={false}
                // scaleBarEnabled={false}
                // scrollEnabled={false}
              >
                {longitude && latitude &&
                  <>
                    <Mapbox.Camera
                      zoomLevel={15}
                      centerCoordinate={[longitude, latitude]}
                      animationMode='flyTo'
                      animationDuration={2000}
                    />
                    <Mapbox.PointAnnotation
                      id="merchant-location"
                      coordinate={[longitude, latitude]}
                    />
                  </>
                }
              </Mapbox.MapView>
              {editProfile === true &&
                <View style={{width: 75, height: 75, position: 'absolute', bottom: 10, right: 10, padding: 5}}>
                  <TouchableOpacity
                    style={{width: '100%', height: '100%', borderRadius: (75-10)/2, backgroundColor: '#fff', elevation: 5, alignItems: 'center', justifyContent: 'center', padding: 15}}
                    onPress={() => getCurrentLocation()}
                  >
                    <Image source={require('../../../assets/location-crosshairs.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', tintColor: 'green'}}/>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
        {/* <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
          <View style={{paddingBottom: 10}}>
            <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>My Profile</Text>
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
            <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Info</Text>
          </View>
          <View style={{marginBottom: 30}}>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>First Name</Text>
              <TextInput value={firstName} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={editProfile} onChangeText={(e) => setFirstName(e)}/>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>Last Name</Text>
              <TextInput value={lastName} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={editProfile} onChangeText={(e) => setLastName(e)}/>
            </View>
          </View>
          <View style={{marginBottom: 30}}>
            <View>
              <Text style={{color: '#b2b2b2', fontWeight: 'bold'}}>Phone Number</Text>
              <TextInput value={phoneNumber} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={editProfile} onChangeText={(e) => setPhoneNumber(e)}/>
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
          <TextInput value={address} selection={{start: editProfile === true ? address.length : 0, end: editProfile === true ? address.length : 0}} style={{borderBottomWidth: 1, borderBottomColor: '#b2b2b2', fontSize: 20, paddingVertical: 10}} editable={editProfile} onChangeText={(e) => setAddress(e)}/>
        </View>
        <View style={{borderBottomColor: '#f2f2f2', borderBottomWidth: 5, padding: 20}}>
          <View style={{paddingBottom: 20}}>
            <Text style={{color: '#b2b2b2', fontSize: 20, fontWeight: 'bold'}}>Location</Text>
          </View>
          <View style={{width: '100%', height: 300}}>
            <Mapbox.MapView
              style={{flex: 1, width: '100%'}}
              logoEnabled={false}
              compassEnabled={false}
              attributionEnabled={false}
              onPress={(feature) => {
                if(editProfile) {
                  setLongitude(null);
                  setLatitude(null);
                  setLongitude(feature.geometry.coordinates[0]);
                  setLatitude(feature.geometry.coordinates[1])
                }
              }}
              zoomEnabled={false}
              // scaleBarEnabled={false}
              // scrollEnabled={false}
            >
              {longitude && latitude &&
                <>
                  <Mapbox.Camera
                    zoomLevel={15}
                    centerCoordinate={[longitude, latitude]}
                    animationMode='flyTo'
                    animationDuration={2000}
                  />
                  <Mapbox.PointAnnotation
                    id="merchant-location"
                    coordinate={[longitude, latitude]}
                  />
                </>
              }
            </Mapbox.MapView>
            {editProfile === true &&
              <View style={{width: 75, height: 75, position: 'absolute', bottom: 10, right: 10, padding: 5}}>
                <TouchableOpacity
                  style={{width: '100%', height: '100%', borderRadius: (75-10)/2, backgroundColor: '#fff', elevation: 5, alignItems: 'center', justifyContent: 'center', padding: 15}}
                  onPress={() => getCurrentLocation()}
                >
                  <Image source={require('../../../assets/location-crosshairs.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View> */}
      </ScrollView>
      {editProfile === true &&
        <TouchableOpacity
          style={{padding: 20, alignItems: 'center', backgroundColor: '#79AC78'}}
          onPress={() => updateMyProfile()}
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  inner_form: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  profile_form: {
    marginTop: '2%',
    alignSelf: 'center',
    padding: 10
  },
  profile_image: {
    height: 150,
    width: 150,
    flexDirection: 'column'
  }
})