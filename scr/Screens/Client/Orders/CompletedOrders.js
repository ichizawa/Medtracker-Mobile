import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function CompletedOrders() {
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
      {/* place const here  */}
      {/* <FlatList style={styles.inner_container}> */}
          <TouchableOpacity style={styles.order_list_view}>
            <View style={styles.order_heading}>
              <View style={styles.order_upper_heading}>
                <View style={styles.order_upper_info}>
                  <Text style={{color: '#013237', fontWeight:'bold'}}>Name of Merchant</Text>
                  <Text style={{color: '#4CA771', fontWeight:'bold'}}>date format</Text>
                </View>
              </View>
              <View style={styles.order_upper_end_info}>
                  <Text style={[styles.order_upper_end_text, {fontWeight: 'bold', color: 'white'}]}>COMPLETED</Text>
                </View>
            </View>
            <View style={styles.order_mid_info}>
              <View style={styles.order_mid_end_info}>
                <View>
                  <Text style= {{color:'black', fontSize: 14, fontWeight:'bold'}}>Pangalan sa tambal</Text>
                </View>
              </View>
            </View>
            <View style={styles.order_lower_info}>
              <View style={{flex: 1}}>
                <Text style= {{color:'black', fontWeight:'bold', fontSize: 14}}>Payment Method: </Text>
              </View>
              <View>
                <Text style= {{color:'black', fontWeight:'bold'}}>
                  Total Bill: 
                </Text>
              </View>
            </View>
          </TouchableOpacity>
      {/* </FlatList> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inner_container: {
    marginVertical: 20,
    // padding: 20
  },
  order_list_view: {
    // flex: 1,
    backgroundColor: '#C0E6BA',
    width: '95%',
    height: 170,
    borderRadius: 10,
    // marginBottom: 25,
    marginVertical: '3%',
    padding: 13,
    alignSelf: 'center'
  },
  backdrop_shadow:{
    elevation: 5,
    shadowColor: '#52006A',
  },
  order_heading: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    // padding: 10,
  },
  order_upper_info: {
    
  },
  order_upper_end_info: {
    flex: 1,
    alignItems: 'flex-end',
    // alignContent: 'flex-end',
    // textAlign: 'right',
    // width: 100,
    // backgroundColor: 'white',
    // marginHorizontal: '10%'
    // justifyContent: 'space-between'
  },
  order_upper_end_text: {
      // flex: 1,
      backgroundColor: 'darkgreen',
      width: 100,
      textAlign: 'center',
      borderRadius: 50,
  },
  order_mid_info: {
    flex: 1,
    flexDirection: 'row',
    // marginVertical: 20,
    // alignItems: 'center',
    // height: '100%',
    // paddingTop: 5
    // backgroundColor: 'black'
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