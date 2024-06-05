import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/real_logo.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5D4E5',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    }
});

export default LandingPage;
