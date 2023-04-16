import React from 'react';
import { View, Text } from 'react-native';
import { gql } from 'graphql-tag';
import tailwind from 'twrnc';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './Pages/Login';
import MainPage from './Pages/Main';

const Stack = createStackNavigator();
// const handleLogin = async (email: string, password: string) => {
//   console.log("Email: " + email + " Password: " + password);
//   try {
    
//     const response = await fetch('https://5fc3-24-141-188-182.ngrok.io/graphql', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: `
//         mutation {
//           login(email: "${email}", password: "${password}") {
//             id
//             email
//           }
//         }
//       `,
//         variables: {
//           email,
//           password,
//         },
//       }),
//     });

//     const { data, errors } = await response.json();
//     if (errors) {
//       throw new Error('Invalid email or password(React  )');
//     }
//     else{
//       //Implement Navigation to Main Page.
//       console.log("Successful Login");
//     }

//     // Do something with the response data
//   } catch (error) {
//     console.error(error);
//   }
// };


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false, headerLeft:() => null }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
