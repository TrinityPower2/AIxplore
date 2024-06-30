import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Pressable } from 'react-native';
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { URL_API } from '../Variable';
import { CommonActions } from '@react-navigation/native';


const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputText, setInputText] = useState('');

    const sendStringToServer = async (text) => {
        const API_URL = URL_API + 'register';

        console.log(JSON.stringify({"uid": text}))

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"uid": text}),
            });
            response.json();
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user.uid)
                    sendStringToServer(user.uid);
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'WelcomeForm', params: { user: user } }],
                        })
                    );
                });
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`ERROR: ${errorMessage}`);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/real_logo.png')} />
            <View style={styles.registerContainer}>
                <CustomInput
                    imageSource={require('../assets/icon_username.png')}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"                    
                />
                <CustomInput
                    imageSource={require('../assets/icon_password.png')}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <Pressable style={styles.button} onPress={handleRegister}>
                    <Text style={styles.textButton}>Register</Text>
                </Pressable>

                <Pressable style={[styles.button, {marginTop: 35, width: '55%'}]} onPress={handleRegister}>
                    <Text style={styles.textButton}>Back to Login</Text>
                </Pressable>
            </View>
        </View>
    );
};

const CustomInput = ({ imageSource, onChangeText, value, placeholder, secureTextEntry }) => (
    <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.icon} />
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            underlineColorAndroid="transparent"
        />
    </View>
);

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

export default RegisterPage;
