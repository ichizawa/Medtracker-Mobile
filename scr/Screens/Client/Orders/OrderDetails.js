import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button } from 'react-native'
import React from 'react'
import { format } from 'date-fns'

export default function OrderDetails({route, navigation}) {
    const {order_details} = route.params

    const formatDate = (dt) => {
        var date = new Date(dt);
        var formattedDate = format(date, "MMM do h:mma");
        return formattedDate;
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => navigation.goBack()}
                >
                <Image source={require('../../../../assets/angle-left.png')} style={styles.menu_icon}/>
                </TouchableOpacity>
                <Text style={styles.header_title}>{order_details.order_no}</Text>
                <View style={{width: 25, height: 25}}/>
            </View>
            <ScrollView>
                {order_details &&
                    order_details.order.map((item, index) => {
                        console.log(item);
                        return (
                            <View key={index} style={{borderBottomWidth: 5, borderColor: '#f2f2f2'}}>
                                <View style={{flexDirection: 'row', padding: 10}}>
                                    <View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 5}}/>
                                    <View style={{justifyContent: 'space-around', paddingLeft: 10}}>
                                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.merchant_name}</Text>
                                        <Text style={{color: '#b2b2b2'}}>{formatDate(order_details.order_created)}</Text>
                                    </View>
                                </View>
                                <View style={{padding: 10}}>
                                    <Text style={{fontWeight: 'bold', color: '#b2b2b2', fontSize: 16, marginBottom: 10}}>Ordered Items</Text>
                                    {item.items.map((product, index) => {
                                        return (
                                            <View key={'product'+index} style={{paddingHorizontal: 10}}>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold', fontSize: 16, color: '#808080', marginBottom: 5}}>{product.product_name}</Text>
                                                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#808080', marginBottom: 5}}>x{product.transaction_quantity}</Text>
                                                    <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 5}}>{'\u20B1'+product.transaction_price}</Text>
                                                </View>
                                            </View>
                                        )
                                    })

                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            {order_details.payment_method === 'COP' &&
                <View style={{padding: 20}}>
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