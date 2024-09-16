import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar';

export default function OrderList({navigation}) {
  const {userInfo} = useContext(AuthContext);
  const [orders, setOrders] = useState(null);

  const orderList = () => {
    try {
        fetch(`${BASE_URL}rider/product-items`, {
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
            setOrders(data.accepted_order)
        })
    } catch (e) {
        console.log(e);
    }
  }
  const userOrdersTake = (order_id) => {
  console.log(userInfo.details.id);
      console.log(order_id);
      try {
          fetch(`${BASE_URL}rider/assigned-order/${order_id}`, {
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
              console.log(data)
              orderList();
          })
      } catch (e) {
          console.log(e);
      }
  }
  const takeOrder = (items, order_id ) => {
    let totalItems = 0;
    items.order.map((items) => {
      items.items.map((item) => {
        totalItems += parseFloat(item.transaction_price);
      });
    });

    try {
      fetch(`${BASE_URL}rider/check-cart-points/${userInfo.details.user_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        }
      })
        .then(processResponse)
        .then((res) => {
          const { statusCode, data } = res;
          if(statusCode === 200){
            if(data.result !== null && data.result.current_points >= totalItems){
              const rider_totalPTS = data.result.current_points;

              checkoutController(rider_totalPTS, items, order_id, totalItems);

            }else{
              alert('Not enough points');
            }
          }
        });
    } catch (e) {
      console.log(e);
    }
   
  }

  const checkoutController = async (riderpts, orders, order_id, totalprice) => {
    try {
        await fetch(`${BASE_URL}rider/pay-merchant-points`, {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'Authorization': `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({
                order_specs: orders.order.map((merchant) => {
                    return {
                        merchant_name: merchant.merchant_name,
                        items: merchant.items.map((item) => {
                            return {
                                product_id: item.product_id,
                                product_name: item.product_name,
                                product_price: item.product_price,
                                product_quantity: item.product_quantity,
                                transaction_price: item.transaction_price
                            }
                        })
                    }
                }),
                order_id: order_id,
                rider_totalPTS: riderpts,
                total_price: totalprice
            })
          })
            .then(processResponse)
            .then((res) => {
                const { statusCode, data } = res;
                console.log(data.result);
                userOrdersTake(order_id);
                alert('Order Successfully Accepted!');
        });
    } catch (e) {
        console.log(e);
    }
}

  const getTotal = (items) => {
    //console.log(items);
    let total = 0
    items.map((merchant) => {
      merchant.items.map((item) => {
        //console.log(item.transaction_price);
        total += parseFloat(item.transaction_price);
      })
    })
    return total.toFixed(2);
  }
  const color = (status) => {
      if(status === 'Pending') {
          return 'white'
      }
      if (status === 'Accepted') {
          return 'white'
      }
  }
  const bgcolor = (status) => {
    if(status === 'Pending') {
        return 'lightgrey'
    }
    if (status === 'Accepted') {
        return 'green'
    }
}
  const formatDate = (dt) => {
      var date = new Date(dt);
      var formattedDate = format(date, "MMM do H:mma");
      return formattedDate;
  }

  useEffect(() => {
    orderList()
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar hidden = {false} translucent = {true}/>
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
      <View style={styles.header}>
        <TouchableOpacity
        activeOpacity={0.7}
        style={styles.menu_button}
        onPress={() => navigation.goBack()}
        >
        <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon_left}/>
        </TouchableOpacity>
          <Text style={styles.header_title}>Available Orders</Text>
          <View style={styles.menu_button}/>
      </View>
      <View style={{flex: 1}}>
      {orders ?
              <FlatList
                  data={orders}
                  extraData={orders}
                  renderItem={({item}) => {
                      return (
                          <View style={styles.order_list_view}>
                              <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View style={{flex: 1, flexDirection: 'row'}}>
                                      {/* <View style={{width: 35, height: 35, backgroundColor: 'red', borderRadius: 5}}>

                                      </View> */}
                                      <View style={{justifyContent: 'space-between', paddingHorizontal: 0, flex: 1}}>
                                          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#013237'}}>{item.customer_name}</Text>
                                          {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('Do MMM, h:mm a')}</Text> */}
                                          <Text numberOfLines={1} ellipsizeMode='tail' style={{color: '#013237', fontSize: 12}}>{item.address}</Text>
                                      </View>
                                  </View>
                                  <View style={{paddingLeft: 20, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                      <Text style={[styles.status_heading,{backgroundColor: bgcolor(item.status), color: color(item.status), fontWeight: 'bold'}]}>{item.status.toUpperCase()}</Text>
                                      {/* <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>{ '\u20B1' + getTotal(item.order)}</Text> */}
                                  </View>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View style={{width: 'auto', height: '100%'}}/>
                                  <View style={{justifyContent: 'space-between', flex: 1, paddingVertical: 6}}>
                                      {item.order.map((order, index) => {
                                        return (
                                          <View key={index}>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{marginTop: 15, fontWeight: 'bold', color: '#013237'}}>{order.merchant_name}</Text>
                                            {order.items.map((item, i) => {
                                              return (
                                                <Text key={i} numberOfLines={1} ellipsizeMode='tail' style={{marginVertical: 0, color: '#013237'}}>{item.product_name}</Text>
                                              )
                                            })}
                                          </View>
                                        )
                                      })}
                                  </View>
                              </View>
                              <View style={{alignItems: 'flex-end', marginVertical: 0}}>
                                <Text style={{color: '#013237', fontSize: 14, fontWeight: 'bold'}}>Total Bll: { '\u20B1' + getTotal(item.order)}</Text>
                              </View>
                              <View style={{alignItems: 'flex-end', marginVertical: 0}}>
                              <Text style={{color: '#013237', fontSize: 14, fontWeight: 'bold'}}>Service fee: ₱100.00</Text>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', width: '100%', paddingTop: 10}}>
                                <View style={{flex:1}}/>
                                <TouchableOpacity
                                  disabled={item.status === 'Accepted' ? false : true}
                                  activeOpacity={0.7}
                                  style={{
                                      paddingHorizontal: 20,
                                      paddingVertical: 10,
                                      borderRadius: 10,
                                      backgroundColor: item.status === 'Accepted' ? '#0766AD' : '#b2b2b2'
                                  }}
                                  onPress={() => {
                                    // console.log(item)
                                    takeOrder(item, item.order_no);
                                  }}
                                >
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>Take Order</Text>
                                </TouchableOpacity>
                              </View>
                          </View>
                      )
                  }}
              />
          :
              null
      }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  header:{
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 5,
    borderBottomColor: '#f1f2f3',
    paddingTop: '13%'
  },
  header_title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  menu_button: {
    height: 20,
    width: 20,
  },
  menu_icon_right: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  menu_icon_left: {
      width: '90%',
      height: '90%',
      resizeMode: 'contain',
  },
  order_list_view: {
      // width: '100%',
      // borderBottomWidth: 5,
      // borderBottomColor: '#f1f2f3',
      // padding: 20,
      marginVertical: 10,
      backgroundColor: '#C0E6BA',
      padding: 20,
      // paddingBottom: -50,
      marginHorizontal: 10,
      borderRadius: 20,
  },
  status_heading: {
    // backgroundColor: 'green',
    borderRadius: 50, 
    // padding: 'auto',
    width: 100,
    textAlign: 'center',
  }
})