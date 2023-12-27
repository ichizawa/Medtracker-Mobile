import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Platform, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL, processResponse } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function Items({navigation}) {
    const {userInfo} = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getItems = () => {
        setIsRefreshing(true);
        try {
            fetch(`${BASE_URL}merchant/product`, {
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
                setData(data.merchant_product);
                setIsRefreshing(false);
            })
        } catch (e) {
            console.log(e);
            setIsRefreshing(false);
        }
    }
    useEffect(() => {
        getItems();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => navigation.goBack()}
                >
                <Image source={require('../../../assets/cross-small.png')} style={styles.menu_icon_left}/>
                </TouchableOpacity>
                <Text style={styles.header_title}>My Items</Text>
                <TouchableOpacity
                underlayColor={'#fff'}
                activeOpacity={0.2}
                style={styles.menu_button}
                onPress={() => console.log('pressed')}
                >
                <Image source={require('../../../assets/search.png')} style={styles.menu_icon_right}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, padding: 10, backgroundColor: '#f2f2f2'}}>
                {data ?
                        <FlatList
                            data={data}
                            extraData={data}
                            numColumns={2}
                            onRefresh={() => getItems()}
                            refreshing={isRefreshing}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        underlayColor={'#87b5eb'}
                                        style={{margin: 5, flex: 1/2, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', elevation: 2}}
                                        onPress={() => navigation.navigate('EditItem', {itemId: item.id})}
                                    >
                                        <>
                                            {item.photo ?
                                                    <Image source={{uri: item.photo}} style={{resizeMode: 'cover', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 150}}/>
                                                :
                                                    <View style={{width: '100%', height: 150, backgroundColor: '#f2f2f2', borderTopLeftRadius: 10, borderTopRightRadius: 10}}/>
                                            }
                                            <View style={{width: '100%', padding: 10, justifyContent: 'space-between'}}>
                                                <Text
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'
                                                    style={styles.product_title}
                                                >{item.name}</Text>
                                                <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Text>{'\u20B1'}{item.price}</Text>
                                                    <Text>{item.stock}</Text>
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
                <TouchableOpacity
                    underlayColor={'#808080'}
                    activeOpacity={0.2}
                    style={styles.add_product}
                    onPress={() => navigation.navigate('AddItem')}
                >
                    <Image source={require('../../../assets/plus-small.png')} style={{resizeMode: 'contain', width: '70%', height: '70%', tintColor: '#fff'}}/>
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
        paddingBottom: 20,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menu_button: {
        height: 30,
        width: 30,
    },
    menu_icon_right: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
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
        fontSize: 16,
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
    }
})