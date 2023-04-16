import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={(text) => setEmail(text)} />

      <Text>Password:</Text>
      <TextInput secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />

      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
}
