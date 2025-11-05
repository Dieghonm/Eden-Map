import React, { useState, useRef } from 'react';
import { View, Text, Alert, ActivityIndicator, Platform, Image, TextInput as RNTextInput, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { spacing, fontSize, fontFamily, borderRadius } from '../../theme/texts';
import { horizontalScale, verticalScale } from '../../utils/responsive';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import TextInput from '../../components/TextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import InfoCard from '../../components/InfoCard';
import { api } from '../../services/api';

export default function PasswordRecovery({ onChangeScreen }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [screenStage, setScreenStage] = useState('EMAIL');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [touched, setTouched] = useState({ newPassword: false, confirmPassword: false });
  const [showInfo, setShowInfo] = useState(true);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const passwordRules = [
    ' •  entre 8 - 32 caracteres',
    ' •  use letras maiúsculas e minúsculas',
    ' •  inclua números',
    ' •  sem espaçamentos'
  ];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8 && password.length <= 32;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSpaces = !/\s/.test(password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && noSpaces;
  };
  const passwordsMatch = () => formData.newPassword === formData.confirmPassword && formData.confirmPassword !== '';

  const handleSendCode = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await api.solicitarTempKey(email.toLowerCase().trim());
      Alert.alert('Código Enviado', 'Verifique seu e-mail para o código de verificação.');
      setScreenStage('CODE');
      inputRefs[0].current?.focus();
    } catch (error) {
      let msg = 'Erro ao enviar código.';
      if (error.status === 401) msg = 'E-mail não encontrado.';
      else if (error.status === 429) msg = 'Muitas tentativas. Aguarde.';
      else if (error.status === 0) msg = 'Erro de conexão.';
      setErrorMessage(msg);
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (text, index) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newCode = [...code];
    if (cleanText.length === 1) {
      newCode[index] = cleanText;
      setCode(newCode);
      if (index < 3) inputRefs[index + 1].current?.focus();
    } else if (cleanText.length === 0) {
      newCode[index] = '';
      setCode(newCode);
      if (index > 0) inputRefs[index - 1].current?.focus();
    }
    setErrorMessage('');
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0)
      inputRefs[index - 1].current?.focus();
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      Alert.alert('Erro', 'Por favor, insira o código completo.');
      return;
    }
    setLoading(true);
    setErrorMessage('');
    try {
      await api.validarTempKey(email, fullCode);
      setScreenStage('NEW_PASSWORD');
    } catch (error) {
      let msg = 'Código inválido.';
      if (error.status === 401 && error.message?.includes('expirado')) msg = 'Código expirado.';
      else if (error.status === 401) msg = 'Código incorreto.';
      else if (error.status === 429) msg = 'Muitas tentativas. Aguarde.';
      else if (error.status === 0) msg = 'Erro de conexão.';
      setErrorMessage(msg);
      Alert.alert('Erro', msg);
      setCode(['', '', '', '']);
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword(formData.newPassword)) {
      Alert.alert('Erro', 'A senha não atende aos requisitos de segurança.');
      return;
    }
    if (!passwordsMatch()) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await api.alterarSenhaComTempKey({
        email: email,
        tempKey: code.join(''),
        novaSenha: formData.newPassword,
      });
      Alert.alert('Senha Alterada!', 'Faça login com sua nova senha.', [
        { text: 'OK', onPress: () => onChangeScreen('SIGNIN') },
      ]);
    } catch (error) {
      let msg = 'Erro ao alterar senha.';
      if (error.status === 401) msg = 'Código inválido ou expirado.';
      else if (error.status === 400) msg = 'Senha inválida.';
      else if (error.status === 0) msg = 'Erro de conexão.';
      setErrorMessage(msg);
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  const renderEmailStage = () => (
    <View style={styles.container}>
      <Logo />
      <WelcomeText title="Recuperação de senha" subtitle="Digite seu e-mail para receber o código de verificação." />
      <GlassBox>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={loading}
          isValid={validateEmail(email)}
        />
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Image style={styles.errorImg} source={require('../../../assets/icons/Exclamation.png')} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.space} />
        )}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Enviando código...</Text>
          </View>
        ) : (
          <ButtonPrimary title="Enviar Código" onPress={handleSendCode} disabled={!validateEmail(email)} width={220} />
        )}
      </GlassBox>
      <ButtonSecundary title="Voltar" onPress={() => onChangeScreen('SIGNIN')} />
    </View>
  );

  const renderCodeStage = () => (
    <View style={styles.container}>
      <Logo />
      <WelcomeText title="Verificação" subtitle="Digite o código de 4 dígitos enviado para seu e-mail." />
      <GlassBox>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={inputRefs[index]}
              style={[styles.codeInput, digit !== '' && styles.codeInputFilled]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              editable={!loading}
            />
          ))}
        </View>
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Image style={styles.errorImg} source={require('../../../assets/icons/Exclamation.png')} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={styles.space} />
        )}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Verificando código...</Text>
          </View>
        ) : (
          <ButtonPrimary title="Verificar" onPress={handleVerifyCode} disabled={code.some((d) => d === '')} width={220} />
        )}
      </GlassBox>
      <ButtonSecundary title="Voltar" onPress={() => setScreenStage('EMAIL')} />
    </View>
  );

  const renderNewPasswordStage = () => (
    <View style={styles.container}>
      {showInfo && (
        <GlassBox style={styles.infoCardContainer}>
          <InfoCard title="Requisitos da senha" items={passwordRules} onClose={() => setShowInfo(false)} />
          <View style={styles.space} />
        </GlassBox>
      )}
      <Logo />
      <WelcomeText title="Nova Senha" subtitle="Crie uma senha forte para sua conta." />
      <GlassBox>
        <TextInput
          placeholder="Nova Senha"
          value={formData.newPassword}
          onChangeText={(text) => {
            setFormData({ ...formData, newPassword: text });
            if (!touched.newPassword && text.length > 0) setTouched({ ...touched, newPassword: true });
            setErrorMessage('');
          }}
          secureTextEntry
          showPasswordToggle
          disabled={loading}
          isValid={validatePassword(formData.newPassword)}
          showValidation={touched.newPassword}
        />
        <TextInput
          placeholder="Confirmar Nova Senha"
          value={formData.confirmPassword}
          onChangeText={(text) => {
            setFormData({ ...formData, confirmPassword: text });
            if (!touched.confirmPassword && text.length > 0)
              setTouched({ ...touched, confirmPassword: true });
            setErrorMessage('');
          }}
          secureTextEntry
          showPasswordToggle
          disabled={loading}
          isValid={passwordsMatch()}
          showValidation={touched.confirmPassword}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
        ) : (
          <View style={styles.space} />
        )}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.button} />
            <Text style={styles.loadingText}>Alterando senha...</Text>
          </View>
        ) : (
          <ButtonPrimary title="Alterar Senha" onPress={handleChangePassword} disabled={!validatePassword(formData.newPassword) || !passwordsMatch()} width={220} />
        )}
      </GlassBox>
      <ButtonSecundary title="Voltar" onPress={() => setScreenStage('CODE')} />
    </View>
  );

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 100}
      keyboardOpeningTime={0}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {screenStage === 'EMAIL' && renderEmailStage()}
      {screenStage === 'CODE' && renderCodeStage()}
      {screenStage === 'NEW_PASSWORD' && renderNewPasswordStage()}
    </KeyboardAwareScrollView>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    scrollContent: { alignItems: 'center' },
    container: { alignItems: 'center', paddingHorizontal: spacing.md },
    infoCardContainer: { marginBottom: spacing.md },
    space: { marginTop: spacing.xxs * 3 },
    errorContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxs * 2 },
    errorText: { color: theme.warning || theme.fontColor, fontSize: fontSize.sm, fontFamily: fontFamily.r4, textAlign: 'center', marginLeft: spacing.xxs, marginBottom: spacing.xxs, marginTop: spacing.xxs },
    loadingContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.md },
    loadingText: { color: theme.fontColor, fontSize: fontSize.md, fontFamily: fontFamily.r4, marginTop: spacing.sm },
    codeContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.xs, marginVertical: spacing.xxs * 3 },
    codeInput: { width: horizontalScale(40), height: verticalScale(50), backgroundColor: theme.terciario, fontSize: fontSize.xxl, fontFamily: fontFamily.b7, color: theme.fontColor, textAlign: 'center', borderRadius: borderRadius.md },
    codeInputFilled: {},
    errorImg: { width: 18, height: 18, marginRight: spacing.xxs },
  });