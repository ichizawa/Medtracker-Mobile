import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import React from 'react'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import {FontAwesome} from '@expo/vector-icons'

export default function OrderDetails({route, navigation}) {
    const {order_details} = route.params

    const formatDate = (dt) => {
        var date = new Date(dt);
        var formattedDate = format(date, "MMM do h:mma");
        return formattedDate;
    }
    const calculateTotalPrice = (items) => {
        let totalPrice = 0;
        
        items.forEach((product) => {
            totalPrice += parseFloat(product.transaction_price);
        });
        
        return totalPrice.toFixed(2);
    };
      
      
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
            <View style={styles.header}>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => navigation.goBack()}
                >
                <Image source={require('../../../../assets/angle-left.png')} style={styles.menu_icon}/>
                </TouchableOpacity>
                {/* <Text style={styles.header_title}>{order_details.order_no}</Text> */}
                <Text style={[styles.header_title]}>Order Details</Text>
                <View style={{width: 25, height: 25}}/>
            </View>
            
            <ScrollView style={{height: '100%', width: '100%', marginVertical: 10}}>
                <View style={[styles.upper_container]}>
                    <View style={[styles.upper_main_container]}>
                        <Text style={styles.text_col}>Your Order is being prepared</Text>
                        <Text style={styles.text_col}>Delivery attempt should be completed by </Text>
                    </View>
                </View>

                {order_details &&
                    order_details.order.map((item, index) => {
                        console.log(item);
                        return (
                            <View key={index} style={styles.inner_container}>
                                {/* <View style={[styles.upper_container]}>
                                    <View style={[styles.upper_main_container]}>
                                        <Text style={styles.text_col}>Your Order is being prepared</Text>
                                        <Text style={styles.text_col}>Delivery attempt should be completed by </Text>
                                    </View>
                                </View> */}
                                <View style={[styles.mid_main_container]}>
                                    <View style={[styles.order_information, {}]}>
                                        <View style={[styles.inter_text, {flexDirection: 'row'}]}>
                                            <FontAwesome style={styles.order_icon}
                                            name={'shopping-cart'} size={20}/>
                                            <Text style={styles.order_text}>{item.merchant_name}</Text>
                                        </View>
                                        <View style={styles.order_info}>
                                            {/* <Text>Order ID - {order_details.order_no}</Text> */}
                                            {/* <Text>Date Ordered - {formatDate(order_details.order_created)}</Text> */}

                                            <View style={{marginTop: 5, flexDirection: 'column'}}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <FontAwesome size={15} name={'list-alt'}/>
                                                    <Text style={{marginLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>Ordered Items</Text>
                                                </View>
                                                {item.items.map((product, index) => {
                                                    return (
                                                        <View key={'product'+index} style={{marginLeft: '15%', marginTop: 5}}>
                                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text numberOfLines={1} ellipsizeMode='tail'>{product.product_name}</Text>
                                                                <Text>x{product.transaction_quantity}</Text>
                                                            </View>
                                                            {/* <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                                <Text>Total Price</Text>
                                                                <Text>{'\u20B1' + product.transaction_price}</Text>
                                                            </View> */}
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    </View>

                                    {/* <View style={[styles.order_information, {marginTop: '10%',alignItems: 'center'}]}>
                                        {item.items.map((product, index) => {
                                            return (
                                                <View key={'product'+index} style={[styles.inter_text, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
                                                    <Text style={styles.order_text}>Total Price</Text>
                                                    <Text>{'\u20B1' + product.transaction_price}</Text>
                                                </View>
                                            );
                                        })}
                                    </View> */}
                                    <View style={[styles.order_information, {marginTop: '10%', alignItems: 'center'}]}>
                                        <View style={[styles.inter_text, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
                                            <Text style={styles.order_text}>Total Price</Text>
                                            <Text>{'\u20B1' + calculateTotalPrice(item.items)}</Text>
                                            
                                        </View>
                                    </View>


                                    <View style={[styles.order_information, {marginTop: 50}]}>
                                        <View style={[styles.inter_text, {flexDirection: 'row'}]}>
                                            <FontAwesome style={styles.order_icon}
                                            name={'map-marker'} size={20}/>
                                            <Text style={styles.order_text}>Location Information</Text>
                                        </View>
                                        <View style={{marginTop:5, flexDirection:'column', marginLeft: '11%'}}>
                                            <View style={[styles.location_info, {}]}>
                                                <FontAwesome name={'home'} size={20}/>
                                                <Text style={{marginLeft: 10, fontSize: 15, width: '80%'}}>{item.merchant_address}</Text>
                                            </View>

                                            {/* <View style={[styles.location_info, {}]}>
                                                <FontAwesome name={'home'} size={20}/>
                                                <Text style={{marginLeft: 15, fontSize: 15}}>Address sa user</Text>
                                            </View> */}
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={[{flexDirection: 'row', padding: 10}]}>
                                    <View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 5}}/>
                                    <View style={{justifyContent: 'space-around', paddingLeft: 10}}>
                                        <Text style={{color: '#013237',fontSize: 16, fontWeight: 'bold'}}>{item.merchant_name}</Text>
                                        <Text style={{color: '#4CA771'}}>{formatDate(order_details.order_created)}</Text>
                                    </View>
                                </View> */}
                                {/* <View style={{padding: 10}}>
                                    <Text style={{fontWeight: 'bold', color: '#013237', fontSize: 16, marginBottom: 10}}>Ordered Items</Text>
                                    {item.items.map((product, index) => {
                                        return (
                                            <View key={'product'+index} style={{paddingHorizontal: 10}}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold', fontSize: 16, color: '#4CA771', marginBottom: 5}}>{product.product_name}</Text>
                                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#013237', marginBottom: 5}}>x{product.transaction_quantity}</Text>
                                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#013237'}}>{'\u20B1'+product.transaction_price}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                    }
                                </View> */}
                            </View>
                        )
                    })
                }
            </ScrollView>
            {order_details.payment_method === 'COP' && 
                <View  style={{padding: 20}}>
                    <TouchableOpacity
                        style={{paddingHorizontal:20, paddingVertical: 10, backgroundColor: '#79AC78', borderRadius: 5, flexDirection: 'row'}}
                        // onPress={() => navigation.navigate('GetOrderDirections', {order_details: item})}
                        onPress={() => console.log(item)}
                    >
                        <Image source={require('../../../../assets/diamond-turn-right.png')} style={{width: 20, height: 20, tintColor: '#fff', marginRight: 10, resizeMode: 'contain'}}/>
                        <Text style={{color: '#fff'}}>Get Directions</Text>
                    </TouchableOpacity>
                </View>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    header:{
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '15%',
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
    },
    upper_container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#6EB95B',
        flexDirection: 'column',
        padding: 20,
        elevation: 15,
    },
    upper_main_container: {
        height: 60,
        justifyContent: 'space-around'
    },
    text_col: {
        color: 'white',
        fontSize: 16,
        // fontWeight: 'bold'
    },
    mid_main_container: {
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'grey',
        // borderRadius: 25,
        width:'97%',
        alignSelf:'center'
        
    },
    order_information: {
        marginTop: 10,
        // marginBottom: '40%',
        flexDirection: 'column',
        
    },
    inter_text: {
        flex: 1,
    },
    order_text: {
        paddingHorizontal: 5,
        fontSize: 16,
        fontWeight: '700',
        // borderBottomWidth: 
    },
    order_icon: {
        paddingBottom: 15,
        textAlign: 'center',
        width: '10%',
    },
    order_info: {
        marginHorizontal: '12%',
    },
    location_info: {
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 15,
        // borderBottomWidth: 15,
    }

})