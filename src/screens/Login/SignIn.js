import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Login/SignIn';
import Logo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function SignIn({ navigation, onChangeScreen }) {
  const { theme } = useTheme();
  const { setUser } = useContext(AppContext);
  const styles = createStyles(theme);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    // Validação básica
    if (formData.email.includes('@') && formData.password.length >= 6) {
      setUser({ 
        name: formData.email.split('@')[0], 
        email: formData.email 
      });
      navigation.replace('Home');
    }
  };

  const isFormValid = 
    formData.email.includes('@') && 
    formData.password.length >= 6;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Logo width={53} height={35} />
        
        <Text style={styles.title}>Login</Text>

        <View style={styles.linksContainer}>
          <TouchableOpacity 
            onPress={() => onChangeScreen && onChangeScreen('FORGOT_PASSWORD')}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>
              Ainda não tem um e-mail cadastrado?{'\n'}
              <Text style={styles.linkHighlight}>Crie sua conta aqui</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => onChangeScreen && onChangeScreen('FORGOT_PASSWORD')}
            activeOpacity={0.7}
          >
            <Text style={styles.linkText}>
              Esqueceu sua senha?{'\n'}
              <Text style={styles.linkHighlight}>Recupere sua senha aqui</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputsContainer}>
          <TextInput
            placeholder='E-mail'
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />

          <TextInput
            placeholder='Senha'
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={true}
            showPasswordToggle={true}
          />
        </View>

        <ButtonPrimary
          title='Login'
          onPress={handleLogin}
          disabled={!isFormValid}
        />
      </View>
    </View>
  );
}