import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Login/TermsScreen';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';

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
      <Text style={styles.title}>Termos de Uso</Text>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.termsText}>
          Bem-vindo ao EdenMap! Ao usar nosso aplicativo, você concorda com os seguintes termos:
        </Text>
        <Text style={styles.termsText}>
          1. Você deve ter pelo menos 18 anos de idade para usar este aplicativo.
        </Text>
        <Text style={styles.termsText}>
          2. Você é responsável por manter a confidencialidade de sua conta.
        </Text>
        <Text style={styles.termsText}>
          3. Não compartilhe conteúdo ofensivo ou ilegal.
        </Text>
        <Text style={styles.termsText}>
          4. Reservamo-nos o direito de modificar estes termos a qualquer momento.
        </Text>
        <Text style={styles.termsText}>
          5. Seus dados serão tratados conforme nossa política de privacidade.
        </Text>
      </ScrollView>

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

      <ButtonPrimary
        title="Continuar"
        onPress={handleAccept}
        disabled={!accepted}
      />
      <ButtonSecundary
        title="Continuar"
        onPress={handleAccept}
        disabled={!accepted}
      />
    </View>
  );
}
