import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { BASE_URL, processResponse } from '../../../config'
import { AuthContext } from '../../../context/AuthContext'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'

export default function AcceptedOrders({navigation}) {
    const {userInfo} = useContext(AuthContext);
    const [acceptedOrders, setAcceptedOrders] = useState(null);

    const getAcceptedOrders = () => {
      try {
          fetch(`${BASE_URL}customer/accepted-transaction`, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userInfo.token}`
              }
          })
          .then(processResponse)
          .then(res => {
              const {statusCode, data} = res;
              //console.log(data.accepted_order[0])
              setAcceptedOrders(data.accepted_order);
          })
      } catch (e) {
          console.log(e);
      }
    }
    const getTotal = (orders) => {
        let total = 0
        orders.map((order) => {
            order.items.map((item) => {
                total += parseFloat(item.transaction_price)
            })
        })
        return total.toFixed(2);
    }
    const formatDate = (dt) => {
      var date = new Date(dt);
      var formattedDate = format(date, "MMM do H:mma");
      return formattedDate;
    }

    useEffect(() => {
      getAcceptedOrders();
    }, [])
    return (
        <View style={styles.container}>
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
            {acceptedOrders ?
                    <FlatList
                        style={styles.inner_container}
                        data={acceptedOrders}
                        extraData={acceptedOrders}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.order_list_view, styles.backdrop_shadow]}
                                    onPress={() => navigation.navigate('ClientOrderDetails', {order_details: item})}
                                >
                                    <>
                                    <View style={styles.date_heading}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{justifyContent: 'space-between', paddingHorizontal: 0, flex: 1}}>
                                                {item.order.map((item, index) => {
                                                    return (
                                                        <Text style={{fontWeight: 'bold'}} numberOfLines={1} ellipsizeMode='tail' key={'merchant'+index}>{item.merchant_name}</Text>
                                                    )
                                                })}
                                                <Text style={{color: '#4CA771', fontSize: 12}}>{formatDate(item.order_created)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.order_upper_end_info}>
                                            <Text style={[styles.order_upper_end_text, {color: 'white', fontWeight: 'bold'}]}>{item.status.toUpperCase()}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.order_mid_info}>
                                        <View style={styles.order_mid_end_info}>
                                            {item.order.map((product, index) => {
                                                return (
                                                    <View key={'order'+index}>
                                                        {product.items.slice(0,1).map((item, index) => {
                                                            return (
                                                                <Text key={'product'+item.product_id} numberOfLines={1} ellipsizeMode='tail' style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>{item.product_name}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    
                                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'flex-end', marginTop: 0}}>
                                        <Text style={{fontSize: 14, marginRight: 10, color: 'black'}}>Total Bill:</Text>
                                        <Text style={{fontSize: 14, color: '#013237'}}>
                                            { '\u20B1' + getTotal(item.order)}
                                        </Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'flex-end', marginTop: 0}}>
                                        <Text style={{fontSize: 14, marginRight: 10, color: 'black'}}>Service Fee:</Text>
                                        <Text style={{fontSize: 14, color: '#013237'}}>
                                            { '\u20B1' + getTotal(item.order)}
                                        </Text>
                                    </View>
                                    {item.payment_method === 'COP' &&
                                        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginTop: 20, justifyContent: 'flex-end'}}>
                                            <TouchableOpacity
                                                style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: '#79AC78', borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                                                onPress={() => navigation.navigate('GetOrderDirections', {order_details: item})}
                                                //onPress={() => console.log(item)}
                                            >
                                                <Image source={require('../../../../assets/diamond-turn-right.png')} style={{width: 20, height: 20, tintColor: '#fff', marginRight: 10, resizeMode: 'contain'}}/>
                                                <Text style={{color: '#fff'}}>Get Directions</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    </>
                                </TouchableOpacity>
                            )
                        }}
                    />
                :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    inner_container: {
        marginVertical: 10,
        width: '100%',
        // padding: 20
    },
    order_list_view: {
        alignSelf: 'center',
        flex: 1,
        backgroundColor: '#C0E6BA',
        width: '95%',
        height: 180,
        borderRadius: 10,
        marginBottom: 25,
        padding: 13
    },
    backdrop_shadow:{
        elevation: 5,
        shadowColor: '#52006A',
    },
    date_heading: {
        flexDirection: 'row',
        // flex: 1,
        paddingBottom: 20,
        // marginVertical: 20,
        // backgroundColor: 'red'
    },
    center_heading: {
        flex: 2, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'white'
    },
    order_upper_end_info: {
        alignItems: 'flex-end',
    },
    order_upper_end_text: {
        backgroundColor: 'blue',
        width: 90,
        textAlign: 'center',
        borderRadius: 50,
    },
    order_mid_info: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    order_mid_end_info: {
        // backgroundColor: 'red',
        justifyContent: 'space-between', 
        // marginHorizontal: 10,
        // paddingVertical: 20,
        flex: 1,
    },
    order_lower_info: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
    },
})