import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable, 
    Dimensions, ActivityIndicator, Alert, Modal } from 'react-native';

import Slider from '@react-native-community/slider';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import * as Location from 'expo-location';
import { CommonActions } from '@react-navigation/native';
import { URL_API } from '../Variable';
import defaultImage from '../assets/icon_image.png';
import { auth } from '../Firebase';


const { width, height } = Dimensions.get('window');

const ListPage = ({ route, navigation }) => {
    const [city, setCity] = useState('');
    const { user } = route.params;
    const { aixplore } = route.params;

    const [loading, setLoading] = useState(true); // État de chargement
    const [data2, setData2] = useState([]); // État pour les données récupérées depuis le serveur

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    useEffect(() => {
        if (location) {
            sendLocationToServer(user.uid, location.coords.latitude, location.coords.longitude);
        }
    }, [location]);

    const sendLocationToServer = async (uid, lat, long) => {

        if (aixplore==true) {
            const API_URL = URL_API + 'aixplore';
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "uid": uid, "lat": lat, "long": long }),
                });

                const data = await response.json();
                console.log(data)
                setData2(data["recommandation"]);
            } catch (error) {
                console.error('Error sending data to server:', error);
                Alert.alert('Erreur', `Erreur lors du chargement des données: ${error.message}`);
            } finally {
                setLoading(false); 
            }
        }
        else {

            const API_URL = URL_API + 'recommandation';
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "uid": uid, "lat": lat, "long": long }),
                });

                const data = await response.json();
                console.log(data)
                setData2(data["recommandation"]);
            } catch (error) {
                console.error('Error sending data to server:', error);
                Alert.alert('Erreur', `Erreur lors du chargement des données: ${error.message}`);
            } finally {
                setLoading(false); 
            }
            
        }
    };

    const [modalVisible, setModalVisible] = useState(false);

    const getStyleForPosition = (position) => {
        switch(position) {
            case 1: return { backgroundColor: 'gold', fontSize: 24, color: 'black' };
            case 2: return { backgroundColor: 'silver', fontSize: 20, color: 'black' };
            case 3: return { backgroundColor: '#c87533', fontSize: 18, color: 'black' };
            default: return { backgroundColor: 'white', fontSize: 16, color: 'black' };
        }
    };

    const createPopup = (index) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'InfoPopup', params: { user: user, id_classement:data2[index].id, placeID: data2[index].lieu_id } }],
            })
        );
    };

    const [proximity, setProximity] = useState(1);
    const [selected, setSelected] = useState([]);
  
    const mockTags = [
      { key: '1', value: 'Musée' },
      { key: '2', value: 'Théâtre' },
      { key: '3', value: 'Monument' },
      { key: '5', value: 'Architecture' },
    ];

    const handleHisto = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'History', params: { user: user } }],
            })
        );
    };

    const handleHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home', params: { user: user } }],
            })
        );
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../assets/real_logo.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
            </View>
            <Text style={styles.title}>Liste des lieux à visiter</Text>
            <View style={styles.cityContainer}>
                <View style={{ flex: 1 }}>
                    <CustomInput
                        imageSource={require('../assets/icon_location.png')}
                        onChangeText={setCity}
                        value={city}
                        placeholder="Paris"
                    />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Pressable onPress={() => setModalVisible(true)}>
                        <View style={styles.iconBox}>
                            <Image source={require('../assets/icon_filters.png')} style={[styles.icon, { marginLeft: 10 }]} />
                        </View>
                    </Pressable>
                </View>
            </View>
    
            <ScrollView style={styles.listContainer}>
                {data2.map((item, index) => (
                    <View key={item.id} style={[styles.item, getStyleForPosition(index + 1)]}>
                        <Image source={item.image ? { uri: item.image } : defaultImage } style={styles.itemImage}></Image>
                        <Text
                            style={{ fontSize: getStyleForPosition(index + 1).fontSize, color: getStyleForPosition(index + 1).color }}
                            onPress={() => createPopup(index)}>
                            {item.name}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Filtres</Text>
                    <Text style={[styles.labelText, {textAlign: 'center'}]}>Proximité: {proximity} km</Text>
                    
                    <Slider
                        style={{ width: 200, height: 40, alignSelf: 'center'}}
                        minimumValue={1}
                        maximumValue={100}
                        minimumTrackTintColor="#5db9f8"
                        maximumTrackTintColor="#FFFFFF"
                        thumbTintColor="#000000"
                        step={1}
                        value={proximity}
                        onValueChange={(value) => setProximity(value)}
                    />

                    <View style={{marginTop: 20}}>
                        <MultipleSelectList
                        setSelected={(val) => setSelected(val)}
                        data={mockTags}
                        save="value"
                        value={selected}
                        label="Lieux"
                        boxStyles={{ backgroundColor: '#FFFFFF' }}
                        dropdownStyles={{ backgroundColor: '#FFFFFF' }}
                        />
                    </View>

                        <Pressable style={[styles.button, { marginTop: 30 }]} onPress={() => setModalVisible(false)}>
                        <Text style={styles.buttonText}>Valider</Text>
                        </Pressable>
                </View>
            </Modal>

            <View style={styles.botContainer}>
                <Pressable onPress={handleHisto}>
                    <Image style={styles.iconHisto} source={require('../assets/icon_histo.png')} />
                </Pressable>
                <Pressable onPress={handleHome}>
                    <Image style={styles.iconHome} source={require('../assets/icon_home.png')} />
                </Pressable>
                <Pressable onPress={handleLogout}>
                    <Image style={styles.iconOut} source={require('../assets/icon_out.png')} />
                </Pressable>
            </View>
        </View>
    );
};

const CustomInput = ({ imageSource, onChangeText, value, placeholder }) => (
    <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.icon} />
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384454',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        width: '100%',
        height: '18%',
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: height * -0.07,
        marginBottom: height * 0.03
    },
    logo: {
        width: width * 0.3,
        height: height * 0.08,
        resizeMode: 'contain',
        marginTop: height * 0.105
    },
    iconProfil: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
        marginTop: height * 0.105
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: height * 0.03
    },
    labelText: {
        color: 'white',
        fontSize: 16,
        marginTop: 20,
    },
    cityContainer: {
        marginTop: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        textAlign: 'left',
        color: '#000000',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    iconBox: {
        backgroundColor: '#1abc9c',
        padding: 10,
        borderRadius: 10,
    },
    listContainer: {
        width: '100%',
        marginTop: height * 0.02,
        marginBottom: height * 0.08
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#384454', 
        padding: 20, 
        height: '50%',
    },
    modalButton: {
        backgroundColor: '#5db9f8',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 25,
        width: '40%',
    },
    button: {
        backgroundColor: '#5db9f8', 
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      buttonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    botContainer: {
        width: '100%',
        height: height * 0.08,
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0
    },
    iconHisto: {
        width: width * 0.12,
        height: width * 0.12,
    },
    iconHome: {
        marginTop: height * 0.005,
        width: width * 0.12,
        height: width * 0.12,
    },
    iconOut: {
        width: width * 0.12,
        height: width * 0.12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListPage;
