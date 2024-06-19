import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const LoadingPage = ({ navigation }) => {
    return (
        <View style={styles.container} keyboardShouldPersistTaps="always" pointerEvents="box-none">
            <Image style={styles.logo} source={require('../assets/real_logo.png')}></Image>
            <View style={styles.registerContainer} scrollEnabled={false}>
                <Image style={styles.loadingGif} source={require('../assets/loading.gif')} />
                <Text style={[styles.textButton]}>Veuillez patienter, préparation de votre prochain voyage en cours...</Text>
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
    registerContainer: {
        position: 'absolute',
        top: '35%',
        left: '10%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#384454'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 12,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        textAlign: 'left',
        color: '#000000'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    button: {
        top: '7%',
        width: '80%',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#384454'
    },
    textButton: {
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 10
    },
    loadingGif: {
        width: 600,
        height: 600,
        resizeMode: 'contain',
        margin: -150
    }
});

export default LoadingPage;
