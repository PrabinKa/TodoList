import React from 'react';
import LoginScreen from '../../screens/login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UnAthenticatedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default UnAthenticatedNavigator;