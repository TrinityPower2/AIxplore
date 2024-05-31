import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import axios from 'axios';

export default function App() {

  const fetchData = async () => {
    try {
      let response = await fetch('http://16.16.96.254/');
      let json = await response.json();
      Alert.alert("Response from server", json.message);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to connect to backend");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Appuyer ici" onPress={fetchData}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
