import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';

const HomePage = ({ navigation }) => {
    const handlePressButton1 = () => {
        Alert.alert(
            "Fonctionnalité à venir",
            "Les profils ne sont pas encore implémentés",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
        );
    };

    const handlePressButton2 = () => {
        navigation.navigate('List');
    };

    const handlePressButton3 = () => {
        Alert.alert(
            "Fonctionnalité à venir",
            "Les pramètres ne sont pas encore implémentés",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.sloganContainer}>
                <Text style={styles.slogan}>Aixplorez intelligemment !</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/icon_location.png')} style={styles.logo} />
            </View>
            <View style={styles.buttonsContainer}>
                <Pressable style={styles.button} onPress={handlePressButton1}>
                    <Text style={styles.buttonText}>Profil</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handlePressButton2}>
                    <Text style={styles.buttonText}>Go</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handlePressButton3}>
                    <Text style={styles.buttonText}>Paramètres</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#384454',
        padding: 20,
    },
    sloganContainer: {
        marginTop: 40,
    },
    slogan: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#384454',
    },
});

export default HomePage;