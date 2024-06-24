import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // Assurez-vous d'installer @expo/vector-icons

const InfoPopup = ({ route, navigation }) => {
    const { placeID } = route.params;

    const [rating, setRating] = useState(0);

    const handleInfoPress = () => {
        Alert.alert(
            "Contact",
            "Les infos de contact seront ici",
            [{ text: "Itinéraine", onPress: () => console.log("Itinéraires Pressed") }],
            { cancelable: true }
        );
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const renderStar = (star) => {
        if (rating >= star) {
            return "star";
        } else if (rating >= star - 0.5) {
            return "star-half-o";
        } else {
            return "star-o";
        }
    };

    const data = [
        { id: 1, name: "First Place", detail: "Gold", image: require('../assets/icon_image.png'), description: "1st place description", rating: 5 },
        { id: 2, name: "Second Place", detail: "Silver", image: require('../assets/icon_image.png'), description: "2nd place description", rating: 4.5 },
        { id: 3, name: "Third Place", detail: "Copper", image: require('../assets/icon_image.png'), description: "3rd place description", rating: 4.5 },
        { id: 4, name: "Fourth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "4th place description", rating: 4 },
        { id: 5, name: "Fifth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "5th place description", rating: 3.5 },
        { id: 6, name: "Sixth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "6th place description", rating: 3 },
        { id: 7, name: "Seventh Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "7th place description", rating: 3 },
        { id: 8, name: "Eight Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "8th place description", rating: 2 },
        { id: 9, name: "Ninth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "9th place description", rating: 1.5 },
        { id: 10, name: "Tenth Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "10th place description", rating: 1 },
        { id: 11, name: "Eleventh Place", detail: "Participant", image: require('../assets/icon_image.png'), description: "11th place description", rating: 0 }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={data[placeID].image} style={styles.image} />
                <Text style={styles.description}>{data[placeID].description}</Text>
            </View>
            <Pressable style={styles.infoButton} onPress={handleInfoPress}>
                <Text style={styles.buttonText}>Infos</Text>
            </Pressable>
            
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                        key={star}
                        name={renderStar(star)}
                        size={32}
                        color="gold"
                        onPress={() => setRating(star)}
                        onLongPress={() => setRating(star - 0.5)}
                        style={styles.star}
                    />
                ))}
            </View>

            <Pressable style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.buttonText}>Retour</Text>
            </Pressable>
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
    topContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    description: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    infoButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    star: {
        marginHorizontal: 5,
    },
    backButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        color: '#384454',
    },
});

export default InfoPopup;
