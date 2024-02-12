import { StyleSheet, Text, View, ScrollView, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL, processResponse } from '../../config';
import {LinearGradient} from 'expo-linear-gradient';

export default function Clinics() {
  const {userInfo} = useContext(AuthContext);
  const [pharmacyList, setPharmacyList] = useState([]);

  const getMerchants = () => {
    try {
        fetch(`${BASE_URL}merchant-list`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify({})
        })
        .then(processResponse)
        .then(res => {
            const {statusCode, data} = res;
            setPharmacyList(data.result);
        })
        .catch((e) => console.log(e))
    } catch (e) {
        console.log(e);
    }
  }
  useEffect(() => {
    getMerchants();
  },[])
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['transparent','#D0E7D2']}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      />
      <ScrollView>
        <View style={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10}}>
          <Text style={{fontSize: 20, color: '#b2b2b2', marginBottom: 10}}>Hello {userInfo.details.first_name},</Text>
          <Text style={{fontWeight: 'bold', fontSize: 32}}>Find Clinics</Text>
        </View>
        <View style={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10}}>
            <View style={{backgroundColor: '#fff', height: 70, elevation: 5, borderRadius: 5, flexDirection: 'row'}}>
                <View style={{padding: 20, height: 70, width: 70}}>
                    <Image source={require('../../../assets/search.png')} style={{height: '100%', width: '100%', resizeMode: 'contain', tintColor: '#b2b2b2'}}/>
                </View>
                <TextInput style={{flex: 1, height: '100%', fontSize: 24}} placeholder='Search Clinic'/>
            </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
            <Text style={{fontSize: 20, color: '#b2b2b2'}}>Clinics near you</Text>
          </View>
          <View>
            {pharmacyList.length > 0 ?
                    pharmacyList.map((item, index) => {
                        return (
                            <View key={index} style={{padding: 10, marginBottom: 10, backgroundColor: '#fff', elevation: 5, borderRadius: 5}}>
                                <View style={{flexDirection: 'row', flex: 1, marginBottom: 10}}>
                                    <View style={{height: 70, width: 70, marginRight: 10}}>
                                        <View style={{height: '100%', width: '100%', backgroundColor: '#f2f2f2', borderRadius: 5}}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text>{item.merchant_name}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
                                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', marginRight: 20}}>
                                        <Image source={require('../../../assets/diamond-turn-right.png')} style={{width: 15, height: 15, resizeMode: 'contain', marginRight: 5, tintColor: '#b2b2b2'}}/>
                                        <View style={{flex: 1}}>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{color: '#b2b2b2'}}>{item.address}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            style={{paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#44b678', borderRadius: 5}}
                                            onPress={() => console.log(`Longitude: ${item.long} Latitude: ${item.lat}`)}
                                        >
                                            <>
                                                <Image source={require('../../../assets/diamond-turn-right.png')} style={{width: 20, height: 20, resizeMode: 'contain', marginRight: 5, tintColor: '#44b678'}}/>
                                                <Text style={{fontWeight: 'bold', color: '#44b678'}}>Directions</Text>
                                            </>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                :
                    null
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})