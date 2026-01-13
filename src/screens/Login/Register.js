import React, { useState, useContext } from 'react';
import { View, Platform, ActivityIndicator, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Login/Register';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import TextInput from '../../components/TextInput';
import InfoCard from '../../components/InfoCard';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';
import { api, tokenHelpers } from '../../services/api';
import { spacing } from '../../theme/texts';

export default function Register({ navigation, onChangeScreen }) {
  const { theme } = useTheme();
  const { setUser } = useContext(AppContext);
  const styles = createStyles(theme);

  const [showInfo, setShowInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const userRules = [' •  entre 4 - 20 caracteres'];
  const passwordRules = [
    ' •  entre 8 - 32 caracteres',
    ' •  use letras maiúsculas e minúsculas, números, sem espaçamentos'
  ];

  const validateUsername = (username) =>
    username.length >= 4 && username.length <= 20;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8 && password.length <= 32;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSpaces = !/\s/.test(password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && noSpaces;
  };

  const handleRegister = async () => {
    console.log('🚀 [REGISTER] Iniciando cadastro...');
    setLoading(true);
    setErrorMessage('');

    try {
      const userData = {
        login: formData.username.toLowerCase().trim(),
        password: formData.password,
        email: formData.email.toLowerCase().trim(),
        tag: 'cliente',
        plan: 'trial',
      };

      console.log('📤 [REGISTER] Enviando dados:', {
        login: userData.login,
        email: userData.email,
        tag: userData.tag,
        plan: userData.plan,
        // Não loga a senha por segurança
      });

      const response = await api.cadastro(userData);
      console.log('✅ [REGISTER] Resposta da API recebida:', {
        hasAccessToken: !!response.access_token,
        hasRefreshToken: !!response.refresh_token,
        hasUser: !!response.user,
        userLogin: response.user?.login,
        userEmail: response.user?.email,
      });

      // Salvar tokens
      if (response.access_token) {
        console.log('💾 [REGISTER] Salvando tokens...');
        await tokenHelpers.save(response.access_token, response.refresh_token);
        console.log('✅ [REGISTER] Tokens salvos com sucesso');
      } else {
        console.warn('⚠️ [REGISTER] Nenhum access_token recebido!');
      }

      // Salvar usuário no contexto
      const userToSave = {
        login: response.user?.login || userData.login,
        email: response.user?.email || userData.email,
        tag: response.user?.tag || userData.tag,
        plan: response.user?.plan || userData.plan,
      };

      console.log('👤 [REGISTER] Salvando usuário no contexto:', userToSave);
      await setUser(userToSave);
      console.log('✅ [REGISTER] Usuário salvo no contexto');

      console.log('🎉 [REGISTER] Navegando para Home...');
      
      // ✅ CORREÇÃO: Usar navigation corretamente
      if (navigation && navigation.replace) {
        navigation.replace('Home');
        console.log('✅ [REGISTER] Navegação executada com sucesso');
      } else {
        console.error('❌ [REGISTER] navigation.replace não disponível!', {
          hasNavigation: !!navigation,
          navigationKeys: navigation ? Object.keys(navigation) : 'null'
        });
      }

    } catch (error) {
      console.error('❌ [REGISTER] Erro durante cadastro:', {
        message: error.message,
        status: error.status,
        data: error.data,
        stack: error.stack
      });

      let errorMsg = 'Erro ao criar conta. Tente novamente.';

      if (error.status === 400) {
        if (error.message?.includes('Email')) {
          errorMsg = 'Email já está cadastrado.';
        } else if (error.message?.includes('Login')) {
          errorMsg = 'Nome de usuário já cadastrado.';
        } else {
          errorMsg = error.message;
        }
      } else if (error.status === 429) {
        errorMsg = 'Muitas tentativas. Aguarde um momento.';
      } else if (error.status === 0) {
        errorMsg = 'Erro de conexão. Verifique sua internet.';
      }

      setErrorMessage(errorMsg);
    } finally {
      console.log('🏁 [REGISTER] Processo finalizado');
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    console.log('🔙 [REGISTER] Indo para tela de login');
    onChangeScreen('SIGNIN');
  };

  const isFormValid =
    validateUsername(formData.username) &&
    validateEmail(formData.email) &&
    validatePassword(formData.password);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[
        styles.scrollContent,
        { flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.xs },
      ]}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.xxxl / 2}
      keyboardOpeningTime={0}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {showInfo && (
        <GlassBox style={styles.infoCardContainer}>
          <InfoCard
            title="Regras usuário e senha"
            items={['Usuário:', ...userRules, 'Senha:', ...passwordRules]}
            onClose={() => setShowInfo(false)}
          />
          <View style={styles.space} />
        </GlassBox>
      )}

      <Logo />

      <WelcomeText
        title="Inscreva-se"
        subtitle="Já possui uma conta? Faça login"
        linkText="Faça login"
        onLinkPress={handleGoToLogin}
      />

      <GlassBox>
        <TextInput
          placeholder="Nome de Usuário"
          value={formData.username}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, username: text }));
            setTouched((prev) => ({ ...prev, username: true }));
            setErrorMessage('');
          }}
          isValid={validateUsername(formData.username)}
          showValidation={touched.username}
          disabled={loading}
        />

        <TextInput
          placeholder="E-mail"
          value={formData.email}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, email: text }));
            setTouched((prev) => ({ ...prev, email: true }));
            setErrorMessage('');
          }}
          isValid={validateEmail(formData.email)}
          showValidation={touched.email}
          disabled={loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          value={formData.password}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, password: text }));
            setTouched((prev) => ({ ...prev, password: true }));
            setErrorMessage('');
          }}
          secureTextEntry
          showPasswordToggle
          isValid={validatePassword(formData.password)}
          showValidation={touched.password}
          disabled={loading}
        />

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Image
              style={styles.errorImg}
              source={require('../../../assets/icons/Exclamation.png')}
            />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.space} />
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Criando sua conta...</Text>
          </View>
        ) : (
          <ButtonPrimary
            title="Criar minha conta"
            onPress={handleRegister}
            disabled={!isFormValid}
            width={220}
          />
        )}
      </GlassBox>
    </KeyboardAwareScrollView>
  );
}
