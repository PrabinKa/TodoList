import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../../screens/todo_list/TodoListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name='TodoList' component={TodoListScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator;