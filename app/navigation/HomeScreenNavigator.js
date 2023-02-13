import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchPhotos from '../screens/SearchPhotos';
import MaterialCommuninyIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function HomeScreenNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Photos"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommuninyIcon name="image" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPhotos}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommuninyIcon name="magnify" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
