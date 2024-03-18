import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useEffect, useContext, useState} from 'react'
import { format } from 'date-fns'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'

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
            {/* <LinearGradient
                colors={['transparent','white']}
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0
                }}
            /> */}
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
            <ScrollView style={{height: '100%', width: '100%', marginVertical: 10}}>
                <View style={[styles.main_container]}>
                    <View style={[styles.upper_header]}>
                        <Text style={styles.txt_col}>This order is pending</Text>
                        <Text style={styles.txt_col}>Order is beiing prepared by the pharmacy.</Text>
                    </View>
                    </View>
                    {orderDetails && 
                        <View style={[styles.inner_container]}>
                            <View style={[styles.container_order_details]}>
                                <View style={[styles.upper_inner_container]}>
                                    <FontAwesome name='shopping-cart' size={20}/>
                                    <Text style={{marginLeft: '5%', fontSize: 16, fontWeight: 'bold'}}>
                                        Order Details
                                    </Text>
                                </View>
                                <View style={[styles.lower_inner_container]}>
                                    <Text>
                                        Customer Name - {order_details.customer_name}
                                    </Text>
                                    <Text style={{marginTop: 10}}>
                                        Date Ordered - {formatDate(orderDetails.order_created)}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.container_order_details]}>
                                <View style={[styles.upper_inner_container]}>
                                    <FontAwesome name='list-alt' size={20}/>
                                    <Text style={{marginLeft: '5%', fontSize: 16, fontWeight: 'bold'}}>
                                        Item Details
                                    </Text>
                                </View>
                                {orderDetails.items.map((product, index) => {
                                        return (
                                            <View key={'product'+index} >
                                                <View style={[styles.lower_inner_container, {justifyContent: 'space-between', flexDirection: 'row'}]}>
                                                    <Text style={{width: '80%'}}>{product.product_name}</Text>
                                                    <Text>x{product.transaction_quantity}</Text>
                                                </View> 
                                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10, marginTop: 15}}>
                                                    <TouchableOpacity
                                                        disabled={product.item_status === 'Pending' ? false : true}
                                                        style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: product.item_status === 'Pending' ? '#279EFF' : '#b2b2b2', borderRadius: 10, flexDirection: 'row'}}
                                                        onPress={() => acceptProductOrder(orderDetails.transaction_id, product.product_id, orderDetails.order_no)}
                                                    >
                                                        <Text style={{color: '#fff', fontWeight: 'bold'}}>{product.item_status === 'Pending' ? 'Accept' : product.item_status}</Text>
                                                    </TouchableOpacity>
                                                    {product.item_status === 'Pending' &&
                                                        <TouchableOpacity
                                                            disabled={product.item_status === 'Pending' ? false : true}
                                                            style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: product.item_status === 'Pending' ? 'darkred' : '#b2b2b2', borderRadius: 10, flexDirection: 'row', marginLeft: 10}}
                                                            onPress={() => alert('Being worked on.')}
                                                        >
                                                            <Text style={{color: '#fff', fontWeight: 'bold'}}>{product.item_status === 'Pending' ? 'Decline' : product.item_status}</Text>
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                            </View>
                                            
                                        );
                                    })
                                }
                            </View>
                            {/* <View style={[styles.container_order_details]}>
                                <View style={[styles.upper_inner_container]}>
                                    <FontAwesome name='shopping-cart' size={25}/>
                                    <Text style={{marginLeft: '5%', fontSize: 16, fontWeight: 'bold'}}>
                                        Ordered Items
                                    </Text>
                                </View>
                                <View style={[styles.lower_inner_container]}>
                                    <Text>
                                        Customer Name - {order_details.customer_name}
                                    </Text>
                                    <Text>
                                        Date Ordered - {formatDate(orderDetails.order_created)}
                                    </Text>
                                </View>
                            </View> */}
                        </View>
                    }
                {/* </View> */}
                {/* {orderDetails &&
                    <View style={[styles.main_container, styles.main_container_backdrop]}>
                        <View style={styles.upper_container}>
                            <View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 10}}/>
                            <View style={{paddingLeft: 10}}>
                                <Text style={{fontSize: 22, fontWeight: 'bold', color: '#013237'}}>{orderDetails.customer_name}</Text>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>{formatDate(orderDetails.order_created)}</Text>
                            </View>
                        </View>
                        <View style={styles.lower_container}>
                            <Text style={{fontWeight: 'bold', color: '#013237', fontSize: 16, marginBottom: 15, marginVertical: 20}}>Ordered Items</Text>
                            {orderDetails.items.map((product, index) => {
                                //console.log(product);
                                return (
                                    <View key={'product'+index} style={{paddingHorizontal: 0}}>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold', fontSize: 16, color: '#4CA771', marginBottom: 5}}>{product.product_name}</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black', marginBottom: 5}}>x{product.transaction_quantity}</Text>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: '#013237'}}>{'\u20B1'+product.transaction_price}</Text>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
                                            <TouchableOpacity
                                                disabled={product.item_status === 'Pending' ? false : true}
                                                style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: product.item_status === 'Pending' ? '#279EFF' : '#b2b2b2', borderRadius: 10, flexDirection: 'row'}}
                                                onPress={() => acceptProductOrder(orderDetails.transaction_id, product.product_id, orderDetails.order_no)}
                                            >
                                                <Text style={{color: '#fff', fontWeight: 'bold'}}>{product.item_status === 'Pending' ? 'Accept' : product.item_status}</Text>
                                            </TouchableOpacity>
                                            {product.item_status === 'Pending' &&
                                                <TouchableOpacity
                                                    disabled={product.item_status === 'Pending' ? false : true}
                                                    style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: product.item_status === 'Pending' ? 'darkred' : '#b2b2b2', borderRadius: 10, flexDirection: 'row', marginLeft: 10}}
                                                    onPress={() => alert('Being worked on.')}
                                                >
                                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>{product.item_status === 'Pending' ? 'Decline' : product.item_status}</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                )
                            })

                            }
                        </View>
                    </View>
                } */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    header:{
        flexDirection: 'row',
        width: '100%',
        marginBottom: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '9%',
        // paddingBottom: '2%'
    },
    menu_button: {
        height: 25,
        width: 25,
    },
    menu_icon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        // backgroundColor: 'black'
    },
    header_title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    main_container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#6EB95B',
        flexDirection: 'column',
        padding: 20,
        elevation: 15
    },
    upper_header: {
       height: 60,
       justifyContent: 'space-around'
    },
    inner_container: {
        flexDirection: 'column',
        paddingBottom: '100%',
    },
    upper_inner_container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    container_order_details: {
        // flexDirection: 'column',
        padding: 20,
        marginBottom: 5
        
    },
    lower_inner_container: {
        flexDirection: 'column',
        marginLeft: '12%',
        width: '85%',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    txt_col : {
        fontSize: 16,
        color: 'white'
    }

})