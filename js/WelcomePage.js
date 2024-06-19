import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';

const WelcomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/real_logo.png')} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bienvenue cher AIxplorateur !</Text>
        <Text style={styles.subtitle}>
          Merci d'avoir choisi AIxplore ! Afin de mieux vous connaître, nous
          vous invitons à remplir un questionnaire de bienvenue. Ce
          questionnaire nous permettra ensuite de vous proposer des lieux qui
          vous correspondent au mieux !
        </Text>
        <Text style={styles.subtitle}>
          Une quinzaine de lieux apparaîtront à l'écran. Nous vous demandons de
          noter, pour chacun de 1 à 10, votre envie de le visiter. Dès que vous
          êtes prêt, cliquez sur le bouton ci-dessous pour commencer le
          questionnaire.
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('WelcomeForm')}>
          <Text style={styles.buttonText}>Commencer</Text>
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
    marginBottom: -20,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
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

export default WelcomePage;
