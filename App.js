import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppDrawer from './app/navigation/AppDrawer';
import {Provider as PaperProvider} from 'react-native-paper';
import StackNavigator from './app/navigation/StackNavigator';

function App(props) {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
