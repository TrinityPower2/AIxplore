import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { auth } from '../Firebase';

const NearbySearchPage = ({ route, navigation }) => {
    const { user } = route.params;

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [museums, setMuseums] = useState([]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {user ? user.email : 'Guest'}!</Text>
            <Button title="Logout" onPress={handleLogout} />
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
    text: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});

export default NearbySearchPage;
