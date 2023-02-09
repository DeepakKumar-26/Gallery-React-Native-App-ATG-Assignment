import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View style={styles.drawerImage}>
        <Image
          source={require('../assets/AppLogo.png')}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;
const styles = StyleSheet.create({
  drawerImage: {
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: -4,
    padding: 10,
    backgroundColor: 'lightgrey',
  },
  image: {
    height: 150,
    width: 150,
  },
});
