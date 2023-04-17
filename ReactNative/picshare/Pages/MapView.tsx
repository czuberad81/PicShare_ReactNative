import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function MapView() {
  return (
    <View style={tw`flex-1 bg-gray-800 items-center justify-center`}>
      <Text style={tailwind`text-5xl font-bold mb-6 text-white`} >MapView Page</Text>
    </View>
  );
}