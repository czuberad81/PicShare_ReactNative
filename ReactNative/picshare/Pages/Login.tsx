import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import tailwind from 'twrnc';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// type LoginProps = {
//   navigation: StackNavigationProp<ParamListBase, 'Login'>;
//   onLogin: (email: string, password: string) => void;
// };

type Props = {
  navigation: any;
}
const Login = ({navigation}: Props) => {
  //const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("Email: " + email + " Password: " + password);
  try {
    
    const response = await fetch('https://b7ee-24-141-188-182.ngrok.io/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation {
          login(email: "${email}", password: "${password}") {
            id
            email
          }
        }
      `,
        variables: {
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
      console.log("Successful Login");
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

export default Login;