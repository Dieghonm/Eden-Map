import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Login/TermsScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import Checkbox from '../../components/Checkbox';

export default function TermsScreen({ navigation }) {
  const { theme } = useTheme();
  const { setUser } = useContext(AppContext);
  const styles = createStyles(theme);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      setUser({ name: 'Usuário', acceptedTerms: true });
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.card}>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAccepted(!accepted)}
      >
        <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
          {accepted && <Text style={{ color: '#FFFFFF' }}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>
          Li e aceito os termos de uso
        </Text>
      </TouchableOpacity>

      <Checkbox />

      <ButtonPrimary
        title="Criar minha conta"
        onPress={handleAccept}
        disabled={!accepted}
      />
      <ButtonSecundary
        title="Login"
        onPress={handleAccept}
        disabled={!accepted}
      />
    </View>
  );
}
