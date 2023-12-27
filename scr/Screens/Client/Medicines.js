import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Platform, SafeAreaView, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function Medicines({navigation}) {
    const [data, setData] = useState(null);
    const {userInfo} = useContext(AuthContext);

    const getItems = () => {
        try {
            fetch(`${BASE_URL}product-list`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                //console.log(data.result);
                setData(data.result);
            })
        } catch (e) {
            console.log(e);
        }
    }

    const addToCart = (productId, price) => {
        try {
            fetch(`${BASE_URL}cart/add-cart`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    product_id: productId,
                    price: price,
                    quantity: 1
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                alert(JSON.stringify(data));
            })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getItems();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, marginRight: 10, height: '100%'}}>
                    <TextInput style={styles.text_input} placeholder='Search Medicine...'/>
                </View>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => console.log('pressed')}
                >
                    <Image source={require('../../../assets/search.png')} style={styles.menu_icon_right}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, padding: 10}}>
                {data ?
                        <FlatList
                            data={data}
                            extraData={data}
                            numColumns={2}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        underlayColor={'#87b5eb'}
                                        style={{margin: 5, flex: 1/2, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', elevation: 2}}
                                        onPress={() => console.log('pressed')}
                                    >
                                        <>
                                            {item.photo ?
                                                    <Image source={{uri: item.photo}} style={{resizeMode: 'cover', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 150}}/>
                                                :
                                                    <View style={{width: '100%', height: 150, backgroundColor: '#f2f2f2', borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
                                            }
                                            <View style={{flex: 1, width: '100%', padding: 10, justifyContent: 'space-between'}}>
                                                <Text
                                                    numberOfLines={2}
                                                    ellipsizeMode='tail'
                                                    style={styles.product_title}
                                                >{item.name}</Text>
                                                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                                    <Text>{'\u20B1'}{item.price}</Text>
                                                    <TouchableOpacity
                                                        underlayColor={'#fff'}
                                                        style={{
                                                            height: 30,
                                                            width: 30,
                                                        }}
                                                        onPress={() => addToCart(item.id, item.price)}
                                                    >
                                                        <Image source={require('../../../assets/shopping-cart-add.png')} style={{resizeMode: 'contain', width: '100%', height: '100%'}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    :
                        null
                }
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
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
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
        marginBottom: 10
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