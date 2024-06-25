import React from 'react';
import { View, StyleSheet, Text, Image, Pressable, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingPage = ({ navigation }) => {

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
        <View style={styles.container} >
            <View style={styles.topContainer}>
              <Image style={styles.logo} source={require('../assets/real_logo.png')} />
              <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
            </View>
            <View style={styles.contentContainer} scrollEnabled={false}>
                <Image style={styles.loadingGif} source={require('../assets/loading.gif')} />
                <Text style={[styles.title]}>Veuillez patienter, préparation de votre prochain voyage en cours...</Text>
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
        position: 'absolute',
        top: '35%',
        left: '10%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: -150
      },
    loadingGif: {
        width: 600,
        height: 600,
        resizeMode: 'contain',
        marginTop: -250,
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

export default LoadingPage;
