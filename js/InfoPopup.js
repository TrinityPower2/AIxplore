import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, Dimensions, Modal, Button, ActivityIndicator  } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import MapView, { Marker } from 'react-native-maps';
import { CommonActions } from '@react-navigation/native';
import { URL_API } from '../Variable';
import defaultImage from '../assets/icon_image.png';


const { width, height } = Dimensions.get('window');

const InfoPopup = ({ route, navigation }) => {
  const { user } = route.params;
  const { placeID } = route.params;
  const { id_classement } = route.params;

  const [loading, setLoading] = useState(true); // État de chargement
  const [data2, setData2] = useState([]); // État pour les données récupérées depuis le serveur

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    sendLocationToServer(user.uid, placeID);
  }, [placeID]);

  const sendLocationToServer = async (uid, placeID) => {
    const API_URL = URL_API + 'informations';

      try {
          const response = await fetch(API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ "uid": uid, "placeID":placeID}),
          });

          const data = await response.json();
          console.log(data)
          setData2(data["informations"]);
      } catch (error) {
          console.error('Error sending data to server:', error);
          Alert.alert('Erreur', `Erreur lors du chargement des données: ${error.message}`);
      } finally {
          setLoading(false); 
      }
  };

    const data = [
      { id: 1, name: "First Place", detail: "Gold", image: require('../assets/icon_image.png'), description: "1st place description", rating: 5 },
      { id: 2, name: "Second Place", detail: "Silver", image: require('../assets/icon_image.png'), description: "2nd place description", rating: 4.5 },
      { id: 3, name: "Third Place", detail: "Copper", image: require('../assets/icon_image.png'), description: "3rd place description", rating: 4.5 },
      { id: 4, name: "Fourth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "4th place description", rating: 4 },
      { id: 5, name: "Fifth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "5th place description", rating: 3.5 },
      { id: 6, name: "Sixth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "6th place description", rating: 3 },
      { id: 7, name: "Seventh Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "7th place description", rating: 3 },
      { id: 8, name: "Eight Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "8th place description", rating: 2 },
      { id: 9, name: "Ninth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "9th place description", rating: 1.5 },
      { id: 10, name: "Tenth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "10th place description", rating: 1 },
      { id: 11, name: "Eleventh Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "11th place description", rating: 0 }
  ];

    const [modalVisible, setModalVisible] = useState(false);

    const handleInfoPress = () => {
        Alert.alert(
            "Contact",
            data2.telephone,
            data2.horaires
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
        );
    };

    const doNothing = () => {}

    const handleBackPress = () => {
        navigation.goBack();
    };

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
  };;

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

            <View style={styles.contentContainer} >
                <Image style={styles.placePicture} source={data2.image ? { uri: data2.image } : defaultImage } />
                <Text style={styles.placeName}>{data2.nom}</Text>
                <Text style={styles.description}>{data2.description}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>
                <Pressable style={[styles.infoButton, { marginRight: 5 }]} onPress={handleInfoPress}>
                    <Text style={styles.buttonText}>Infos</Text>
                </Pressable>
                <Pressable style={[styles.infoButton, { marginLeft: 5 }]} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Carte</Text>
                </Pressable>
            </View>

            
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={styles.modalContainer}>
                <MapView
                  style={styles.map}
                  region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                    }}
                    title={'Place Name'}
                    description={'This is the place you are looking for'}
                  />
                </MapView>
                <Pressable style={styles.mapButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Retour</Text>
                </Pressable>
              </View>
            </Modal>
            
            <Text style={styles.ratingText}>Note globale : {data[1].rating}/5</Text>
            <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={data[1].rating}
                onChange={doNothing}
                enableSwiping={false}
                style={styles.ratingContainer}
            />

            <Pressable style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.buttonText}>Retour</Text>
            </Pressable>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#384454',
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
    contentContainer: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginTop: 10,
      width: '90%',
      alignItems: 'center',
    },
    placePicture: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 5,
    },
    placeName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
    },
    infoButton: {
      backgroundColor: '#5db9f8',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 25,
      width: '40%',
    },
    modalContainer: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "95%",
    },
    mapButton: {
      backgroundColor: '#5db9f8',
      padding: 12,
      alignItems: 'center',
      marginTop: -5,
      width: '100%',
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      marginTop: 20,
    },
    ratingText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 18,
      fontStyle: 'italic',
      marginBottom: -10,
      marginTop: 15,
    },
    backButton: {
      backgroundColor: '#5db9f8',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      width: '40%',
    },
    buttonText: {
      fontSize: 16,
      color: '#fff',
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
    }
  });
  
export default InfoPopup;
