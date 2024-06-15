import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable, Alert } from 'react-native';

const ListPage = ({ navigation }) => {
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
        { id: 10, name: "Tenth Place", detail: "Participant", image: require('../assets/icon_image.png') },
        { id: 11, name: "Eleventh Place", detail: "Participant", image: require('../assets/icon_image.png') }
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
        navigation.navigate('Login');
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
            <Image style={styles.logo} source={require('../assets/real_logo.png')} />
            
                
                <View style={styles.cityContainer}>
                    <View style={{flex: 1}}>
                    <CustomInput
                            imageSource={require('../assets/icon_location.png')}
                            onChangeText={setCity}
                            value={city}
                            placeholder="Paris"
                        />
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Pressable onPress={() => navigation.navigate('Filters')}>
                            <View style={styles.iconBox}>
                                <Image source={require('../assets/icon_filters.png')} style={[styles.icon, {marginLeft: 10}]} />
                            </View>
                        </Pressable>
                    </View>
                </View>
       
            <ScrollView style={styles.listContainer}>
                {data.map((item, index) => (
                    <View key={item.id} style={[styles.item, getStyleForPosition(index + 1)]}>
                        <Image source={item.image} style={styles.itemImage}></Image>
                        <Text style={{ fontSize: getStyleForPosition(index + 1).fontSize, color: getStyleForPosition(index + 1).color }} 
                            onPress={() => createPopup(index)} >
                            {item.name} - {item.detail}
                        </Text>
                    </View>
                ))}
            </ScrollView>
            <Pressable onPress={handleHome} style={{ position: 'absolute', bottom: 10 }}>
                <Image style={styles.home} source={require('../assets/icon_home.png')} />
            </Pressable>
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
    logo: {
        marginTop: 20,
        width: 225,
        height: 225,
        resizeMode: 'contain'
    },
    cityContainer: {
        marginTop: -40,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#384454',
        padding: 10,
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
        color: '#000000'
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    iconBox: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 10,
    },
    home: {
        width: 100, 
        height: 100,
        resizeMode: 'contain'
    },
    listContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 130,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 5,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain'
    }
});

export default ListPage;
