import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticatedNavigator from '../auth_nav/AuthenticatedNavigator';
import UnAthenticatedNavigator from '../unauth_nav/UnAthenticatedNavigator';
import SplashScreen from '../../screens/splash_screen/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name="UnAuth" component={UnAthenticatedNavigator} />
        <Stack.Screen name="Auth" component={AuthenticatedNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
