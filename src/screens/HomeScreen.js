import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/HomeScreen';
import Header from './Header/Header';
import Starting from './Starting/Starting';
import Home from './Home/Home';

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [beginner, setbeginner] = useState(true);


  return (
    <SafeAreaView>
      <Header />
      <View >
        {beginner ? <Starting />: <Home />}
      </View>
    </SafeAreaView>
  );
}
