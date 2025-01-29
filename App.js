import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from './src/Login_Register';
import { Tab } from './src/Tab'
import { firebase } from './src/utils/firebase'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login'}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title: 'Register'}}/>      
        <Stack.Screen name="HomeScreen" component={Tab} options={{title: 'Home'}}/>      
      </Stack.Navigator>
    </NavigationContainer>
  );
}