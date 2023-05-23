import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './Pages/Login';
import MainPage from './Pages/Main';
import SignupPage from './Pages/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false, headerLeft:() => null }}/>
      </Stack.Navigator>


    </NavigationContainer>
  );
}
