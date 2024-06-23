import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, Button, Dimensions } from 'react-native';
//import * as Location from 'expo-location';
import { CommonActions } from '@react-navigation/native';
import { auth } from '../Firebase';

const { width, height } = Dimensions.get('window');

const HomePage = ({ route, navigation }) => {
    //const { user } = route.params;

    /*const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [museums, setMuseums] = useState([]);*/

    const handlePressButton1 = () => {
        Alert.alert(
            "Fonctionnalité à venir",
            "Les profils ne sont pas encore implémentés",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
        );
    };

    const handlePressButton2 = () => {
        //navigation.navigate('List', { user });
        navigation.navigate('List');
    };

    const handlePressButton3 = () => {
        Alert.alert(
            "Fonctionnalité à venir",
            "Les pramètres ne sont pas encore implémentés",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
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

    /*useEffect(() => {
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
          sendLocationToServer(location.coords.latitude, location.coords.longitude);
          console.log(location.coords.latitude, location.coords.longitude)
        }
    }, [location]);

    const sendLocationToServer = async (latitude, longitude) => {
        const API_URL = 'http://16.171.61.40/';
        const data = { latitude, longitude };
    
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          const result = await response.json();
          console.log(result); // facultatif : traiter la réponse du serveur Flask
        } catch (error) {
          console.error('Error sending location to server:', error);
        }
      }; */   

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../assets/real_logo.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
            </View>
            <View style={styles.sloganContainer}>
                <Text style={styles.slogan}>Aixplorez intelligemment !</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/icon_location.png')} style={styles.search} />
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.button} onPress={handlePressButton1}>
                    <Text style={styles.buttonText}>Profil</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handlePressButton2}>
                    <Text style={styles.buttonText}>Go</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handlePressButton3}>
                    <Text style={styles.buttonText}>Paramètres</Text>
                </Pressable>
            </View>
            {/* <Text style={styles.text}>Welcome, {user ? user.email : 'Guest'}!</Text> */}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#384454',
      },
    topContainer: {
        width: '100%',
        height: height * 0.1,
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: height * 0.03
    },
    logo: {
        marginTop: "5%",
        width: width * 0.3,
        height: '100%',
        resizeMode: 'contain',
    },
    iconProfil: {
        marginTop: "5%",
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
    },
    sloganContainer: {
        marginTop: 40,
    },
    slogan: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#384454',
    },
});

export default HomePage;