import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const LoadingPage = ({ navigation }) => {
    return (
        <View style={styles.container} >
            <Image style={styles.logo} source={require('../assets/real_logo.png')}></Image>
            <View style={styles.contentContainer} scrollEnabled={false}>
                <Image style={styles.loadingGif} source={require('../assets/loading.gif')} />
                <Text style={[styles.title]}>Veuillez patienter, préparation de votre prochain voyage en cours...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#384454',
    },
    logo: {
        top: -225,
        width: 225,
        height: 225,
        resizeMode: 'contain'
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
        marginTop: -180,
    }
});

export default LoadingPage;
