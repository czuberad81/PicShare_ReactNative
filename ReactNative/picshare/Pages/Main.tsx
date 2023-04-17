import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapView from './MapView';
import ProfileView from './Profile';

const TabBar = createBottomTabNavigator();

const Main = () => {
  return (
    
    // <TabBar.Navigator
    // >
    //     <TabBar.Screen name = "MapView" component={MapView} />
    //     <TabBar.Screen name = "ProfileView" component={ProfileView} />

    // </TabBar.Navigator>
   
    
      <TabBar.Navigator

        screenOptions={({ route }) => ({

            // tabBarIcon: ({ color, size }) => {
            //     let iconName;
    
            //     if (route.name === 'Home') {
                
            //     } else if (route.name === 'Profile') {
                  
            //       //return <Ionicons name={iconName} size={size} color={color} style={tw`mb-1`} />;
            //     }
            //   },
          
          tabBarActiveTintColor: '#FF6347',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: tw`bg-gray-800`,
        })}
      >
        <TabBar.Screen name="MapView" component={MapView} options={{ headerShown: false, headerStyle: {
      borderBottomWidth: 0,
    },}}/>
        <TabBar.Screen name="ProfileView" component={ProfileView} options={{ headerShown: false, headerStyle: {
      borderBottomWidth: 0,
    }, }}/>
      </TabBar.Navigator>
    
  );
}

export default Main;