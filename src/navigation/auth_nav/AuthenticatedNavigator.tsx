import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../../screens/todo_list/TodoListScreen';

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name='LodoList' component={TodoListScreen} />
    </Stack.Navigator>
  )
}

export default AuthenticatedNavigator;