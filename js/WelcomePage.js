import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';

const WelcomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/real_logo.png')}></Image>
            <View style={styles.registerContainer}>
                <Text style={styles.textButton}>Bienvenue cher AIxplorateur ! Et merci d'avoir choisi AIxplore !</Text>
                <Text style={styles.textButton}>Afin de mieux vous connaître, nous vous invitons à remplir un questionnaire de bienvenue.
                    Ce questionnaire nous permettra ensuite  de vous proposer des lieux qui vous correspondent au mieux !
                </Text>
                <Text style={styles.textButton}>Une quinzaine de lieux apparaîtront à l'écran. Nous vous demander noter, pour chacun de 1 à 10, votre envie de le visiter.
                    Dès que vous êtes prêt, cliquez sur le bouton ci-dessous pour commencer le questionnaire.
                </Text>
                <Pressable style={[styles.button, {marginTop: 25}]} onPress={() => navigation.navigate('WelcomeForm')}>
                    <Text style={styles.textButton}>Commencer</Text>
                </Pressable>
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
});

export default WelcomePage;