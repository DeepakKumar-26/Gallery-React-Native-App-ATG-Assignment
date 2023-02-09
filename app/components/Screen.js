import React from 'react';
import {View, StyleSheet} from 'react-native';

function Screen({children}) {
  return <View style={styles.screen}>{children}</View>;
}

export default Screen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
    // backgroundColor: 'crimson',
  },
});
