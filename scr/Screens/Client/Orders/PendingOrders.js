import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { BASE_URL, processResponse } from '../../../config'
import { AuthContext } from '../../../context/AuthContext'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'

export default function PendingOrders({navigation}) {
    const {userInfo} = useContext(AuthContext);
    const [pendingOrders, setPendingOrders] = useState(null);

    const getPendingOrders = () => {
      try {
          fetch(`${BASE_URL}customer/pending-transaction`, {
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
              setPendingOrders(data.pending_order)
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
      var formattedDate = format(date, "MMM do h:mma");
      return formattedDate;
    }

    useEffect(() => {
      getPendingOrders();
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
            {pendingOrders ?
                    <FlatList
                        style={styles.inner_container}
                        data={pendingOrders}
                        extraData={pendingOrders}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.order_list_view, styles.backdrop_shadow]}
                                    onPress={() => 
                                        navigation.navigate('ClientOrderDetails', {order_details: item})
                                        //alert(JSON.stringify(item))
                                    }
                                >
                                    <>
                                    
                                        <View style={styles.order_heading}>
                                            <View style={styles.order_upper_heading}>
                                                <View style={styles.order_upper_info}>
                                                    {item.order.map((item, index) => {
                                                        return (
                                                            <Text style={{fontWeight: 'bold', color: '#013237'}} numberOfLines={1} ellipsizeMode='tail' key={'merchant'+index}>{item.merchant_name}</Text>
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
                                                            {product.items.map((item, index) => {
                                                                return (
                                                                    <Text key={'product'+item.product_id} numberOfLines={1} ellipsizeMode='tail' style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>{item.product_name}</Text>
                                                                )
                                                            })}
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                        <View style={styles.order_lower_info}>
                                            <View style={{flex: 1}}>
                                                <Text style={{fontSize: 14, marginRight: 10, color: 'black'}}>Payment Method: 
                                                <Text style={{color: 'black'}}> {item.payment_method}</Text></Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{fontSize: 14, marginRight: 10, color: 'black'}}>Total Bill:</Text>
                                                <Text style={{fontSize: 14, color: '#013237'}}>
                                                    { '\u20B1' + (parseFloat(getTotal(item.order)) + parseFloat(item.service_fee)).toFixed(2)}
                                                </Text>
                                            </View>
                                        </View>
                                        {item.payment_method === 'COP' &&
                                            // <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginTop: 20, justifyContent: 'flex-end'}}>
                                            //     <TouchableOpacity
                                            //         style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: '#79AC78', borderRadius: 5, flexDirection: 'row'}}
                                            //         onPress={() => navigation.navigate('GetOrderDirections', {order_details: item})}
                                            //         //onPress={() => console.log(item)}
                                            //     >
                                            //         <Image source={require('../../../../assets/diamond-turn-right.png')} style={{width: 20, height: 20, tintColor: '#fff', marginRight: 10, resizeMode: 'contain'}}/>
                                            //         <Text style={{color: '#fff'}}>Get Directions</Text>
                                            //     </TouchableOpacity>
                                            // </View>
                                            <View style={[styles.order_lower_info, {}]}>
                                                <View>
                                                    <TouchableOpacity 
                                                        style={{flex: 1, paddingHorizontal: 15, backgroundColor: '#79AC78', borderRadius: 5, flexDirection: 'row', alignItems: 'center'}}
                                                        onPress={() => navigation.navigate('GetOrderDirections', {order_details: item})}>
                                                    
                                                        <Image source={require('../../../../assets/diamond-turn-right.png')} style={{width: 15, height: 15, tintColor: '#fff', resizeMode: 'contain'}}/>
                                                        <Text style={{color: '#fff'}}> Get Directions</Text>
                                                    </TouchableOpacity>
                                                </View>
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
        // marginVertical: 20,
        alignItems: 'center',
    },
    inner_container: {
        marginVertical: 10,
        width: '100%',

    },
    order_list_view: {
        alignSelf: 'center',
        flex: 1,
        backgroundColor: '#C0E6BA',
        width: '95%',
        height: 170,
        borderRadius: 10,
        marginBottom: 15,
        padding: 13
    },
    backdrop_shadow:{
        elevation: 5,
        shadowColor: '#52006A',
    },
    order_heading: {
        flexDirection: 'row',
        // flex: 1,
        // padding: 10,
    },
    order_upper_heading: {
        flex: 1,
        // flexDirection: 'row',
        // marginLeft: 10,
    },
    order_upper_info: {
        justifyContent: 'space-around', 
        // paddingHorizontal: 20, 
        // flex: 1
    },
    order_upper_end_info: {
        alignItems: 'flex-end',
        // marginHorizontal: '10%'
        // justifyContent: 'space-between'
    },
    order_upper_end_text: {
        backgroundColor: '#f2be16',
        width: 80,
        textAlign: 'center',
        borderRadius: 50,
    },
    order_mid_info: {
        flex: 1, 
        flexDirection: 'row',
        // marginVertical: 20,
        alignItems: 'center',
        height: '100%',
        paddingTop: 5,
        width: '95%'
        // backgroundColor: 'black'
    },
    order_mid_end_info: {
        justifyContent: 'space-between', 
        // paddingHorizontal: 15, 
        flex: 1,
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