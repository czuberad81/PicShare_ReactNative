import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type Props = {
    navigation: any;
  }

  
const Signup = ({navigation}: Props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = async () => {
        console.log("Email: " + email + " Password: " + password);
    try {
        
        const response = await fetch('https://dec9-2001-1970-499a-eb00-f121-6900-c4dd-2346.ngrok.io/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation {
                signUp(name: "${name}", email: "${email}", password: "${password}") {
                id
                name
                email
            }
            }
        `,
            variables: {
            name,
            email,
            password,
            },
        }),
        });

        const { data, errors } = await response.json();
        if (errors) {
        throw new Error('Invalid email or password(React  )');
        }
        else{
        //Implement Navigation to Main Page.
        console.log("Successful Signup");
        navigation.navigate('Main');

        }

        // Do something with the response data
    } catch (error) {
        console.error(error);
    }
    };
  return (
    <View style={tw`flex-1 bg-gray-800 flex-1 items-center justify-center`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
      <Text style={tailwind`text-5xl font-bold mb-6 text-white`}>Signup</Text>
      <TextInput
        placeholderTextColor="#F97316"
        placeholder="Enter Name"
        style={tailwind`w-full border-2 border-orange-500 bg-gray-800 text-orange-500 rounded-md h-12 px-4 mb-4`}  
        value={name} 
        onChangeText={(text) => setName(text)} 
      />
      <TextInput
        placeholderTextColor="#F97316"
        placeholder="Enter Email"
        style={tailwind`w-full border-2 border-orange-500 bg-gray-800 text-orange-500 rounded-md h-12 px-4 mb-4`}  
        value={email} 
        onChangeText={(text) => setEmail(text)} 
      />

      <TextInput
        placeholderTextColor="#F97316"
        placeholder="Enter Password"
        style={tailwind`w-full border-2 border-orange-500 bg-gray-800 text-orange-500 rounded-md h-12 px-4 mb-4`} 
        secureTextEntry value={password} 
        onChangeText={(text) => setPassword(text)} />

    <View style={tailwind`flex flex-row justify-between items-center my-8`}>

    </View>

        <Pressable
          onPress={handleSignup}
          style={tailwind`h-12 bg-orange-500 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>Signup</Text>
          </View>
        </Pressable>
      </View>
      
      
    </View>
  );
}
export default Signup;