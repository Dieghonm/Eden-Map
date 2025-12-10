import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Explorer/MissoesScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function MissoesScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedTab, setSelectedTab] = useState('andamento');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View>
        <Text>O que está procurando?</Text>
      </View>
      
      <GlassBox>

      <TouchableOpacity>
        <Text>Missão em andamento</Text>
        <Text>Status da missão atual</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Missões passadas</Text>
        <Text>Emblemas e Descrições</Text>
      </TouchableOpacity>


      </GlassBox>

      <ButtonPrimary
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}