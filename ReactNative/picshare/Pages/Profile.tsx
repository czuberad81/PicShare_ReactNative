import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native';
import PostCard from '../Pages/PostCard'

export default function Profile() {
    const TOP_PLACES = [
    {
      id: 1,
      image: require('../assets/temp.png'),
      title: 'Amalfi',
      location: 'Italy',
      description:
        'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
    },
    {
      id: 2,
      image: require('../assets/temp.png'),
      title: 'Granada',
      location: 'Spain',
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
    },
    {
      id: 3,
      image: require('../assets/temp.png'),
      title: 'Cherry blossoms',
      location: 'Japan',
      description:
        "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    },
  ];

  return (
    <View style={tw`flex-1 bg-gray-800 items-center justify-center`}>
      <Text style={tailwind`text-5xl font-bold mb-6 text-white`} >ProfilePage</Text>
      {/* <ScrollView>
        <PostCard list={TOP_PLACES}/>



      </ScrollView> */}
    </View>

  );
}