import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import { format } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'

export default function OrderHistory() {
    const {userInfo} = useContext(AuthContext);
    const [pastOrders, setPastOrders] = useState(null);

    const getOrderHistory = () => {
        try {
            fetch(`${BASE_URL}merchant/my-customer-past-order-list`, {
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
                console.log(data);
                setPastOrders(data.past_order)
            })
        } catch (e) {
            console.log(e);
        }
    }
    const getTotal = (items) => {
        let total = 0
        items.map((product) => {
            total += parseFloat(product.transaction_price)
        })
        return total.toFixed(2);
    }
    const bgcolor = (status) => {
        if(status === 'Cancelled') {
            return 'red'
        }
        if(status === 'Completed') {
            return '#0766AD'
        }
    }
    const color = (status) => {
        if(status === 'Cancelled') {
            return 'white'
        }
        if(status === 'Completed') {
            return 'white'
        }
    }
    const formatDate = (dt) => {
        var date = new Date(dt);
        var formattedDate = format(date, "MMM do H:mma");
        return formattedDate;
    }

    useEffect(() => {
        getOrderHistory();
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
            {pastOrders ?
                    <FlatList
                        style={styles.inner_container}
                        data={pastOrders}
                        extraData={pastOrders}
                        renderItem={({item}) => {
                            return (
                                <View style={[styles.order_list_view, styles.backdrop_shadow]}>
                                    <View style={styles.order_heading}>
                                         <View style={styles.order_upper_heading}>
                                            {/* <View style={{width: 35, height: 35, backgroundColor: 'red', borderRadius: 5}}>

                                             </View> */}
                                             <View style={styles.order_center_heading}>
                                                 <Text style={{color: '#013237', fontWeight: 'bold', fontSize: 17}}>{item.customer_name}</Text>
                                                 {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('d MMM, h:mm a')}</Text> */}
                                                 <Text style={{color: '#4CA771', fontSize: 12, fontWeight: 'bold'}}>{formatDate(item.order_created)}</Text>
                                             </View>
                                         </View>
                                         <View style={styles.order_sub_heading}>
                                             <Text style={[styles.order_sub_text, {color: color(item.status), backgroundColor: bgcolor(item.status)}]}>{item.status.toUpperCase()}</Text>
                                             <Text style={{color: '#4CA771', fontSize: 12, fontWeight: 'bold'}}>{ '\u20B1' + getTotal(item.items)}</Text>
                                         </View>
                                     </View>
                                        <View style={styles.order_lower_heading}>
                                            <View style={{width: 35, height: '100%'}}/>
                                            <View style={styles.order_lower_sub_heading}>
                                                {item.items.map((product, index) => {
                                                    return (
                                                        <Text key={index} numberOfLines={1} ellipsizeMode='tail' style={{ fontWeight: 'bold', color: 'black'}}>{product.product_name}</Text>
                                                    )
                                                })}
                                        </View>
                                    </View>
                                </View>
                                // <View style={styles.order_list_view}>
                                //     <View style={{flex: 1, flexDirection: 'row'}}>
                                //         <View style={{flex: 1, flexDirection: 'row'}}>
                                //             <View style={{width: 35, height: 35, backgroundColor: 'red', borderRadius: 5}}>

                                //             </View>
                                //             <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1}}>
                                //                 <Text style={{fontWeight: 'bold'}}>{item.customer_name}</Text>
                                //                 {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('d MMM, h:mm a')}</Text> */}
                                //                 <Text style={{color: '#b2b2b2', fontSize: 12}}>{formatDate(item.order_created)}</Text>
                                //             </View>
                                //         </View>
                                //         <View style={{paddingHorizontal: 10,alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                //             <Text style={{color: color(item.status), fontWeight: 'bold', letterSpacing: 3}}>{item.status.toUpperCase()}</Text>
                                //             <Text style={{color: '#b2b2b2', fontSize: 12}}>{ '\u20B1' + getTotal(item.items)}</Text>
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
                                // </View>
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
        
    },
    inner_container: {
        marginVertical: 15,
        flex: 1,
        width: '100%',
        // flexDirection: 'row',
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
        marginBottom: 15,
    },
    order_center_heading: {
        justifyContent: 'space-between', 
        // paddingHorizontal: 10, 
        flex: 1,
        // marginBottom
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
        width: 100,
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
        // paddingVertical: 6
        // marginBottom: 20,
    }
    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff'
    // },
    // order_list_view: {
    //     width: '100%',
    //     borderBottomWidth: 5,
    //     borderBottomColor: '#f1f2f3',
    //     padding: 20
    // }
})