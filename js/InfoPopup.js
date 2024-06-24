import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // Assurez-vous d'installer @expo/vector-icons
import StarRating from 'react-native-star-rating-widget';

const { width, height } = Dimensions.get('window');

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

    const doNothing = () => {};

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
                <Image style={styles.logo} source={require('../assets/real_logo.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
            </View>

            <View style={styles.contentContainer} >
                <Image style={styles.placePicture} source={data[placeID].image} />
                <Text style={styles.placeName}>{data[placeID].name}</Text>
                <Text style={styles.description}>{data[placeID].description}</Text>
            </View>
            <Pressable style={styles.infoButton} onPress={handleInfoPress}>
                <Text style={styles.buttonText}>Infos</Text>
            </Pressable>
            
            <Text style={styles.ratingText}>Note globale : {data[placeID].rating}/5</Text>
            <StarRating
                color="#5db9f8"
                emptyColor="#FFFFFF"
                size={40}
                rating={data[placeID].rating}
                onChange={doNothing}
                enableSwiping={false}
                style={styles.ratingContainer}
            />

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
      width: '100%',
      height: height * 0.1,
      backgroundColor: '#384454',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginBottom: height * 0.03,
    },
    logo: {
      marginTop: '5%',
      width: width * 0.3,
      height: '100%',
      resizeMode: 'contain',
    },
    iconProfil: {
      marginTop: '5%',
      width: width * 0.1,
      height: width * 0.1,
      resizeMode: 'contain',
    },
    contentContainer: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
      width: '90%',
      alignItems: 'center',
    },
    placePicture: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 5,
    },
    placeName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
    },
    infoButton: {
      backgroundColor: '#5db9f8',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 15,
      width: '40%',
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      marginTop: -20,
    },
    ratingText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 18,
      fontStyle: 'italic',
    },
    star: {
      marginHorizontal: 5,
    },
    backButton: {
      backgroundColor: '#5db9f8',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 40,
      width: '40%',
    },
    buttonText: {
      fontSize: 16,
      color: '#fff',
    },
  });
  
export default InfoPopup;
