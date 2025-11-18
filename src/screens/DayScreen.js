import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/DayScreen';
import ButtonPrimary from '../components/ButtonPrimary';

export default function DayScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [diaAtual] = useState(1); // Dia 1 a 7
  const [semanaAtual] = useState(1); // Semana 1 a 12

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>
        Dia <Text style={styles.highlight}>{diaAtual}</Text>
      </Text>

      <Text style={styles.info}>
        Semana <Text style={styles.highlight}>{semanaAtual}</Text>
      </Text>

      <ButtonPrimary
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
