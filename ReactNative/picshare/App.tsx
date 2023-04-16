import React from 'react';
import { View, Text } from 'react-native';
import Login from './Pages/Login';
import { gql } from 'graphql-tag';

const handleLogin = async (email: string, password: string) => {
  console.log("Email: " + email + " Password: " + password);
  try {
    
    const response = await fetch('https://5fc3-24-141-188-182.ngrok.io/graphql', {
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
      console.log("Successful Login");
    }

    // Do something with the response data
  } catch (error) {
    console.error(error);
  }
};


export default function App() {
  return (
    <View>
      <Login onLogin={handleLogin} />
    </View>
  );
}
