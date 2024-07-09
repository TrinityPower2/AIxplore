import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, Modal, ActivityIndicator, ScrollView, LogBox, Linking } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import MapView, { Marker } from 'react-native-maps';
import { CommonActions } from '@react-navigation/native';
import { URL_API } from '../Variable';
import defaultImage from '../assets/icon_image.png';
import { auth } from '../Firebase';

LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');

const InfoPopup = ({ route, navigation }) => {
  const { user, placeID, id_classement } = route.params;

  const [loading, setLoading] = useState(true); 
  const [data2, setData2] = useState({});
  const [darkOverlay, setDarkOverlay] = useState(false);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertContent, setAlertContent] = useState(null);

  useEffect(() => {
    sendLocationToServer(user.uid, placeID);
  }, [placeID]);

  const sendLocationToServer = async (uid, placeID) => {
    const API_URL = `${URL_API}informations`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, placeID }),
      });

      const data = await response.json();
      console.log(data);
      setData2(data.informations);
    } catch (error) {
      console.error('Error sending data to server:', error);
      setAlertContent(
        <View style={styles.alertTextContainer}>
          <Text style={styles.alertText}>Erreur lors du chargement des données:</Text>
          <Text style={styles.alertText2}>{error.message}</Text>
        </View>
      );
      setCustomAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const getStyleForPosition = (position) => {
    switch(position) {
        case 1: return { backgroundColor: 'gold' };
        case 2: return { backgroundColor: 'silver'};
        case 3: return { backgroundColor: '#c87533'};
        default: return { backgroundColor: 'white'};
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleInfoPress = () => {
    setDarkOverlay(true);
    const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  
    const openingHours = {};
    for (let day of daysOfWeek) {
      const hours = data2.horaires[day].split(': ')[1];
      openingHours[day] = hours === 'Closed' ? 'Fermé' : hours;
    }

    let openingHoursString = '';
    for (let day of daysOfWeek) {
      openingHoursString += `${day.charAt(0).toUpperCase()}${day.slice(1)}: ${openingHours[day]}\n`;
    }

    setAlertContent(
      <View style={styles.alertTextContainer}>
        <Text style={styles.alertText}>Adresse</Text>
        <Text style={styles.alertText2}>{data2.adresse}</Text>
        <Text style={styles.alertText}>Horaires</Text>
        <Text style={styles.alertText2}>{openingHoursString}</Text>
        <Text style={styles.alertText}>Téléphone</Text>
        <Text style={styles.alertText2}>{data2.telephone}</Text>
        <Pressable onPress={() => openWebsite(data2.site_web)}>
          <Text style={styles.linkText}>{data2.site_web}</Text>
        </Pressable>
      </View>
    );
    setCustomAlertVisible(true);
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('List', { user })
    }
  };

  const handleHisto = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'History', params: { user } }],
      })
    );
  };

  const handleHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home', params: { user } }],
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
      console.error('Sign out error', error);
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const openWebsite = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={require('../assets/real_logo.png')} />
        <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
      </View>

      <View style={[styles.contentContainer, getStyleForPosition(id_classement)]}>
        <Image style={styles.placePicture} source={data2.image ? { uri: data2.image } : defaultImage} />
        <Text style={styles.placeName}>{data2.nom}</Text>
      </View>

      <View style={styles.contentContainer2}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.description}>{data2.description}</Text>
        </ScrollView>
      </View>

      <View style={styles.infoContainer}>
        <Pressable style={[styles.infoButton, { marginRight: 12 }]} onPress={handleInfoPress}>
          <Text style={styles.buttonText}>Infos</Text>
        </Pressable>
        <Pressable style={[styles.infoButton, { marginLeft: 12 }]} onPress={() => setModalVisible(true)}>
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
              latitude: data2.lat,
              longitude: data2.long,
              latitudeDelta: 0.02,
              longitudeDelta: 0.03,
            }}
          >
            <Marker
              coordinate={{
                latitude: data2.lat,
                longitude: data2.long,
              }}
              title={data2.nom}
              description={data2.adresse}
            />
          </MapView>
          <Pressable style={styles.mapButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Retour</Text>
          </Pressable>
        </View>
      </Modal>

      <Text style={styles.ratingText}>Note globale : {data2.rating ? `${data2.rating}/5` : 'Non noté'}</Text>
      <StarRating
        color="#5db9f8"
        emptyColor="#FFFFFF"
        size={30}
        rating={data2.rating}
        onChange={() => {}}
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

      {darkOverlay && <View style={styles.overlay} />}

      <Modal
        animationType="fade"
        transparent={true}
        visible={customAlertVisible}
        onRequestClose={() => {
          setCustomAlertVisible(false);
          setDarkOverlay(false);
        }}
      >
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            {alertContent}
            <Pressable style={styles.alertButton} onPress={() => {
              setCustomAlertVisible(false);
              setDarkOverlay(false);
            }}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#384454',
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  topContainer: {
    width: '100%',
    height: height * 0.12,
    backgroundColor: '#232B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: height * 0.005,
  },
  logo: {
    width: width * 0.3,
    height: height * 0.08,
    resizeMode: 'contain',
  },
  iconProfil: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  contentContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  placePicture: {
    width: width * 0.35,
    height: width * 0.35,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  placeName: {
    fontSize: width > 320 ? 20 : 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: width > 320 ? 16 : 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  contentContainer2: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    height: height * 0.2,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },
  infoButton: {
    backgroundColor: '#5db9f8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
  },
  modalContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '95%',
  },
  mapButton: {
    backgroundColor: '#5db9f8',
    padding: 12,
    alignItems: 'center',
    marginTop: -5,
    width: '100%',
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#5db9f8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
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
    bottom: 0,
  },
  iconHisto: {
    width: width * 0.12,
    height: width * 0.12,
  },
  iconHome: {
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  alertOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#384454',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  alertTextContainer: {
    alignItems: 'center'
  },
  alertText: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    color: '#5db9f8',
    marginBottom: height * 0.01,
    alignItems: 'center',
    textAlign: 'center',
  },
  alertText2: {
    fontSize: height * 0.02,
    color: 'white',
    marginBottom: height * 0.03,
    alignItems: 'center',
    textAlign: 'center',
  },
  linkText: {
    fontSize: height * 0.02,
    color: '#5db9f8',
    textDecorationLine: 'underline',
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: '#5db9f8',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
  },
});

export default InfoPopup;
