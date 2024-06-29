import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Pressable, Dimensions, FlatList, Alert } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { CommonActions } from '@react-navigation/native';
import { URL_API } from '../Variable';


const { width, height } = Dimensions.get('window');

const WelcomeForm = ({ route, navigation }) => {
  const { user } = route.params;
  const [userAnswers, setUserAnswers] = useState([, , ]);

  const data = [
    { id: '1', title: 'La Tour Eiffel', image: 'https://s.francaisfacile.rfi.fr/media/display/b5f7677a-6368-11ee-a106-005056bfb2b6/Tour-Eiffel.jpg' },
    { id: '2', title: 'Musée du Louvre', image: 'https://presse.louvre.fr/wp-content/uploads/2022/05/1651502318_cour-napolon-et-pyramide-2009-muse-du-louvre-stphane-olivier-pyramide-du-louvre-arch-impei-muse-du-louvre.jpg' },
    { id: '3', title: 'Château de Versailles', image: 'https://www.helifirst.fr/wp-content/uploads/2017/02/VERSAILLES-e1486630846255.jpg' },
    { id: '4', title: 'Cimetière du père Lachaise', image: 'https://lelephant-larevue.fr/wp-content/uploads/2018/11/0-Ouverture-1-HEMIS_0143949.jpg' },
    { id: '5', title: 'Philharmonie de Paris', image: 'https://philharmoniedeparis.fr/themes/custom/pdp_theme/images/discover/philharmonie/carousel-intro/01_VUE-EXTERIEURE-FACADE-W-BEAUCARDET-08.jpg' },
    { id: '6', title: 'Musée du quai Branly', image: 'https://www.familinparis.fr/wp-content/uploads/photos-partenaires/musee-du-quai-branly-Batiment-2-%C2%A9musee-du-quai-Branly-Jacques-Chirac-photo-Vincent-Mercier.jpg' },
    { id: '7', title: 'Cathédrale ND de Paris', image: 'https://revivre-notre-dame.fr/wp-content/uploads/2021/11/DR-notre-dame-5310767_1920-1024x683.jpg' },
    { id: '8', title: 'Hôtel de ville de Paris', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/H%C3%B4tel_ville_fa%C3%A7ade_principale_Paris_11.jpg/1200px-H%C3%B4tel_ville_fa%C3%A7ade_principale_Paris_11.jpg' },
    { id: '9', title: 'Parc de la Villette', image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Parc_de_la_Villette%2C_Paris_2010.jpg' },
    { id: '10', title: 'Château de Vincennes', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Vincennes_-_Chateau_02.jpg' },
    { id: '11', title: 'Grand Palais', image: 'https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/primary/isejdmd8ox6attvfqjkg' },
    { id: '12', title: 'Musée d\'Orsay', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Mus%C3%A9e_d%27Orsay%2C_North-West_view%2C_Paris_7e_140402.jpg' },
    { id: '13', title: 'Basilique du sacré-coeur de Montmartre', image: 'https://exjb9o85thm.exactdn.com/uploads/2023/07/03093118/basilique-butte.jpg?lossy=0&quality=90&webp=90&ssl=1' },
    { id: '14', title: 'Espace Rambouillet', image: 'https://sensationsvoyage.com/wp-content/uploads/2017/11/sensations-voyage-photo-experiences-espace-rambouillet-odyssee-verte.jpg' },
    { id: '15', title: 'Musée de l’air et de l’espace', image: 'https://static.actu.fr/uploads/2020/10/459917-10150601051648807-1336787520-o.jpg' },
  ];

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleValidate = () => {
    console.log(userAnswers)
    if (userAnswers.some(v => v === undefined) || userAnswers.length < 15) {
      console.log(userAnswers);
      Alert.alert(`Vous n'avez pas noté tous les lieux !!! 😒`);
    } else {
      console.log(userAnswers);
      const API_URL = URL_API + 'welcomeForm';

      try {
          const response = fetch(API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({"uid": user.uid, "score":userAnswers}),
          });
          response.json();
      } catch (error) {
          console.error('Error sending data to server:', error);
      }


      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home', params: { user: user } }],
        })
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.ratingText}>Envie de visiter: {userAnswers[index]}/5</Text>
      <StarRating
        color="#5db9f8"
        emptyColor="#FFFFFF"
        size={40}
        rating={userAnswers[index]}
        onChange={(rating) => handleAnswer(index, rating)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={require('../assets/real_logo.png')} />
        <Image style={styles.iconProfil} source={require('../assets/icon_profil.png')} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.contentContainer}>
        <Pressable style={styles.button} onPress={handleValidate}>
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
  contentContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placePicture: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  ratingText: {
    color: '#FFFFFF',
    fontStyle: 'italic',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5db9f8',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: height * -0.3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  image: {
    width: '80%',
    height: height * 0.2
  },
  title: {
    marginTop: height * 0.05,
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default WelcomeForm;
