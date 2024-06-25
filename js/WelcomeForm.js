import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Pressable, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window');

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

  const handleHisto = () => {
    navigation.navigate('History');
  };
  
  const handleHome = () => {
    navigation.navigate('Home');
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
        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
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
    marginTop: height * 0.1,
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
    marginBottom: 30,
  },
  ratingText: {
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5db9f8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 50,
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
  },
});

export default WelcomeForm;
