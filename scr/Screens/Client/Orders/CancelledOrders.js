import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'

export default function CancelledOrders() {
  return (
    <View style={[styles.container, styles.backdrop_shadow]}>
      <LinearGradient
          colors={['transparent','lightgreen']}
          style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0
          }}
      />
      <TouchableOpacity style={styles.order_list_view}>
            <View style={styles.order_heading}>
              <View style={styles.order_upper_heading}>
                <View style={styles.order_upper_info}>
                  <Text style={{color: '#013237', fontWeight:'bold'}}>Name of Merchant</Text>
                  {/* <FontAwesome name='facebook-square' size={50}></FontAwesome> */}
                  <Text style={{color: '#4CA771', fontWeight:'bold'}}>date format</Text>
                </View>
              </View>
              <View style={styles.order_upper_end_info}>
                  <Text style={[styles.order_upper_end_text, {fontWeight: 'bold', color: 'white'}]}>CANCELLED</Text>
                </View>
            </View>
            <View style={styles.order_mid_info}>
              <View style={styles.order_mid_end_info}>
                <View>
                  <Text style= {{color:'black', fontWeight:'bold'}}>Pangalan sa tambal</Text>
                </View>
              </View>
            </View>
            <View style={styles.order_lower_info}>
              <View style={{flex: 1}}>
                <Text style= {{color:'black', fontWeight:'bold'}}>Payment Method: </Text>
              </View>
              <View>
                <Text style= {{color:'black', fontWeight:'bold'}}>
                  Total Bill: 
                </Text>
              </View>
            </View>
          </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  order_list_view: {
    backgroundColor: '#C0E6BA',
    width: '95%',
    height: 170,
    borderRadius: 10,
    marginVertical: '3%',
    padding: 13,
    alignSelf: 'center'
  },
  order_heading: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  order_upper_end_info: {
    flex: 1,
    alignItems: 'flex-end'
  },
  order_upper_end_text : {
    backgroundColor: 'red',
    borderRadius: 15,
    width: 100,
    textAlign: 'center',
  },
  order_mid_info: {
    flex: 1,
    flexDirection: 'row',
  },
  order_mid_end_info: {
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    flex: 1,
    marginVertical: 5
    // paddingVertical: 6,
},
  order_lower_info: {
    flex: 1, 
    flexDirection: 'row', 
    // paddingHorizontal: 10, 
    justifyContent: 'flex-end',
    // marginTop: 10
    // paddingTop: 20,
  },
})
