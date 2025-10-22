import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AppContext } from '../context/AppProvider';

export default function HomeScreen() {
  const { user, setUser } = useContext(AppContext);
  return (
    <View>
        {/* <Text>📍 Tela de Login</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}
