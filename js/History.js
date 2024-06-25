import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { URL_API } from '../Variable';

const { width, height } = Dimensions.get('window');

const HistoryPage = ({ route, navigation }) => {
    const { user } = route.params;
    const [loading, setLoading] = useState(true); // État de chargement
    const [data2, setData2] = useState([]); // État pour les données récupérées depuis le serveur

    useEffect(() => {
        const sendStringToServer = async (text) => {
            const API_URL = URL_API + 'historique';

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "uid": text }),
                });

                const data = await response.json();
                console.log('Received data:', data);

                setData2(data["historique"]); 
                setLoading(false); 

            } catch (error) {
                console.error('Error sending data to server:', error);
                setLoading(false); 
                Alert.alert('Erreur', `Erreur lors du chargement des données: ${error.message}`);
            }
        };

        sendStringToServer(user.uid);

    }, [user.uid]); 



    const data = [
        { id: 1, name: "First Place", detail: "Gold", image: require('../assets/icon_image.png') },
        { id: 2, name: "Second Place", detail: "Silver", image: require('../assets/icon_image.png') },
        { id: 3, name: "Third Place", detail: "Copper", image: require('../assets/icon_image.png') },
        { id: 4, name: "Fourth Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 5, name: "Fifth Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 6, name: "Sixth Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 7, name: "Seventh Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 8, name: "Eight Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 9, name: "Ninth Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 10, name: "Tenth Place", detail: "Participant", image: require('../assets/icon_image.png') }
    ];


    const getStyleForNotation = () => {
        return { backgroundColor: 'white', fontSize: 16, color: 'black' };
        // nouvelle couleur pour les lieux notés ?
    };

    const goToNote = (index) => {
        Alert.alert(`User Email: ${user.uid}`);
        //navigation.navigate('RatingForm', { placeName: data[index].name });
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'RatingForm', params: { user: user, placeID: data2[index].lieu_id, placeName: data2[index].name}}],
            })
        );
    };

    const handleHisto = () => {
        Alert.alert(
            "",
            "Vous êtes déjà dans votre historique !",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
        );
    };

    const handleHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home', params: { user: user } }],
            })
        );
    };

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
            <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../assets/real_logo.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
            </View>
            <Text style={styles.title}>Historique de vos lieux</Text>
            
    
            <ScrollView style={styles.listContainer}>
                {data2.map((item, index) => (
                    <View key={item.id} style={[styles.item, getStyleForNotation()]}>
                        <Image source={{ uri: item.image }} style={styles.itemImage}></Image>
                        <Text
                            style={{ fontSize: getStyleForNotation().fontSize, color: getStyleForNotation().color }}
                        >
                            {item.name}
                        </Text>
                        <Pressable onPress={() => goToNote(index)} style={styles.noteButton}>
                            <Text style={styles.noteButtonText}>Noter</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.botContainer}>
                <Pressable onPress={handleHisto}>
                    <Image style={styles.iconHisto} source={require('../assets/icon_histo.png')} />
                </Pressable>
                <Pressable onPress={handleHome}>
                    <Image style={styles.iconHome} source={require('../assets/icon_home.png')} />
                </Pressable>
                <Pressable onPress={handleLogout}>
                    <Image style={styles.iconOut} source={require('../assets/icon_out.png')} />
                </Pressable>
            </View>
        </View>
    );

};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#384454',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        width: '100%',
        height: '18%',
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: height * -0.07,
        marginBottom: height * 0.03
    },
    logo: {
        width: width * 0.3,
        height: height * 0.08,
        resizeMode: 'contain',
        marginTop: height * 0.105
    },
    iconProfil: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
        marginTop: height * 0.105
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: height * 0.03
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        textAlign: 'left',
        color: '#000000',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    iconBox: {
        backgroundColor: '#1abc9c',
        padding: 10,
        borderRadius: 10,
    },
    home: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    listContainer: {
        width: '100%',
        marginTop: height * 0.02,
        marginBottom: height * 0.08
    },
    noteButton: {
        backgroundColor: '#5db9f8',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginLeft: 'auto',
    },
      noteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'space-between',
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain'
    },
    botContainer: {
        width: '100%',
        height: height * 0.08,
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0
    },
    iconHisto: {
        width: width * 0.12,
        height: width * 0.12,
    },
    iconHome: {
        marginTop: height * 0.005,
        width: width * 0.12,
        height: width * 0.12,
    },
    iconOut: {
        width: width * 0.12,
        height: width * 0.12,
    }
});

export default HistoryPage;
