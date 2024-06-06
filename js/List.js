import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Pressable, TextInput } from 'react-native';

const ListPage = ({ navigation }) => {

    const [city, setCity] = useState('');

    const handleHome = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/real_logo.png')} />
            <View style={styles.cityContainer}>
                <CustomInput
                    imageSource={require('../assets/icon_location.png')}
                    onChangeText={setCity}
                    value={city}
                    placeholder="Paris"                    
                />
            </View>
            <Pressable onPress={handleHome}>
                <Image style={styles.home} source={require('../assets/icon_home.png')} />
            </Pressable>
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
        position: 'absolute',
        top: 0,
        width: 225,
        height: 225,
        resizeMode: 'contain'
    },
    cityContainer: {
        position: 'absolute',
        top: '20%',
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
    home: {
        height: 100,
        width: 100, 
        resizeMode: 'contain'
    },
});

export default ListPage;
