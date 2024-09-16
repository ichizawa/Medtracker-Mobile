import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import { StatusBar } from 'expo-status-bar';
//alert('View uploaded prescription.')
import * as ImagePicker from 'expo-image-picker'
import SyncStorage from 'sync-storage';

export default function Cart() {
    const {userInfo} = useContext(AuthContext);
    const [cartItem, setCartItem] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [orderType, setOrderType] = useState('Delivery');
    const [serviceFee, setServiceFee] = useState(40.00);
    //const [mapPoints, setMapPoints] = useState([]);
    const [image, setImage] = useState(null);
    const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);

    const [storeFee, setStoreFee] = useState(0);
    const [merchants, setMerchants] = useState([]);
    const [prescriptionRequired, setPrescriptionRequired] = useState(0);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setImage('data:image/webp;base64,'+result.assets[0].base64);
            setPrescriptionUploaded(true);
        } else {
            console.log('canceled');
        }
    }
    const getCart = async (payment_method) => {
        try {
            await fetch(`${BASE_URL}cart/cart-item`, {
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
                let merchant_list = [];
                let itemsInCart = [];
                if(statusCode === 200 && data.cart_items.length > 0) {
                    data.cart_items.map((item) => {
                        // itemsInCart.push(item);

                        if(merchant_list.find(element => element === item.merchant_name) !== undefined) {
                            console.log('1 record found');
                        } else {
                            merchant_list.push(item.merchant_name);
                        }
                        ////
                        if(item.is_prescription_required) {
                            setPrescriptionRequired(item.is_prescription_required);
                        }
                    })
                    // SyncStorage.set('itemsInCart', JSON.stringify(itemsInCart));
                    
                    setMerchants(merchant_list);
                    setCartItem(data.cart_items);
                    getStorePoints(data.cart_items, payment_method, merchant_list);
                } else {
                    setCartItem(null);
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    const getStorePoints = (cart, payment_method, merchant_list) => {
        let map_points = [];
        cart.map((item) => {
            //console.log('stores: ' + item.long, item.lat);
            //setMapPoints(oldArray => [...oldArray, {long: item.long, lat: item.lat}])
            map_points.push({long: item.long, lat: item.lat});
        })
        //console.log('user: ' + userInfo.details.long, userInfo.details.lat);
        //setMapPoints(oldArray => [...oldArray, {long: userInfo.details.long, lat: userInfo.details.long}]);
        map_points.push({long: userInfo.details.long, lat: userInfo.details.lat});
        getDistanceFee(map_points, payment_method, merchant_list);
    }
    const getDistanceFee = async (map_points, payment_method, merchant_list) => {
        if(map_points.length > 0) {
            try {
                map_points.map((item, index) => {
                    if(index === 0) {
                    points = item.long + '%2C' + item.lat
                    } else {
                    points = points + '%3B' + item.long + '%2C' + item.lat //
                    }
                })
                await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${points}?alternatives=false&continue_straight=false&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg`, {
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
                    if(payment_method === 'COD') {
                        if(distance > 3) {
                            let fee = (distance - 3) * 12;
                            fee += 40;
                            merchant_list.map((item) => {
                                fee += 10;
                            })
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
    const updateQuantity = (cart_id, quantities, transaction) => {
        let id = cart_id.includes(",") ? cart_id.split(",")[0] : cart_id;
        let qty = quantities.includes(",") ? quantities.split(",")[0] : quantities;
        if(transaction === 'add') {
            qty = parseInt(qty) + 1;
            try {
                fetch(`${BASE_URL}cart/update-quantity/${id}/${qty}`, {
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
                        alert(data.success);
                    }
                })
            } catch (e) {
                console.log(e);
            }
        } else if(transaction === 'minus') {
            if(qty > 1) {
                qty = parseInt(qty) - 1;
                try {
                    fetch(`${BASE_URL}cart/update-quantity/${id}/${qty}`, {
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
                            alert(data.success);
                        }
                    })
                } catch (e) {
                    console.log(e);
                }
            } else {
                removeCartItem(id, cart_id.includes(","));
            }
        }
    }
    const getQuantities = (quantities) => {
        let qtys;
        let totalQuantity = 0;
        if(quantities.includes(",")) {
            qtys = quantities.split(",");
        } else {
            qtys = [quantities]
        }
        qtys.map((qty) => {
            totalQuantity = parseInt(totalQuantity) + parseInt(qty);
        })
        return totalQuantity;
    }
    const removeCartItem = (cart_id, isUpdate) => {
        try {
            fetch(`${BASE_URL}cart/remove-cart-by-id/${cart_id}`, {
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
                alert(isUpdate ? 'Quantity changed successfully' : data.msg);

                const itemToRemove = cartItem.find(item => item.cart_ids === cart_id);
                if (itemToRemove && itemToRemove.is_prescription_required === 1) {
                    setPrescriptionRequired(prevState => prevState - 1);
                }

                getCart(paymentMethod);
            })
        } catch (e) {
            console.log(e);
        }
    }
    const checkOut = () => {
        // alert(JSON.stringify(cartItem[0]))
        try {
            fetch(`${BASE_URL}transaction/add-order`, {
                method: 'POST',
                headers: {
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
        const cart_id = cartItem && cartItem.map((item) => {
            return item.cart_ids
        })
        if(cart_id !== null) {
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
                    setPrescriptionRequired(0);
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
    const getCurrentDateTime = () => {
        const date = new Date();
        const dateToday = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`
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
        //console.log(userInfo)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar></StatusBar> */}
            <StatusBar hidden = {false} translucent = {true}/>
            <View style={styles.header}>
                <View style={styles.menu_button}/>
                <Text style={styles.header_title}>My Cart</Text>
                <TouchableOpacity
                    style={styles.menu_button}
                    onPress={() => {removeAllItems()}}
                >
                    <Image source={require('../../../assets/trash.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', tintColor: '#C7C8CC'}}/>
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
                                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight: 'bold'}}>{item.name}</Text>
                                                        <Text numberOfLines={1} ellipsizeMode='tail'>{item.merchant_name}</Text>
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
                                                            onPress={() => updateQuantity(item.cart_ids, item.quantities, 'minus')}
                                                        >
                                                            <Image source={require('../../../assets/minus-circle.png')} style={{resizeMode: 'contain', width: '100%', height: '100%', tintColor: '#79AC78'}}/>
                                                        </TouchableOpacity>
                                                        <TextInput editable={false} style={{marginHorizontal: 5, textAlign: 'center'}} value={item.id === cartItem[index].id ? getQuantities(cartItem[index].quantities).toString() : "1"}/>
                                                        <TouchableOpacity
                                                            underlayColor={'#fff'}
                                                            style={{width: 20, height: 20}}
                                                            onPress={() => updateQuantity(item.cart_ids, item.quantities, 'add')}
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
                bottom: 0,
                // shadowRadius: 5,
                // shadowOffset: {
                //     width: 0,
                //     height: -3,
                // },
                // shadowColor: '#000000',
                elevation: 10,
            }}>
                {prescriptionRequired === 1 &&
                    <View style={{backgroundColor: '#fff', flexDirection: 'row', padding: 10}}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Image source={require('../../../assets/file-prescription.png')} style={{resizeMode: 'contain', width: 30, height: 30, tintColor: '#2dc4f4'}}/>
                            <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Upload Prescription</Text>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => alert('View uploaded prescription.')}>
                                <Image source={require('../../../assets/eye.png')} style={{resizeMode: 'contain', width: 25, height: 25, tintColor: '#2dc4f4'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => pickImage()} style={{marginLeft: 20}}>
                                <Image source={require('../../../assets/note-medical.png')} style={{resizeMode: 'contain', width: 25, height: 25, tintColor: '#2dc4f4'}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                <View style={{padding: 10, borderTopWidth: 1, borderColor: '#f3f3f3', backgroundColor: '#fff'}}>
                    <View style={{marginBottom: 10}}>
                        <Text  style={{fontSize: 18, fontWeight: 'bold'}}>Select Payment Method</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <ToggleButton type={'COD'} activeColor={'#79AC78'} orderType={'Delivery'} typeDescripton='Cash On Delivery' typeSubDescription={'For Delivery'} customStyle={{borderWidth: 1, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, marginRight: 10}}/>
                        <ToggleButton type={'COP'} activeColor={'#79AC78'} orderType={'Pickup'} typeDescripton='Cash On Pickup' typeSubDescription={'For Pickup'} customStyle={{borderWidth: 1, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10}}/>
                    </View>
                </View>
                <View style={{borderTopWidth: 1, borderColor: '#f3f3f3', backgroundColor: '#fff'}}>
                    <View style={{height: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', color: '#b2b2b2'}}>Subtotal</Text>
                        <Text style={{fontSize: 16}}>{'\u20B1'}{getSubtotal()}</Text>
                    </View>
                    <View style={{height: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', color: '#b2b2b2'}}>Service Fee</Text>
                        <Text style={{fontSize: 16}}>{'\u20B1'}{getSubtotal() > 0 ? serviceFee.toFixed(2) : 0.00}</Text>
                    </View>
                    <View style={{height: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', color: '#b2b2b2'}}>Amount Payable</Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{'\u20B1'}{getSubtotal() > 0 ? (parseFloat(getSubtotal()) + parseFloat(serviceFee.toFixed(2))).toFixed(2) : 0.00}</Text>
                    </View>
                </View>
                <TouchableOpacity
                // cartItem !== null && paymentMethod !== null ? (cartItem.length > 0 ? false : true) : true
                // cartItem !== null && paymentMethod !== null ? (cartItem.length > 0 ? '#79AC78' : '#b2b2b2') : '#b2b2b2', 
                // checkOut()
                    disabled={ 
                        (prescriptionRequired === 1 && !prescriptionUploaded) ||
                        (cartItem !== null && paymentMethod !== null ? (cartItem.length > 0 ? false : true) : true)
                    }
                    underlayColor={'#f1f2f3'}
                    activeOpacity={0.2}
                    style={{
                        backgroundColor: (prescriptionRequired === 1 && !prescriptionUploaded) || cartItem === null || paymentMethod === null ? '#b2b2b2' : (cartItem.length > 0 ? '#79AC78' : '#b2b2b2'),
                        width: '100%', 
                        height: 50, 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}
                    onPress={() => checkOut()}
                >
                    <Text style={{fontSize: 16,color: '#fff', fontWeight: 'bold'}}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        // paddingTop: '10%',
    },
    header:{
        elevation: 5,
        paddingHorizontal: '5%',
        flexDirection: 'row',
        backgroundColor: '#6EB95B',
        height: '12%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10%'
        // paddingTop: 10,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
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
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
})