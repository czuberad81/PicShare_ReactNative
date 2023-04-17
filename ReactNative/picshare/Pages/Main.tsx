import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from './MapView';

const TabBar = createBottomTabNavigator();

const Main = () => {
  return (
    
    <TabBar.Navigator>
        <TabBar.Screen name = "MapView" component={MapView} />

    </TabBar.Navigator>
    
  );
}

export default Main;