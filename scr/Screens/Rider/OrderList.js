import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { format } from 'date-fns'

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
            console.log(data.accepted_order);
            setOrders(data.accepted_order)
        })
    } catch (e) {
        console.log(e);
    }
  }
  const takeOrder = (order_id) => {
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
  const getTotal = (items) => {
    let total = 0
    items[0].items.map((product) => {
        total += parseFloat(product.transaction_price)
    })
    return total.toFixed(2);
  }
  const color = (status) => {
      if(status === 'Pending') {
          return '#f2be16'
      }
      if (status === 'Accepted') {
          return '#5d60e6'
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
                                      <View style={{width: 35, height: 35, backgroundColor: 'red', borderRadius: 5}}>

                                      </View>
                                      <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1}}>
                                          <Text style={{fontWeight: 'bold'}}>{item.customer_name}</Text>
                                          {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('Do MMM, h:mm a')}</Text> */}
                                          <Text numberOfLines={1} ellipsizeMode='tail' style={{color: '#b2b2b2', fontSize: 12}}>{item.address}</Text>
                                      </View>
                                  </View>
                                  <View style={{paddingLeft: 20, alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                      <Text style={{color: color(item.status), fontWeight: 'bold', letterSpacing: 3}}>{item.status.toUpperCase()}</Text>
                                      <Text style={{color: '#b2b2b2', fontSize: 12}}>{ '\u20B1' + getTotal(item.order)}</Text>
                                  </View>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row'}}>
                                  <View style={{width: 35, height: '100%'}}/>
                                  <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1, paddingVertical: 6}}>
                                      {item.order.map((order, index) => {
                                        return (
                                          <View key={index}>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={{marginTop: 10, marginBottom: 5, fontWeight: 'bold'}}>{order.merchant_name}</Text>
                                            {order.items.map((item, i) => {
                                              return (
                                                <Text key={i} numberOfLines={1} ellipsizeMode='tail' style={{marginVertical: 3}}>{item.product_name}</Text>
                                              )
                                            })}
                                          </View>
                                        )
                                      })}
                                  </View>
                              </View>
                              <View style={{flex: 1, flexDirection: 'row', width: '100%', paddingTop: 10}}>
                                <View style={{flex:1}}/>
                                <TouchableOpacity
                                  disabled={item.status === 'Accepted' ? false : true}
                                  activeOpacity={0.7}
                                  style={{
                                      paddingHorizontal: 20,
                                      paddingVertical: 10,
                                      borderRadius: 5,
                                      backgroundColor: item.status === 'Accepted' ? '#5d60e6' : '#b2b2b2'
                                  }}
                                  onPress={() => takeOrder(item.order_no)}
                                >
                                    <Text style={{color: '#fff'}}>Take Order</Text>
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
    borderBottomColor: '#f1f2f3'
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
      width: '100%',
      borderBottomWidth: 5,
      borderBottomColor: '#f1f2f3',
      padding: 20,
  }
})