import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppDrawer from './app/navigation/AppDrawer';

import StackNavigator from './app/navigation/StackNavigator';

function App(props) {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
