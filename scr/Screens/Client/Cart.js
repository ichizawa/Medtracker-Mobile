import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'

export default function Cart() {
    const {userInfo} = useContext(AuthContext);
    const [cartItem, setCartItem] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [orderType, setOrderType] = useState(null);
    const [serviceFee, setServiceFee] = useState(40.00);
    //const [mapPoints, setMapPoints] = useState([]);
    const getCart = (payment_method) => {
        try {
            fetch(`${BASE_URL}cart/cart-item`, {
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
                if(statusCode === 200 && data.cart_items.length > 0) {
                    setCartItem(data.cart_items);
                    getStorePoints(data.cart_items, payment_method);
                } else {
                    setCartItem(null);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    const getStorePoints = (cart, payment_method) => {
        let map_points = [];
        cart.map((item) => {
            //console.log('stores: ' + item.long, item.lat);
            //setMapPoints(oldArray => [...oldArray, {long: item.long, lat: item.lat}])
            map_points.push({long: item.long, lat: item.lat});
        })
        //console.log('user: ' + userInfo.details.long, userInfo.details.lat);
        //setMapPoints(oldArray => [...oldArray, {long: userInfo.details.long, lat: userInfo.details.long}]);
        map_points.push({long: userInfo.details.long, lat: userInfo.details.lat});
        getDistanceFee(map_points, payment_method);
    }
    const getDistanceFee = (map_points, payment_method) => {
        if(map_points.length > 0) {
            try {
                map_points.map((item, index) => {
                    if(index === 0) {
                    points = item.long + '%2C' + item.lat
                    } else {
                    points = points + '%3B' + item.long + '%2C' + item.lat //
                    }
                })
                fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${points}?alternatives=false&continue_straight=false&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(processResponse)
                .then(res => {
                    const {statusCode, data} = res;
                    const distance = (data.routes[0].distance / 1000).toFixed(1);
                    //console.log(distance);
                    if(payment_method === 'COD') {
                        if(distance > 3) {
                            let fee = (distance - 3) * 12;
                            fee += 40;
                            setServiceFee(parseFloat(fee.toFixed(2)));
                        } else {
                            setServiceFee(40.00);
                        }
                    } else {
                        setServiceFee(0.00);
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
    const updateQuantity = (cart_id, quantity, price) => {
        try {
            fetch(`${BASE_URL}cart/update-quantity/${cart_id}/${quantity}/${price}`, {
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
                if(statusCode === 200) {
                    getCart(paymentMethod);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    const checkOut = () => {
        try {
            fetch(`${BASE_URL}transaction/add-order`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    product: cartItem,
                    order_type: orderType,
                    payment_method: paymentMethod,
                    service_fee: serviceFee,
                    created_at: getCurrentDateTime(),
                    updated_at: getCurrentDateTime()
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                console.log(data);
                if(statusCode === 200) {
                    alert(data.success);
                    removeAllItems();
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    const removeAllItems = () => {
        let ids = [];
        const cart_id = cartItem.map((item) => {
            return item.cart_ids
        })
        cart_id.map((item) => {
            //const id_s = item.spit(',')
            if(item.length > 0) {
                let splitString = item.split(',');
                splitString.map((id) => {
                    ids.push(id);
                })
            }
        })
        try {
            fetch(`${BASE_URL}cart/remove-all-cart`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    cart_id: ids
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                getCart(paymentMethod);
                console.log(data)
            })
        } catch (e) {
            console.log(e);
        }
    }
    const getCurrentDateTime = () => {
        const date = new Date();
        const dateToday = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`
        return dateToday;
    }
    const ToggleButton = ({type, typeDescripton, typeSubDescription, activeColor, customStyle, orderType}) => {
        return (
            <TouchableOpacity
                style={[customStyle,{borderColor: type === paymentMethod && activeColor ? activeColor : '#b2b2b2'}]}
                onPress={() => {
                    setPaymentMethod(type);
                    setOrderType(orderType);
                    getCart(type);
                }}
            >
                <Text style={{color: type === paymentMethod && activeColor ? activeColor : null, fontWeight: 'bold'}}>{typeDescripton}</Text>
                <Text style={{color: '#b2b2b2'}}>{typeSubDescription}</Text>
            </TouchableOpacity>
        )
    }
    const getSubtotal = () => {
        let total = 0;
        if(cartItem !== null) {
            cartItem.map((item) => {
                total += parseFloat(item.total_price);
            })
            return total.toFixed(2);
        }
        return total.toFixed(2);
    }
    useEffect(() => {
        getCart(paymentMethod);
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menu_button}/>
                <Text style={styles.header_title}>My Cart</Text>
                <TouchableOpacity
                    style={styles.menu_button}
                    onPress={() => removeAllItems()}
                >
                    <Image source={require('../../../assets/trash.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', tintColor: '#ff0000'}}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                {cartItem ?
                        <FlatList
                            data={cartItem}
                            extraData={cartItem}
                            renderItem={({item, index}) => {
                                return (
                                    <View style={{backgroundColor: '#fff', borderBottomWidth: 5, borderBottomColor: '#f1f2f3'}}>
                                        <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                                            <View style={{width: 70, height: 70}}>
                                                <Image source={require('../../../assets/medicine.png')} style={{resizeMode: 'contain', width: '100%', height: '100%'}}/>
                                            </View>
                                            <View style={{flex: 1, marginLeft: 10}}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{flex: 1, justifyContent: 'center', paddingRight: 50}}>
                                                        <Text numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                                                    </View>
                                                    <View style={{width: 30}}>
                                                        {item.is_prescription_required === 1 ?
                                                                <Image source={require('../../../assets/file-prescription.png')} style={{resizeMode: 'contain', width: '100%', height: '100%', tintColor: '#2dc4f4'}}/>
                                                            :
                                                                <Image source={require('../../../assets/file-prescription.png')} style={{resizeMode: 'contain', width: '100%', height: '100%', tintColor: '#b2b2b2'}}/>
                                                        }
                                                    </View>
                                                </View>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                                        <TouchableOpacity
                                                            underlayColor={'#fff'}
                                                            style={{width: 20, height: 20}}
                                                            onPress={() => updateQuantity(item.id, (item.quantity - 1), item.price)}
                                                        >
                                                            <Image source={require('../../../assets/minus-circle.png')} style={{resizeMode: 'contain', width: '100%', height: '100%', tintColor: '#79AC78'}}/>
                                                        </TouchableOpacity>
                                                        <TextInput editable={false} style={{marginHorizontal: 5, textAlign: 'center'}} value={item.id === cartItem[index].id ? cartItem[index].total_quantity.toString() : "1"}/>
                                                        <TouchableOpacity
                                                            underlayColor={'#fff'}
                                                            style={{width: 20, height: 20}}
                                                            onPress={() => updateQuantity(item.id, (item.quantity + 1), item.price)}
                                                        >
                                                            <Image source={require('../../../assets/add.png')} style={{resizeMode: 'contain', width: '100%', height: '100%', tintColor: '#79AC78'}}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{justifyContent: 'center'}}>
                                                        <Text>{'\u20B1'}{item.total_price}</Text>
                                                    </View>
                                                </View>
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
            <View style={{
                width: '100%',
                backgroundColor: '#f1f2f3',
                bottom: 0,
            }}>
                <View style={{padding: 10}}>
                    <View style={{marginBottom: 10}}>
                        <Text  style={{fontSize: 18, fontWeight: 'bold'}}>Select Payment Method</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <ToggleButton type={'COD'} activeColor={'#79AC78'} orderType={'Delivery'} typeDescripton='Cash On Delivery' typeSubDescription={'For Delivery'} customStyle={{borderWidth: 1, paddingHorizontal: 30, paddingVertical: 20, borderRadius: 5, marginRight: 10}}/>
                        <ToggleButton type={'COP'} activeColor={'#79AC78'} orderType={'Pickup'} typeDescripton='Cash On Pickup' typeSubDescription={'For Pickup'} customStyle={{borderWidth: 1, paddingHorizontal: 30, paddingVertical: 20, borderRadius: 5}}/>
                    </View>
                </View>
                <View style={{borderTopWidth: 1, borderColor: '#b2b2b2'}}>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', color: '#b2b2b2'}}>Subtotal</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{'\u20B1'}{getSubtotal()}</Text>
                    </View>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', color: '#b2b2b2'}}>Service Fee</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{'\u20B1'}{getSubtotal() > 0 ? serviceFee.toFixed(2) : 0.00}</Text>
                    </View>
                    <View style={{height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', color: '#b2b2b2'}}>Amount Payable</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{'\u20B1'}{getSubtotal() > 0 ? (parseFloat(getSubtotal()) + parseFloat(serviceFee.toFixed(2))).toFixed(2) : 0.00}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    disabled={cartItem !== null && paymentMethod !== null ? (cartItem.length > 0 ? false : true) : true}
                    underlayColor={'#f1f2f3'}
                    activeOpacity={0.2}
                    style={{backgroundColor: cartItem !== null && paymentMethod !== null ? (cartItem.length > 0 ? '#79AC78' : '#b2b2b2') : '#b2b2b2', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => checkOut()}
                >
                    <Text style={{color: '#fff'}}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
        backgroundColor: '#fff',
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 5,
        borderBottomColor: '#f1f2f3',
        paddingHorizontal: 10
    },
    menu_button: {
        height: 30,
        width: 30,
    },
    menu_icon_right: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
        tintColor: '#808080'
    },
    menu_icon_left: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        tintColor: '#87b5eb'
    },
    header_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    product_title: {
        fontSize: 14,
        fontWeight: '600',
    },
    add_product: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#99DFB2',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_input: {
        width: '100%',
        //height: 45,
        backgroundColor: '#f1f2f3',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
})