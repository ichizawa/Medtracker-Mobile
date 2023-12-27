import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import Mapbox from '@rnmapbox/maps'
import { UserLocationRenderMode } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { AuthContext } from '../../../context/AuthContext';
import { BASE_URL, processResponse } from '../../../config';

const window_height = Dimensions.get('window').height;
Mapbox.setAccessToken('pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg');

export default function GetOrderDirections({route, navigation}) {
    const {order_details} = route.params
    
    const [location, setLocation] = useState(null);
    const {userInfo} = useContext(AuthContext);
    const [mapPoints, setMapPoints] = useState([]);
    const [lineString, setLineString] = useState(null); //
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [mode, setMode] = useState('driving'); //driving, walking, cycling, traffic
    const [steps, setSteps] = useState(null);

    const getCurrentLocation = async () => {
        setLocation(null);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        alert('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        //console.log(location.coords);
        if(mapPoints.length === 0) {
            setMapPoints(oldArray => [...oldArray, {long: location.coords.longitude, lat: location.coords.latitude}])
            getStorePoints()
        }
    }
    const getStorePoints = () => {
        order_details.order.map((item) => {
            setMapPoints(oldArray => [...oldArray, {long: item.merchant_long, lat: item.merchant_lat}])
        })
    }
    const getDirections = () => {
        let points = ''; //-74.048066%2C40.755535%3B-74.049469%2C40.757494
        if(mapPoints.length > 0) {
          try {
            mapPoints.map((item, index) => {
              if(index === 0) {
                points = item.long + '%2C' + item.lat
              } else {
                points = points + '%3B' + item.long + '%2C' + item.lat //
              }
            })
            fetch(`https://api.mapbox.com/directions/v5/mapbox/${mode}/${points}?alternatives=false&continue_straight=false&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoicnVpbnplIiwiYSI6ImNrOTd0N3F2bjBpdjkzZnBha3FsZmk4NjcifQ.VprSZLmMu0zRldMobXT6Fg`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(processResponse)
            .then(res => {
                const {statusCode, data} = res;
                setDistance((data.routes[0].distance / 1000).toFixed(1));
                setDuration(toHoursAndMinutes(data.routes[0].duration));

                let step_instructions = [];
                data.routes.map((item) => {
                  setLineString({
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          coordinates: item.geometry.coordinates,
                          type: "LineString"
                        }
                      }
                    ]
                  })
                  item.legs[0].steps.map((step) => {
                    step_instructions.push(step.maneuver.instruction);
                  })
                })
                setSteps(step_instructions);
                //
            })
          } catch (e) {
              console.log(e);
          }
        }
    }
    const toHoursAndMinutes = (totalSeconds) => {
        const totalMinutes = Math.floor(totalSeconds / 60);
      
        const seconds = Math.floor(totalSeconds % 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
      
        return  `${hours} hr ${minutes} min ${seconds} sec`; // { h: hours, m: minutes, s: seconds }
    }
    useEffect(() => {
        getCurrentLocation();
    }, [])
    return (
        <View style={styles.container}>
            <Mapbox.MapView
                style={{flex: 1, width: '100%'}}
                logoEnabled={false}
                compassEnabled={true}
                attributionEnabled={false}
                scaleBarEnabled={false}
            >
                <Mapbox.UserLocation
                    //androidRenderMode='gps'
                    renderMode={UserLocationRenderMode.Native}
                    visible={true}
                    requestsAlwaysUse={true}
                />
                {location &&
                <Mapbox.Camera
                    zoomLevel={17}
                    centerCoordinate={[location.coords.longitude, location.coords.latitude]}
                    animationMode='flyTo'
                    animationDuration={2000}
                />
                }
                {mapPoints.length > 0 && lineString !== null?
                        mapPoints.map((item, index) => {
                            return (
                            <Mapbox.PointAnnotation
                                id={"mapPoint" + index}
                                key={index}
                                coordinate={[item.long, item.lat]}
                            />
                            )
                        })
                    :
                        null
                }
                {lineString &&
                <Mapbox.ShapeSource id='mapbox-direction-source' shape={lineString}>
                    <Mapbox.LineLayer
                    id="mapbox-direction-line"
                    style={{
                        lineColor: '#FF0000',
                        lineWidth: 5,
                        lineOpacity: 0.5
                    }}
                    />
                </Mapbox.ShapeSource>
                }
            </Mapbox.MapView>
            <View style={{position: 'absolute', top: 10, left: 10}}>
                <TouchableOpacity
                activeOpacity={0.8}
                style={{backgroundColor: '#fff', width: 60, height: 60, borderRadius: 30, padding: 15, elevation: 5}}
                onPress={() => navigation.goBack()}
                >
                <Image source={require('../../../../assets/arrow-small-left.png')} style={{height: '100%', width: '100%'}}/>
                </TouchableOpacity>
            </View>
            <View style={{padding: 10, position: 'absolute', bottom: mapPoints !== null && lineString !== null ? (window_height * 0.3 + 10) : 10, width: '100%', justifyContent: 'flex-end', flexDirection: 'row'}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#fff',
                        elevation: 5,
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => getCurrentLocation()}
                >
                <Image source={require('../../../../assets/location-crosshairs.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', tintColor: '#99DFB2'}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#fff',
                        elevation: 5,
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10
                    }}
                    onPress={() => getDirections()}
                >
                <Image source={require('../../../../assets/diamond-turn-right.png')} style={{width: '100%', height: '100%', resizeMode: 'contain', tintColor: '#99DFB2'}}/>
                </TouchableOpacity>
            </View>
            {mapPoints !== null && lineString !== null ?
                    <View style={{position: 'absolute', bottom: 10, left: 10, right: 10, height: window_height * 0.3}}>
                        <View style={{backgroundColor: '#23262d', height: window_height * 0.3, elevation: 5, padding: 10, borderRadius: 5}}>
                            <View style={{backgroundColor: '#393c42', padding: 10, alignItems: 'center', borderRadius: 5, marginBottom: 10, flexDirection: 'row'}}>
                                <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', padding: 10}}>
                                    <Image source={require('../../../../assets/driving.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                                </View>
                                <View style={{marginHorizontal: 10}}>
                                    <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{duration}</Text>
                                    <Text style={{color: '#fff', fontSize: 16}}>{distance + ' km'}</Text>
                                </View>
                            </View>
                            <View style={{flex: 2, backgroundColor: '#393c42', padding: 10, borderRadius: 5}}>
                                {steps &&
                                    steps.map((step, index) => {
                                        return (
                                            <Text key={index} style={{color: '#fff', fontSize: 16}}>{(index+1) + '. ' + step}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%'
    }
})