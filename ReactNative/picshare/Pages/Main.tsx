import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';

export default function Main() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tailwind`text-5xl font-bold mb-6 text-white`} >Main Page</Text>
    </View>
  );
}