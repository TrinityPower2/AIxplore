import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { MultipleSelectList } from 'react-native-dropdown-select-list'


const Filters = ({ navigation }) => {
    
    const [proximity, setProximity] = useState(1);
    const [selected, setSelected] = useState([]);

    const mockTags = [
        {key:'1', value:'Musée'},
        {key:'2', value:'Théâtre'},
        {key:'3', value:'Monument'},
        {key:'5', value:'Architecture'},
    ]


    const handleSubmit = () => {
        if (proximity && selected.length > 0) {
            alert(`Vous avez choisi un rayon de ${proximity} km et les lieux suivants: ${selected}`);
        } else {
            alert('Erreur', 'Veuillez sélectionner un rayon et un type de lieu.');
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/real_logo.png')}></Image>
            <View style={styles.registerContainer}>
                <Text style={styles.textButton}>Proximité: {proximity} km</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={1}
                    maximumValue={100}
                    minimumTrackTintColor="#5db9f8"
                    maximumTrackTintColor="#FFFFFF"
                    thumbTintColor="#000000"
                    step={1}
                    value={proximity}
                    onValueChange={(value) => setProximity(value)}
                />

                <MultipleSelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={mockTags} 
                    save="value"
                    label="Places"
                    style={{marginTop: 15}}
                    boxStyles={{backgroundColor: '#FFFFFF'}}
                    dropdownStyles={{backgroundColor: '#FFFFFF'}}
                />

                <Pressable style={[styles.button, {marginTop: 15}]} onPress={() => navigation.navigate('List')}>
                    <Text style={styles.textButton}>Valider</Text>
                </Pressable>
            </View>
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
    logo: {
        top: -225,
        width: 225,
        height: 225,
        resizeMode: 'contain'
    },
    registerContainer: {
        position: 'absolute',
        top: '35%',
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
    button: {
        top: '7%',
        width: '80%',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#384454'
    },
    textButton: {
        color: '#FFFFFF',
        textAlign: 'center',
        padding: 10
    }
});

export default Filters;
