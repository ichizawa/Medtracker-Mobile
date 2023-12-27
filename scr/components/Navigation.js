import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext } from '../context/AuthContext'
import Login from '../Login'
import Register from '../Register'
import ClientHome from '../Screens/Client/BottomNavigation'
import MerchantHome from '../Screens/Merchant/Home'
import MerchantMenu from '../Screens/Merchant/Menu'
import RiderMenu from '../Screens/Rider/Menu'
import OrderList from '../Screens/Rider/OrderList'
import MerchantItems from '../Screens/Merchant/Items'
import MerchantAddItem from '../Screens/Merchant/AddItem'
import MerchantEditItem from '../Screens/Merchant/EditItem'
import MerchantProfile from '../Screens/Merchant/Profile'
import RiderHome from '../Screens/Rider/Home'
import ClientOrders from '../Screens/Client/MyOrders'
import GetOrderDirections from '../Screens/Client/Orders/GetOrderDirections'
import ClientOrderDetails from '../Screens/Client/Orders/OrderDetails'
import MerchantOrderDetails from '../Screens/Merchant/OrderDetails'
import ClientProfile from '../Screens/Client/Profile'
import RiderProfile from '../Screens/Rider/Profile'
import MerchantPoints from '../Screens/Merchant/Points'
import RiderPoints from '../Screens/Rider/Points'
import ClientPoints from '../Screens/Client/Points'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const {userInfo} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userInfo ?
                        <>
                            {userInfo.user_type === 1 ?
                                    <>
                                        <Stack.Screen name='Home' component={ClientHome} options={{headerShown: false}}/>
                                        <Stack.Screen name='MyOrders' component={ClientOrders} options={{headerShown: false}}/>
                                        <Stack.Screen name='GetOrderDirections' component={GetOrderDirections} options={{headerShown: false}}/>
                                        <Stack.Screen name='ClientOrderDetails' component={ClientOrderDetails} options={{headerShown: false}}/>
                                        <Stack.Screen name='ClientProfile' component={ClientProfile} options={{headerShown: false}}/>
                                        <Stack.Screen name='ClientPoints' component={ClientPoints} options={{headerShown: false}}/>
                                    </>
                                :
                                    null
                            }
                            {userInfo.user_type === 2 ?
                                    <>
                                        <Stack.Screen name='Home' component={RiderHome} options={{headerShown: false}}/>
                                        <Stack.Screen name='Menu' component={RiderMenu} options={{headerShown: false}}/>
                                        <Stack.Screen name='OrderList' component={OrderList} options={{headerShown: false}}/>
                                        <Stack.Screen name='RiderProfile' component={RiderProfile} options={{headerShown: false}}/>
                                        <Stack.Screen name='RiderPoints' component={RiderPoints} options={{headerShown: false}}/>
                                    </>
                                :
                                    null
                            }
                            {userInfo.user_type === 3 ?
                                    <>
                                        <Stack.Screen name='Home' component={MerchantHome} options={{headerShown: false}}/>
                                        <Stack.Screen name='Menu' component={MerchantMenu} options={{headerShown: false}}/>
                                        <Stack.Screen name='Items' component={MerchantItems} options={{headerShown: false}}/>
                                        <Stack.Screen name='Profile' component={MerchantProfile} options={{headerShown: false}}/>
                                        <Stack.Screen name='AddItem' component={MerchantAddItem} options={{headerShown: false}}/>
                                        <Stack.Screen name='EditItem' component={MerchantEditItem} options={{headerShown: false}}/>
                                        <Stack.Screen name='MerchantOrderDetails' component={MerchantOrderDetails} options={{headerShown: false}}/>
                                        <Stack.Screen name='MerchantPoints' component={MerchantPoints} options={{headerShown: false}}/>
                                    </>
                                :
                                    null
                            }
                        </>
                    :
                        <>
                            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
                        </>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})