import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const WelcomeForm = ({ navigation })  => {
    const [userAnswer, setUserAnswer] = useState(1);
    const [modelAnswer, setModelAnswer] = useState(userAnswer * 2);

    useEffect(() => {
        console.log('user:', userAnswer);
        console.log('model:', modelAnswer);
    }, [userAnswer, modelAnswer]);

    const handleAnswer = (userAnswer) => {
        setUserAnswer(userAnswer);
        setModelAnswer(userAnswer * 2);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/real_logo.png')}></Image>
            <View style={styles.registerContainer}>
                <Image style={styles.placePicture} source={require('../assets/icon_image.png')}></Image>
                <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Nom du lieu affiché à l'image</Text>
                <Text style={[styles.textButton, {marginTop: 38}]}>Envie de visiter: {userAnswer}/5</Text>
                <StarRating
                    color='#5db9f8'
                    emptyColor='#FFFFFF'
                    size={40}
                    rating={userAnswer}
                    onChange={handleAnswer}
                />
                <Pressable style={[styles.button, {marginTop: 25}]} onPress={() => navigation.navigate('List')}>
                    <Text style={styles.textButton}>Valider</Text>
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
    placePicture: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: 15
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

export default WelcomeForm;