import React, { useContext, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Login/SignIn';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import GlassBox from '../../components/GlassBox';
import TextInput from '../../components/TextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import { api, tokenHelpers } from '../../services/api';

export default function SignIn({ navigation, onChangeScreen }) {
  const { theme } = useTheme();
  const { setUser } = useContext(AppContext);
  const styles = createStyles(theme);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const credentials = {
        login: formData.email.toLowerCase().trim(),
        senha: formData.password,
      };

      console.log('📤 Tentando login:', { login: credentials.login });
      const response = await api.login(credentials);
      console.log('✅ Login realizado com sucesso:', response);

      if (response.access_token) {
        await tokenHelpers.save(response.access_token);
      }

      setUser({
        login: response.user.login,
        email: response.user.email || formData.email,
        tag: response.user.tag,
        plan: response.user.plan,
        token_duration: response.token_duration,
        expires: response.expires,
      });

      navigation.replace('Home');

    } catch (error) {
      console.error('❌ Erro no login:', error);

      let errorMsg = 'Erro ao fazer login. Tente novamente.';
      if (error.status === 401) {
        errorMsg = 'Email ou senha incorretos.';
      } else if (error.status === 429) {
        errorMsg = 'Muitas tentativas. Aguarde um momento.';
      } else if (error.status === 0) {
        errorMsg = 'Erro de conexão. Verifique sua internet.';
      }

      setErrorMessage(errorMsg);
      Alert.alert('Erro no Login', errorMsg);

    } finally {
      setLoading(false);
    }
  };

  const handleGoToScreen = (page) => {
    onChangeScreen(page);
  };

  const isFormValid = 
    formData.email.trim().length > 0 && 
    formData.password.length >= 6;

  return (
    <View style={styles.container}>
      <Logo width={50} height={34} />

      <WelcomeText title="Login" />

      <View style={styles.TextREGISTER}>
        <WelcomeText 
          subtitle="Ainda não tem um e-mail cadastrado? Crie sua conta aqui"
          linkText="Crie sua conta aqui"
          onLinkPress={() => handleGoToScreen('REGISTER')}
        />
      </View>

      <View style={styles.TextFORGOT}>
        <WelcomeText 
          subtitle="Esqueceu sua senha? Recupere sua senha aqui" 
          linkText="Recupere sua senha aqui"
          onLinkPress={() => handleGoToScreen('FORGOT_PASSWORD')}
        />
      </View>

      <GlassBox>
        <TextInput
          placeholder='Nome ou E-mail'
          value={formData.email}
          autoCapitalize="none"
          disabled={loading}
          keyboardType="email-address"
          onChangeText={(text) => {
            setFormData({...formData, email: text});
            setErrorMessage('');
          }}
        />

        <TextInput
          placeholder='Senha'
          value={formData.password}
          secureTextEntry={true}
          showPasswordToggle={true}
          disabled={loading}
          onChangeText={(text) => {
            setFormData({...formData, password: text});
            setErrorMessage('');
          }}
        />

        {errorMessage ? (
          <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
        ) : <View style={styles.space} />}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Entrando...</Text>
          </View>
        ) : (
          <ButtonPrimary 
            title='Login'
            onPress={handleLogin}
            disabled={!isFormValid}
            width={220}
          />
        )}
      </GlassBox>
    </View>
  );
}