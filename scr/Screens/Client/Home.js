import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL, processResponse } from '../../config';
import {LinearGradient} from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  const {userInfo} = useContext(AuthContext);
  const [categoryList, setCategoryList] = useState([]);
  const [pharmacyList, setPharmacyList] = useState([]);
  const getCategories = () => {
    try {
        fetch(`${BASE_URL}category-list`, {
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
            setCategoryList(data.product);
            //console.log(data);
        })
        .catch((e) => console.log(e))
    } catch (e) {
        console.log(e);
    }
  }
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
  const useGenerateRandomColor = () => {
    let color = Math.random().toString(16).substr(-6);
    return `#${color}`;
  };
  useEffect(() => {
    getCategories();
    getMerchants();
  },[])
  return (

    <View style={styles.container}>
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
      <ScrollView>
        <View style={styles.main_header}>
          <Text style={styles.header_user_text}>Hello <Text style={{fontWeight: 'bold'}}>{userInfo.details.first_name},</Text></Text>
          <Text style={styles.header_user_subtext}>Find your medicines</Text>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
            <Text style={styles.sub_menus}>Browse by category</Text>
            <Text style={styles.sub_menus_btn}>View all</Text>
          </View>
          <FlatList
            horizontal={true}
            data={categoryList}
            ItemSeparatorComponent={() => {
              return (
                <View style={{marginRight: 10}}/>
              )
            }}
            
            extraData={categoryList}
            renderItem={({item}) => {
              return (
                <View style={{height: 175, width: 150, borderRadius: 10, backgroundColor: useGenerateRandomColor()}}>
                  <View style={{padding: 20}}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{color: '#fff', fontSize: 18, textShadowColor: 'red', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}}>{item.desc}</Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
            <Text style={styles.sub_menus}>Browse by Pharma</Text>
            <Text style={styles.sub_menus_btn}>View all</Text>
          </View>
          <FlatList
            horizontal={true}
            data={pharmacyList}
            ItemSeparatorComponent={() => {
              return (
                <View style={{marginRight: 10}}/>
              )
            }}
            extraData={pharmacyList}
            renderItem={({item}) => {
              return (
                <View style={{height: 75, width: 200, borderRadius: 10, backgroundColor: '#fff', flexDirection: 'row'}}>
                  <View style={{width: 75, backgroundColor: '#c2c2c2', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                  
                  </View>
                  <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5}}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold'}}>{item.merchant_name}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{color: '#b2b2b2'}}>{item.address}</Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginHorizontal: 20,
  
  },
  main_header: {
    backgroundColor: '#6EB95B',
    paddingHorizontal: 20, 
    paddingTop: '10%', 
    paddingBottom: '10%',
    elevation: 2,
    shadowOffset: {width: 0, height: 100},
    shadowOpacity: 5,
    shadowRadius: 50,
  },
  header_user_text: {
    marginTop: 10,
    fontSize: 20, 
    color: 'white', 
  },
  header_user_subtext: {
    fontWeight: 'bold', 
    fontSize: 32,
    color: 'white',
  },
  sub_menus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B2B1B9'
  },
  sub_menus_btn: {
    fontSize: 18, 
    color: '#DDDDDD', 
    fontWeight: 'bold',
  },
})