import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import Settings from '../screens/Settings';
import About from '../screens/About';
import Photo from '../screens/Photo';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();
function AppDrawer(props) {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default AppDrawer;
