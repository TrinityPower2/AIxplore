import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Pressable, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { URL_API } from '../Variable';
import { CommonActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const RatingForm = ({ route, navigation }) => {
  const { user } = route.params;
  const { placeID } = route.params;
  const { placeName } = route.params;

  const [crit1, setCrit1] = useState(1);
  const [crit2, setCrit2] = useState(1);
  const [crit3, setCrit3] = useState(1);
  const [crit4, setCrit4] = useState(1);
  const [noteFinale, setNoteFinale] = useState(1);

  const sendRatingToServer = async (text) => {
    const API_URL = URL_API + 'rating';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"crit1": text[0], "crit2": text[1], "crit3": text[2], "crit4": text[3], "noteGlobale": text[noteFinale], "placeID": placeID, "uid": user.uid}),
        });
        response.json();
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
};

  const handleSubmit = () => {
    const ratings = [crit1, crit2, crit3, crit4, noteFinale];
    console.log('ratings:', ratings);
    console.log(user.uid)
    console.log(placeID)
    console.log(placeName)
    sendRatingToServer(ratings)
    navigation.navigate('List');
  };

  const handleHisto = () => {
    navigation.navigate('History');
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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={require('../assets/real_logo.png')} />
        <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.placeName}>Vous venez de visiter : {placeName}</Text>
        <Text style={[styles.subtitle, { marginBottom: 30 }]}>Notez le lieu que vous venez de visiter</Text>

        <View style={styles.listContainer}>
          <Pressable onPressIn={() => setCrit1(1)} onPressOut={() => {}}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.ratingText}>Expérience globale : {crit1}/5</Text>
              <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={crit1}
                onChange={setCrit1}
              />
            </View>
          </Pressable>

          <Pressable onPressIn={() => setCrit2(1)} onPressOut={() => {}}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.ratingText}>Accessibilité : {crit2}/5</Text>
              <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={crit2}
                onChange={setCrit2}
              />
            </View>
          </Pressable>

          <Pressable onPressIn={() => setCrit3(1)} onPressOut={() => {}}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.ratingText}>Qualité de l'accueil : {crit3}/5</Text>
              <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={crit3}
                onChange={setCrit3}
              />
            </View>
          </Pressable>

          <Pressable onPressIn={() => setCrit4(1)} onPressOut={() => {}}>
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.ratingText}>Rapport qualité-prix : {crit4}/5</Text>
              <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={crit4}
                onChange={setCrit4}
              />
            </View>
          </Pressable>

          <Pressable onPressIn={() => setNoteFinale(1)} onPressOut={() => {}}>
            <View>
              <Text style={[styles.ratingText, { fontWeight: 'bold' }]}>Note finale du lieu : {noteFinale}/5</Text>
              <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={noteFinale}
                onChange={setNoteFinale}
              />
            </View>
          </Pressable>
        </View>

          <Pressable style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Valider</Text>
          </Pressable>
      </View>

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
    marginTop: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  placePicture: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  ratingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  listContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5db9f8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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

export default RatingForm;
