import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../AIxplore/js/Landing';
import Login from '../AIxplore/js/Login';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
