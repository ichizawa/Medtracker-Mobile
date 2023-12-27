import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { format } from 'date-fns'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'

export default function OrderDetails({route, navigation}) {
    const {order_details} = route.params;
    const {userInfo} = useContext(AuthContext);
    const [orderDetails, setOrderDetails] = useState(null);

    const getOrderDetails = () => {
        try {
            fetch(`${BASE_URL}merchant/order-detail/${order_details.transaction_id}`, {
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
                //console.log(data.detail_order[0]);
                setOrderDetails(data.detail_order[0])
            })
        } catch (e) {
            console.log(e);
        }
    }
    const acceptProductOrder = (transaction_id, product_id, order_no) => {
        try {
            fetch(`${BASE_URL}merchant/update-item-status`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    transaction_id: transaction_id,
                    product_id: product_id,
                    order_no: order_no
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                console.log(data);
                getOrderDetails();
            })
        } catch (e) {
            console.log(e)
        }
    }
    const formatDate = (dt) => {
        var date = new Date(dt);
        var formattedDate = format(date, "MMM do h:mma");
        return formattedDate;
    }
    useEffect(() => {
        getOrderDetails();
        // console.log(order_details);
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => navigation.goBack()}
                >
                <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon}/>
                </TouchableOpacity>
                <Text style={styles.header_title}>{order_details.order_no}</Text>
                <View style={{width: 25, height: 25}}/>
            </View>
            <ScrollView>
                {orderDetails &&
                    <View style={{borderBottomWidth: 5, borderColor: '#f2f2f2'}}>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 5}}/>
                            <View style={{justifyContent: 'space-around', paddingLeft: 10}}>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{orderDetails.customer_name}</Text>
                                <Text style={{color: '#b2b2b2'}}>{formatDate(orderDetails.order_created)}</Text>
                            </View>
                        </View>
                        <View style={{padding: 10}}>
                            <Text style={{fontWeight: 'bold', color: '#b2b2b2', fontSize: 16, marginBottom: 10}}>Ordered Items</Text>
                            {orderDetails.items.map((product, index) => {
                                //console.log(product);
                                return (
                                    <View key={'product'+index} style={{paddingHorizontal: 10}}>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold', fontSize: 16, color: '#808080', marginBottom: 5}}>{product.product_name}</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#808080', marginBottom: 5}}>x{product.transaction_quantity}</Text>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>{'\u20B1'+product.transaction_price}</Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 30}}>
                                            <TouchableOpacity
                                                disabled={product.item_status === 'Pending' ? false : true}
                                                style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: product.item_status === 'Pending' ? '#79AC78' : '#b2b2b2', borderRadius: 5, flexDirection: 'row'}}
                                                onPress={() => acceptProductOrder(orderDetails.transaction_id, product.product_id, orderDetails.order_no)}
                                            >
                                                <Text style={{color: '#fff'}}>{product.item_status === 'Pending' ? 'Accept' : product.item_status}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })

                            }
                        </View>
                    </View>
                }
            </ScrollView>
        </View>
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
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menu_button: {
        height: 25,
        width: 25,
    },
        menu_icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    header_title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})