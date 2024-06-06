import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, Text, TextInput, Button, Image } from 'react-native';

const SplashPage = () => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoMoveY = useRef(new Animated.Value(0)).current;
    const [showLogin, setShowLogin] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }),
            Animated.timing(logoMoveY, {
                toValue: -225,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start(() => setTimeout(() => setShowLogin(true), 500));
    }, [logoOpacity, logoMoveY]);

    const handleLogin = () => {
        console.log(username, password);
    };

    return (
        <View style={styles.container}>
            <Animated.Image source={require('../assets/real_logo.png')}
                style={[styles.logo, { opacity: logoOpacity, transform: [{ translateY: logoMoveY }] }]} />
            {showLogin && (
                <View style={styles.loginContainer}>
                    <CustomInput
                        imageSource={require('../assets/icon_username.png')}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Email"
                    />
                    <CustomInput
                        imageSource={require('../assets/icon_password.png')}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <Button title="Login" onPress={handleLogin} />
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
        top: '50%',
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
        color: '#000'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
});

export default SplashPage;
