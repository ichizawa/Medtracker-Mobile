import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import { format } from 'date-fns'

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
    const color = (status) => {
        if(status === 'Cancelled') {
            return '#ff0000'
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
            {pastOrders ?
                    <FlatList
                        data={pastOrders}
                        extraData={pastOrders}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.order_list_view}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <View style={{width: 35, height: 35, backgroundColor: 'red', borderRadius: 5}}>

                                            </View>
                                            <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1}}>
                                                <Text style={{fontWeight: 'bold'}}>{item.customer_name}</Text>
                                                {/* <Text style={{color: '#b2b2b2', fontSize: 12}}>{Moment(item.order_created).format('d MMM, h:mm a')}</Text> */}
                                                <Text style={{color: '#b2b2b2', fontSize: 12}}>{formatDate(item.order_created)}</Text>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 10,alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                            <Text style={{color: color(item.status), fontWeight: 'bold', letterSpacing: 3}}>{item.status.toUpperCase()}</Text>
                                            <Text style={{color: '#b2b2b2', fontSize: 12}}>{ '\u20B1' + getTotal(item.items)}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{width: 35, height: '100%'}}/>
                                        <View style={{justifyContent: 'space-between', paddingHorizontal: 10, flex: 1, paddingVertical: 6}}>
                                            {item.items.map((product, index) => {
                                                return (
                                                    <Text key={index} numberOfLines={1} ellipsizeMode='tail' style={{marginVertical: 3}}>{product.product_name}</Text>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </View>
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