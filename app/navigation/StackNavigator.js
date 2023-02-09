import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Photo from '../screens/Photo';
import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator();

function StackNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={AppDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
