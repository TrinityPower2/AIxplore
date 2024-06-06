import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../AIxplore/js/Login';
import NearbySearch from '../AIxplore/js/NearbySearch';
import Register from '../AIxplore/js/Register';
import List from '../AIxplore/js/List';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="NearbySearch" component={NearbySearch} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="List" component={List} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
