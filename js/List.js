import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable, Alert, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ListPage = ({ route, navigation }) => {
    const [city, setCity] = useState('');

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

    const getStyleForPosition = (position) => {
        switch(position) {
            case 1: return { backgroundColor: 'gold', fontSize: 24, color: 'black' };
            case 2: return { backgroundColor: 'silver', fontSize: 20, color: 'black' };
            case 3: return { backgroundColor: '#c87533', fontSize: 18, color: 'black' };
            default: return { backgroundColor: 'white', fontSize: 16, color: 'black' };
        }
    };

    const handleHome = () => {
      navigation.navigate('Home');
    };

    const goToNote = (index) => {
        navigation.navigate('RatingForm', { placeName: data[index].name });
    };

    const createPopup = (index) => {
        const item = data[index];
        Alert.alert(
            "Détails du lieu",
            `${item.name}\n${item.detail}`,
            [
                { text: "Annuler", style: "cancel" },
                { text: "Noter", onPress: () => navigation.navigate('RatingForm', { placeName: data[index].name })}
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image style={styles.logo} source={require('../assets/real_logo.png')} />
                <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
            </View>
            <Text style={styles.title}>Liste des lieux à visiter</Text>
            <View style={styles.cityContainer}>
                <View style={{ flex: 1 }}>
                    <CustomInput
                        imageSource={require('../assets/icon_location.png')}
                        onChangeText={setCity}
                        value={city}
                        placeholder="Paris"
                    />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Pressable onPress={() => navigation.navigate('Filters')}>
                        <View style={styles.iconBox}>
                            <Image source={require('../assets/icon_filters.png')} style={[styles.icon, { marginLeft: 10 }]} />
                        </View>
                    </Pressable>
                </View>
            </View>
    
            <ScrollView style={styles.listContainer}>
                {data.map((item, index) => (
                    <View key={item.id} style={[styles.item, getStyleForPosition(index + 1)]}>
                        <Image source={item.image} style={styles.itemImage}></Image>
                        <Text
                            style={{ fontSize: getStyleForPosition(index + 1).fontSize, color: getStyleForPosition(index + 1).color }}
                            onPress={() => createPopup(index)}>
                            {item.name} - {item.detail}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const CustomInput = ({ imageSource, onChangeText, value, placeholder }) => (
    <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.icon} />
        <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#384454',
    },
    topContainer: {
        width: '100%',
        height: height * 0.1,
        backgroundColor: '#232B35',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: height * 0.03
    },
    logo: {
        marginTop: "5%",
        width: width * 0.3,
        height: '100%',
        resizeMode: 'contain',
    },
    iconProfil: {
        marginTop: "5%",
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        marginBottom: height * 0.03
    },
    cityContainer: {
        marginTop: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        paddingVertical: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain'
    },
});

export default ListPage;
