import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, Switch } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL, processResponse } from '../../config'
import { AuthContext } from '../../context/AuthContext'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar'

const window_width = Dimensions.get('window').width

export default function EditItem({route, navigation}) {
    const {itemId} = route.params;
    const {userInfo} = useContext(AuthContext);

    const [categories, setCategories] = useState();

    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [prescriptionRequired, setPrescriptionReqiured] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productId, setProductId] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setImage('data:image/webp;base64,'+result.assets[0].base64);
        } else {
            console.log('canceled');
        }
    }
    const getCategories = () => {
        try {
            fetch(`${BASE_URL}category-list`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                setCategories(data.product);
                getItemDetails();
            })
        } catch (e) {
            console.log(e);
        }
    }
    const getItemDetails = () => {
        try {
            fetch(`${BASE_URL}merchant/product-info/${itemId}`, {
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
                setProductId(data.product.id);
                setImage(data.product.photo);
                setProductName(data.product.name);
                setCategoryId(data.product.category_id);
                setCategoryName(data.product.desc);
                setDescription(data.product.details)
                setPrescriptionReqiured(data.product.is_prescription_required);
                setQuantity(data.product.stock.toString())
                setProductPrice(data.product.price);
            })
        } catch (e) {
            console.log(e);
        }
    }
    const editProduct = () => {
        try {
            fetch(`${BASE_URL}merchant/update-product`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    id: productId,
                    category_id: categoryId,
                    name: productName,
                    details: description,
                    price: productPrice,
                    stock: quantity,
                    photo: image,
                    is_prescription_required: prescriptionRequired ? 1 : 0 // 0 = false 1 = true
                })
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                console.log(data);
                navigation.navigate('Items');
            })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar hidden = {false} translucent = {true}/>
            <ScrollView style={{flexGrow: 1, backgroundColor: '#fff'}} automaticallyAdjustKeyboardInsets={true}>
                <View style={styles.header}>
                    <TouchableOpacity
                    underlayColor={'#fff'}
                    activeOpacity={0.2}
                    style={styles.menu_button}
                    onPress={() => navigation.goBack()}
                    >
                        <Image source={require('../../../assets/angle-left.png')} style={styles.menu_icon_left}/>
                    </TouchableOpacity>
                    <Text style={styles.header_title}>Edit Item</Text>
                    <View style={styles.menu_button}/>
                </View>
                <View style={styles.body}>
                    <View style={styles.image_container}>
                        <View style={{flex: 1, padding: 15}}>
                            {image ?
                                    <View
                                        style={{
                                            backgroundColor: '#f1f2f3',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 10,
                                            elevation: 2
                                        }}>
                                        <Image
                                            source={{ uri: image }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 10,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </View>
                                :
                                    <View
                                        style={{
                                            backgroundColor: '#f1f2f3',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 10
                                        }}
                                    />
                            }
                        </View>
                        <View style={{flex: 1, padding: 15}}>
                            <TouchableOpacity
                                underlayColor={'#f3f3f3'}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}
                                onPress={() => pickImage()}
                            >
                                <>
                                    <Image source={require('../../../assets/circle-camera.png')} style={{width: 35, height: 35, tintColor: 'darkgreen', marginBottom: 10}}/>
                                    <Text style={{fontSize: 15,fontWeight: 'bold', color: 'darkgreen'}}>Upload Image</Text>
                                </>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.input_label}>Product Name</Text>
                        <TextInput
                            style={styles.text_input}
                            value={productName}
                            onChangeText={(e) => setProductName(e)}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.input_label}>Item Category</Text>
                        <SelectDropdown
                            defaultValue={{
                                id: categoryId,
                                desc: categoryName
                            }}
                            buttonStyle={{height: 45, marginVertical: 15, width: '100%', borderRadius: 10, paddingHorizontal: 20}}
                            buttonTextStyle={{textAlign: 'left', color: '#000', fontSize: 14, marginLeft: 0}}
                            defaultButtonText='Select Category'
                            dropdownStyle={{borderRadius: 10}}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <Image source={isOpened ? require('../../../assets/angle-up.png') : require('../../../assets/angle-down.png')} style={{width: 15, height: 15}}/>
                                )
                            }}
                            data={categories}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem.id)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.desc
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.desc
                            }}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.input_label}>Description</Text>
                        <TextInput
                            style={styles.multiline_input}
                            multiline={true}
                            numberOfLines={5}
                            value={description}
                            onChangeText={(e) => setDescription(e)}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.input_label}>Price</Text>
                        <TextInput
                            style={styles.text_input}
                            value={productPrice}
                            onChangeText={(e) => setProductPrice(e)}
                        />
                    </View>
                    <View style={styles.field_container}>
                        <Text style={styles.input_label}>Quantity</Text>
                        <TextInput
                            style={styles.text_input}
                            value={quantity}
                            onChangeText={(e) => setQuantity(e)}
                        />
                    </View>
                    <View style={styles.prescription_container}>
                        <View style={{width: 50, height: 50}}>
                            <Image source={require('../../../assets/medical-prescription.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
                            <Text style={{fontWeight: 'bold'}}>Prescription Required</Text>
                        </View>
                        <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                            <Switch
                                value={prescriptionRequired === 1 ? true : false}
                                onValueChange={(e) => setPrescriptionReqiured(e === true ? 1 : 0)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'darkgreen',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => editProduct()}
            >
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Update</Text>
            </TouchableOpacity>
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
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '13%'
    },
    menu_button: {
        height: 20,
        width: 20,
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
    },
    header_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
    },
    image_container: {
        backgroundColor: '#fff',
        height: window_width / 2,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 5,
        borderBlockColor: '#d3d3d3',
    },
    field_container: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderBottomWidth: 5,
        borderBlockColor: '#d3d3d3',
    },
    prescription_container: {
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        borderBottomWidth: 5,
        borderBottomColor: '#d3d3d3',
        flexDirection: 'row'
    },
    text_input: {
        width: '100%',
        //height: 45,
        backgroundColor: '#f1f2f3',
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    multiline_input: {
        width: '100%',
        backgroundColor: '#f1f2f3',
        borderRadius: 10,
        marginVertical: 15,
        padding: 15,
        textAlignVertical: 'top'
    },
    input_label: {
        //marginBottom: 15,
        color: '#b2b2b2'
    }
})