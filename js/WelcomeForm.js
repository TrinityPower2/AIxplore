import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const WelcomeForm = ({ navigation }) => {
  const [userAnswer, setUserAnswer] = useState(1);
  const [modelAnswer, setModelAnswer] = useState(userAnswer * 2);

  useEffect(() => {
    console.log('user:', userAnswer);
    console.log('model:', modelAnswer);
  }, [userAnswer, modelAnswer]);

  const handleAnswer = (userAnswer) => {
    setUserAnswer(userAnswer);
    setModelAnswer(userAnswer * 2);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/real_logo.png')} />
      <View style={styles.contentContainer}>
        <Image style={styles.placePicture} source={require('../assets/icon_image.png')} />
        <Text style={styles.placeName}>Nom du lieu affiché à l'image</Text>
        <Text style={styles.ratingText}>Envie de visiter: {userAnswer}/5</Text>
        <StarRating
          color="#5db9f8"
          emptyColor="#FFFFFF"
          size={40}
          rating={userAnswer}
          onChange={handleAnswer}
        />
        <Pressable style={styles.button} onPress={() => navigation.navigate('List')}>
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
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16,
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

export default WelcomeForm;
