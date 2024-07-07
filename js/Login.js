import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Text, TextInput, Image, Pressable, Alert, LogBox, Keyboard, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { URL_API } from '../Variable';

LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');

const LoginPage = ({ navigation }) => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoMoveY = useRef(new Animated.Value(0)).current;
    const [showLogin, setShowLogin] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [form, setForm] = useState('');

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(logoMoveY, {
                toValue: -225,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start(() => setTimeout(() => setShowLogin(true), 500));

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [logoOpacity, logoMoveY]);

    const _keyboardDidShow = () => {
        Animated.timing(logoMoveY, {
            toValue: height * -0.175,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    const _keyboardDidHide = () => {
        Animated.timing(logoMoveY, {
            toValue: -225,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    const testForm = async (text, callback) => {
        const API_URL = URL_API + 'testForm';
        console.log(text);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "uid": text }),
            });

            console.log(response);

            const data = await response.json();
            console.log('Received data:', data);

            setForm(data["testForm"]);
            if (callback) callback(data["testForm"]);

        } catch (error) {
            console.error('Error sending data to server:', error);
            Alert.alert('Erreur', `Erreur lors du chargement des données: ${error.message}`);
        }
    };

    const handleLogin = async () => {
        signInWithEmailAndPassword(auth, email.trim(), password.trim())
            .then((userCredential) => {
                const user = userCredential.user;

                testForm(user.uid, (formValue) => {
                    if (formValue) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Home', params: { user: user } }],
                            })
                        );
                    } else {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'WelcomePage', params: { user: user } }],
                            })
                        );
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                Alert("LOGIN FAILED");
            });
    };

    const handlePwd = () => {
        navigation.navigate('NearbySearch');
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Animated.Image source={require('../assets/real_logo.png')}
                style={[styles.logo, { opacity: logoOpacity, transform: [{ translateY: logoMoveY }] }]} />
            {showLogin && (
                <View style={styles.loginContainer}>
                    <CustomInput
                        imageSource={require('../assets/icon_username.png')}
                        onChangeText={(text) => setEmail(text.trim())}
                        value={email}
                        placeholder="Email"
                    />
                    <CustomInput
                        imageSource={require('../assets/icon_password.png')}
                        onChangeText={(text) => setPassword(text.trim())}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.textButton}>Login</Text>
                    </Pressable>
                    <Pressable onPress={handlePwd} style={styles.forgotPwd}>
                        <Text style={styles.textPwd}>Forgot Password ?</Text>
                    </Pressable>
                    <View style={styles.choiceContainer}>
                        <View style={styles.choiceLine}/>
                        <Text style={styles.choiceText}>   Or Connect Via Google   </Text>
                        <View style={styles.choiceLine}/>
                    </View>
                    <View style={styles.googleContainer}>
                        <Image source={require('../assets/logo_google.png')} style={styles.icon} />
                        <Text style={styles.textGoogle}>Sign in with Google</Text>
                    </View>
                    <View style={styles.registerContainer}>
                        <Text style={{ color: 'white' }}>Not registered yet ? Click </Text>
                        <Pressable onPress={handleRegister}>
                            <Text style={{ textDecorationLine: 'underline', color: '#4CB6DC' }}>here</Text>
                        </Pressable>
                    </View>
                </View>
            )}
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
        width: 225,
        height: 225,
        resizeMode: 'contain'
    },
    loginContainer: {
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
    textPwd: {
        color: '#FFFFFF',
        textDecorationLine: 'underline'
    },
    choiceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        top: '23%'
    },
    choiceLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#D0D0D0',
    },
    choiceText: {
        color: '#4CB6DC'
    },
    forgotPwd: {
        top: '9%'
    },
    googleContainer: {
        top: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 50,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10
    },
    button: {
        top: '4%',
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
    registerContainer: {
        top: '10%',
        flexDirection: 'row'
    }
});

export default LoginPage;
