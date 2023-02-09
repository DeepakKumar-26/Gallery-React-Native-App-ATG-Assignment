import React from 'react';
import Lottie from 'lottie-react-native';
import {Text, View, StyleSheet, Image} from 'react-native';

function ActivityIndicator({visible = true}) {
  if (!visible) return null;

  return (
    <Lottie
      source={require('../assets/animations/loading.json')}
      autoPlay
      loop
    />
  );
}

export default ActivityIndicator;
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
  },
});
