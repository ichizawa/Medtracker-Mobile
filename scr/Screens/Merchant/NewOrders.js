import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'

export default function NewOrders({navigation}) {
    const {userInfo} = useContext(AuthContext);
    const [newOrders, setNewOrders] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getNewOrders = () => {
        try {
            fetch(`${BASE_URL}merchant/my-customer-new-order-list`, {
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
                setNewOrders(data.new_order);
                setIsFetching(false);
            })
        } catch (e) {
            console.log(e);
        }
    }
    // const acceptOrder = (orderId) => {
    //     try {
    //         fetch(`${BASE_URL}merchant/update-status/${orderId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${userInfo.token}`
    //             }
    //         })
    //         .then(processResponse)
    //         .then(res => {
    //             const {statusCode, data} = res;
    //             getNewOrders();
    //             console.log(data);
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
    const getTotal = (items) => {
        let total = 0
        items.map((product) => {
            total += parseFloat(product.transaction_price)
        })
        return total.toFixed(2);
    }
    const bgcolor = (status) => {
        if(status === 'Pending') {
            return '#f2be16'
        }
        if (status === 'Accepted') {
            return '#0766AD'
        }
    }
    const color = (status) => {
        if(status === 'Pending') {
            return 'white'
        }
        if (status === 'Accepted') {
            return 'white'
        }
    }
    const formatDate = (dt) => {
        var date = new Date(dt);
        var formattedDate = format(date, "MMM do H:mma");
        return formattedDate;
    }

    useEffect(() => {
        getNewOrders();
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
            {newOrders ?
                    <FlatList
                        style={styles.inner_container}
                        data={newOrders}
                        extraData={newOrders}
                        onRefresh={() => getNewOrders()}
                        refreshing={isFetching}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity 
                                    style={[styles.order_list_view, styles.backdrop_shadow]}
                                    onPress={() => navigation.navigate('MerchantOrderDetails', {order_details: item})}>
                                    <View style={styles.order_heading}>
                                         <View style={styles.order_upper_heading}>
                                            {/* <View style={{width: '30%', height: '100%', backgroundColor: 'red', borderRadius: 5}}>
                                                OPTIONAL TO PUT USERS IMAGE HERE
                                             </View> */}
                                             <View style={styles.order_center_heading}>
                                                 <Text style={{color: '#013237', fontWeight: '800', fontSize: 17}}>{item.customer_name}</Text>
                                                 {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('Do MMM, h:mm a')}</Text> */}
                                                 <Text style={{color: '#4CA771', fontSize: 12, fontWeight: 'bold'}}>{formatDate(item.order_created)}</Text>
                                             </View>
                                         </View>
                                         <View style={styles.order_sub_heading}>
                                             <Text style={[styles.order_sub_text, {color: color(item.status), backgroundColor: bgcolor(item.status)}]}>{item.status.toUpperCase()}</Text>
                                             <Text style={{color: '#013237', fontSize: 12, fontWeight: 'bold'}}>{ '\u20B1' + getTotal(item.items)} - {item.payment_method}</Text>
                                         </View>
                                     </View>
                                     <View style={styles.order_lower_heading}>
                                         <View style={{width: 35, height: '100%'}}/>
                                            <View style={styles.order_lower_sub_heading}>
                                             {item.items.map((product, index) => {
                                                return (
                                                    <Text key={index} numberOfLines={1} ellipsizeMode='tail' style={{marginVertical: 3, fontWeight: 'bold', color: '#013237'}}>{product.product_name}</Text>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                // <TouchableOpacity
                                //     style={styles.order_list_view}
                                //     onPress={() => navigation.navigate('MerchantOrderDetails', {order_details: item})}
                                // >
                                //     <View style={[styles.heading_item, {flex: 1, flexDirection: 'row'}]}>
                                //         <View style={{flex: 1, flexDirection: 'row'}}>
                                //             <View style={{width: 35, height: 35, backgroundColor: 'red', borderRadius: 5}}>

                                //             </View>
                                //             <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1}}>
                                //                 <Text style={{fontWeight: 'bold'}}>{item.customer_name}</Text>
                                //                 {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('Do MMM, h:mm a')}</Text> */}
                                //                 <Text style={{color: '#b2b2b2', fontSize: 12}}>{formatDate(item.order_created)}</Text>
                                //             </View>
                                //         </View>
                                //         <View style={{paddingHorizontal: 10,alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                //             <Text style={{color: color(item.status), fontWeight: 'bold', letterSpacing: 3}}>{item.status.toUpperCase()}</Text>
                                //             <Text style={{color: '#b2b2b2', fontSize: 12}}>{ '\u20B1' + getTotal(item.items)} - {item.payment_method}</Text>
                                //         </View>
                                //     </View>
                                //     <View style={{flex: 1, flexDirection: 'row'}}>
                                //         <View style={{width: 35, height: '100%'}}/>
                                //         <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1, paddingVertical: 6}}>
                                //             {item.items.map((product, index) => {
                                //                 return (
                                //                     <Text key={index} numberOfLines={1} ellipsizeMode='tail' style={{marginVertical: 3}}>{product.product_name}</Text>
                                //                 )
                                //             })}
                                //         </View>
                                //     </View>
                                // </TouchableOpacity>
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
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    inner_container: {
        // backgroundColor: 'red',
        flex: 1,
        width: '100%',
        marginVertical: 15,
        // justifyContent: 'center'
        // alignItems: 'center',
    },
    order_list_view: {
        alignSelf: 'center',
        flex: 1,
        backgroundColor: '#C0E6BA',
        height: 140,
        width: '95%',
        borderRadius: 10,
        marginBottom: 15,
    },
    backdrop_shadow:{
        elevation: 5,
        shadowColor: '#52006A',
    },
    order_heading: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
    },
    order_upper_heading: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 15
    },
    order_center_heading: {
        justifyContent: 'space-between', 
        // paddingHorizontal: 10, 
        flex: 1
    },
    order_sub_heading: {
        paddingHorizontal: 10,
        alignItems: 'flex-end', 
        justifyContent: 'space-between'
    },
    order_sub_text: {
        fontWeight: 'bold', 
        // letterSpacing: 2,
        borderRadius: 25,
        width: 90,
        height: 20,
        textAlign: 'center',
    },
    order_lower_heading: {
        flex: 1, 
        flexDirection: 'row'
    },
    order_lower_sub_heading: {
        // justifyContent: 'space-between', 
        // paddingHorizontal: 10,
        // flex: 1, 
        width: '80%'
        // paddingVertical: 6
    }
})