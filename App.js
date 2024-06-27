import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../AIxplore/js/Login';
import NearbySearch from '../AIxplore/js/NearbySearch';
import Register from '../AIxplore/js/Register';
import WelcomePage from '../AIxplore/js/WelcomePage';
import WelcomeForm from '../AIxplore/js/WelcomeForm';
import Loading from '../AIxplore/js/Loading';
import List from '../AIxplore/js/List';
import RatingForm from '../AIxplore/js/RatingForm';
import HomePage from './js/Home';
import InfoPopup from './js/InfoPopup';
import HomePage2 from '../AIxplore/js/Home2';
import History from '../AIxplore/js/History';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NearbySearch" component={NearbySearch} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="WelcomePage" component={WelcomePage} />
                <Stack.Screen name="WelcomeForm" component={WelcomeForm} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="RatingForm" component={RatingForm} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="InfoPopup" component={InfoPopup} />
                <Stack.Screen name="Home2" component={HomePage2} />
                <Stack.Screen name="History" component={History} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
