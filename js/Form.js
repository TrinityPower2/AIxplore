// Pour l'instant code ChatGPT, il faut encore que je le valide et le comprenne

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const RatingForm = ({route, navigation }) => {
  const { placeName } = route.params;
  const [rating, setRating] = useState(null);

  const handleSubmit = () => {
    if (rating) {
      Alert.alert('Merci pour votre évaluation!', `Vous avez noté ce lieu: ${rating}/5`);
    } else {
      Alert.alert('Erreur', 'Veuillez sélectionner une note.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vous venez de visiter : {placeName}</Text>
      <Text style={styles.title}>Notez le lieu que vous venez de visiter</Text>
      <RNPickerSelect
        onValueChange={(value) => setRating(value)}
        items={[
          { label: "1 - Une mauvaise expérience", value: 1 },
          { label: "2 - Pas super", value: 2 },
          { label: "3 - Ça va", value: 3 },
          { label: "4 - J'ai bien aimé", value: 4 },
          { label: "5 - J'ai adoré !", value: 5 },
        ]}
        placeholder={{ label: 'Sélectionnez une note...', value: null }}
        style={pickerSelectStyles}
      />
      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default RatingForm;
