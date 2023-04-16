import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';
type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

export default function Login(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    props.onLogin(email, password);
  };

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tailwind`p-8 w-full max-w-sm`}>
      <Text style={tailwind`text-5xl font-bold mb-6 text-white`}>Login</Text>
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

        <Pressable
          onPress={handleLogin}
          style={tailwind`h-12 bg-orange-500 rounded-md flex flex-row justify-center items-center px-6`}>
          <View style={tailwind`flex-1 flex items-center`}>
            <Text style={tailwind`text-white text-base font-medium`}>Login</Text>
          </View>
        </Pressable>
      </View>
      
      
    </View>
  );
}
