import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { BASE_URL, processResponse } from '../../../config'
import { AuthContext } from '../../../context/AuthContext'
import { format } from 'date-fns'

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
            {acceptedOrders ?
                    <FlatList
                        data={acceptedOrders}
                        extraData={acceptedOrders}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    style={styles.order_list_view}
                                    onPress={() => navigation.navigate('ClientOrderDetails', {order_details: item})}
                                >
                                    <>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1}}>
                                                {item.order.map((item, index) => {
                                                    return (
                                                        <Text style={{fontWeight: 'bold'}} numberOfLines={1} ellipsizeMode='tail' key={'merchant'+index}>{item.merchant_name}</Text>
                                                    )
                                                })}
                                                <Text style={{color: '#b2b2b2', fontSize: 12}}>{formatDate(item.order_created)}</Text>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 10,alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                            <Text style={{color: '#5d60e6', fontWeight: 'bold', letterSpacing: 3}}>{item.status.toUpperCase()}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1, paddingVertical: 6}}>
                                            {item.order.map((product, index) => {
                                                return (
                                                    <View key={'order'+index}>
                                                        {product.items.map((item, index) => {
                                                            return (
                                                                <Text key={'product'+item.product_id} numberOfLines={1} ellipsizeMode='tail' style={{marginVertical: 3,color: '#b2b2b2', fontSize: 12}}>{item.product_name}</Text>
                                                            )
                                                        })}
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'flex-end', marginTop: 10}}>
                                        <Text style={{fontSize: 14, marginRight: 10, color: '#b2b2b2'}}>Total Bill:</Text>
                                        <Text style={{fontSize: 14, color: '#ff0000'}}>
                                            { '\u20B1' + getTotal(item.order)}
                                        </Text>
                                    </View>
                                    {item.payment_method === 'COP' &&
                                        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between', marginTop: 20, justifyContent: 'flex-end'}}>
                                            <TouchableOpacity
                                                style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: '#79AC78', borderRadius: 5, flexDirection: 'row'}}
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
        backgroundColor: '#fff'
    },
    order_list_view: {
        width: '100%',
        borderBottomWidth: 5,
        borderBottomColor: '#f1f2f3',
        padding: 20
    }
})