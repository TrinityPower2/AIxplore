import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const Filters = ({ navigation }) => {
  const [proximity, setProximity] = useState(1);
  const [selected, setSelected] = useState([]);

  const mockTags = [
    { key: '1', value: 'Musée' },
    { key: '2', value: 'Théâtre' },
    { key: '3', value: 'Monument' },
    { key: '5', value: 'Architecture' },
  ];

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/real_logo.png')} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Filtres</Text>
        <Text style={styles.labelText}>Proximité: {proximity} km</Text>
        <Slider
          style={{ width: 200, height: 40}}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor="#5db9f8"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#000000"
          step={1}
          value={proximity}
          onValueChange={(value) => setProximity(value)}
        />

        <View style={{marginTop: 20}}>
            <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={mockTags}
            save="value"
            value={selected}
            label="Lieux"
            boxStyles={{ backgroundColor: '#FFFFFF' }}
            dropdownStyles={{ backgroundColor: '#FFFFFF' }}
            />
        </View>

        <Pressable style={[styles.button, { marginTop: 30 }]} onPress={() => navigation.navigate('List')}>
          <Text style={styles.buttonText}>Valider</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#384454',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 225,
    height: 225,
    resizeMode: 'contain',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5db9f8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Filters;
