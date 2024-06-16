import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../AIxplore/js/Login';
import NearbySearch from '../AIxplore/js/NearbySearch';
import Register from '../AIxplore/js/Register';
import WelcomePage from '../AIxplore/js/WelcomePage';
import WelcomeForm from '../AIxplore/js/WelcomeForm';
import List from '../AIxplore/js/List';
import RatingForm from '../AIxplore/js/RatingForm';
import Filters from '../AIxplore/js/Filters';

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
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="RatingForm" component={RatingForm} />
                <Stack.Screen name="Filters" component={Filters} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
