import React from 'react';
import { View, StyleSheet, Image, Text, Pressable, Dimensions, LogBox } from 'react-native';
import { CommonActions } from '@react-navigation/native';

LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');

const WelcomePage = ({ route, navigation }) => {

  const { user } = route.params;

  const handleHisto = () => {
    Alert.alert('Attention !', 'Vous devez remplir le formulaire avant d\'accéder aux fonctionnalités d\'AIxplore !');
  };
  
  const handleHome = () => {
    Alert.alert('Attention !', 'Vous devez remplir le formulaire avant d\'accéder aux fonctionnalités d\'AIxplore !');
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

  const handleForm = () => {
    navigation.dispatch(
      CommonActions.reset({
          index: 0,
          routes: [{ name: 'WelcomeForm', params: { user: user } }],
      })
  );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../assets/real_logo.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
      </View>
  
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bienvenue cher AIxplorateur !</Text>
        <Text style={styles.subtitle}>
          Merci d'avoir choisi AIxplore ! Afin de mieux vous connaître, nous
          vous invitons à remplir un questionnaire de bienvenue. Ce
          questionnaire nous permettra ensuite de vous proposer des lieux qui
          vous correspondent au mieux !
        </Text>
        <Text style={styles.subtitle}>
          Une quinzaine de lieux apparaîtra à l'écran. Nous vous demandons de
          tous les noter de 0 à 5, selon votre envie de le visiter. Cliquez sur le bouton ci-dessous pour commencer.
        </Text>
        <Pressable style={styles.button} onPress={handleForm}>
          <Text style={styles.buttonText}>Commencer</Text>
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

export default WelcomePage;
