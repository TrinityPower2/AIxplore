import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Pressable } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const RatingForm = ({ route, navigation }) => {
  const { placeName } = route.params;

  const [crit1, setCrit1] = useState(1);
  const [crit2, setCrit2] = useState(1);
  const [crit3, setCrit3] = useState(1);
  const [crit4, setCrit4] = useState(1);
  const [noteFinale, setNoteFinale] = useState(1);

  const handleSubmit = () => {
    const ratings = [crit1, crit2, crit3, crit4, noteFinale];
    console.log('ratings:', ratings);
    navigation.navigate('List');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/real_logo.png')} />
      <View style={styles.contentContainer}>
        {/* <Image style={styles.placePicture} source={require('../assets/icon_image.png')} /> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#384454',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 225,
    height: 225,
    resizeMode: 'contain',
    marginTop: -30,
    marginBottom: -40,
  },
  contentContainer: {
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
});

export default RatingForm;
