import React, { useState, useRef } from 'react';
import { View, Text, Alert, ActivityIndicator, Platform, Image, TextInput as RNTextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Login/ForgotPassword';
import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';
import TextInput from '../../components/TextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecundary from '../../components/ButtonSecundary';
import GlassBox from '../../components/GlassBox';
import { api } from '../../services/api';
import { spacing } from '../../theme/texts';

export default function ForgotPassword({ onChangeScreen }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [screenStage, setScreenStage] = useState('EMAIL');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8 && password.length <= 32;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSpaces = !/\s/.test(password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && noSpaces;
  };

  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    
    try {
      await api.solicitarTempKey(email.toLowerCase().trim());
      Alert.alert('Código Enviado', 'Verifique seu e-mail para o código de verificação.');
      setScreenStage('CODE');
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    } catch (error) {
      let msg = 'Erro ao enviar código.';
      if (error.status === 401) msg = 'E-mail não encontrado.';
      else if (error.status === 429) msg = 'Muitas tentativas. Aguarde.';
      else if (error.status === 0) msg = 'Erro de conexão. Verifique sua internet.';
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
      if (index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (cleanText.length === 0) {
      newCode[index] = '';
      setCode(newCode);
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
    
    setErrorMessage('');
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 4) {
      Alert.alert('Erro', 'Por favor, insira o código completo de 4 dígitos.');
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      await api.validarTempKey(email, fullCode);
      setScreenStage('NEW_PASSWORD');
    } catch (error) {
      let msg = 'Código inválido.';
      if (error.status === 401 && error.message?.includes('expirado')) {
        msg = 'Código expirado. Solicite um novo código.';
      } else if (error.status === 401) {
        msg = 'Código incorreto. Tente novamente.';
      } else if (error.status === 429) {
        msg = 'Muitas tentativas. Aguarde um momento.';
      } else if (error.status === 0) {
        msg = 'Erro de conexão. Verifique sua internet.';
      }
      
      setErrorMessage(msg);
      Alert.alert('Erro', msg);
      setCode(['', '', '', '']);
      setTimeout(() => inputRefs[0].current?.focus(), 100);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword(newPassword)) {
      Alert.alert('Erro', 'A senha não atende aos requisitos de segurança.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    
    try {
      await api.alterarSenhaComTempKey({
        email: email,
        tempKey: code.join(''),
        novaSenha: newPassword,
      });
      
      Alert.alert(
        'Sucesso!', 
        'Senha alterada com sucesso. Faça login com sua nova senha.',
        [{ text: 'OK', onPress: () => onChangeScreen('SIGNIN') }]
      );
    } catch (error) {
      let msg = 'Erro ao alterar senha.';
      if (error.status === 401) msg = 'Código inválido ou expirado. Solicite um novo código.';
      else if (error.status === 400) msg = 'Senha inválida. Verifique os requisitos.';
      else if (error.status === 0) msg = 'Erro de conexão. Verifique sua internet.';
      
      setErrorMessage(msg);
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  // ========== RENDER: EMAIL STAGE ==========
  const renderEmailStage = () => (
    <View style={styles.container}>
      <Logo />
      
      <WelcomeText 
        title="Recuperação de senha" 
        subtitle="Digite seu e-mail para receber o código de verificação." 
      />
      
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
            <Text style={styles.loadingText}>Enviando código...</Text>
          </View>
        ) : (
          <ButtonPrimary 
            title="Enviar Código" 
            onPress={handleSendCode} 
            disabled={!validateEmail(email)} 
            width={220} 
          />
        )}
      </GlassBox>
      
      <ButtonSecundary 
        title="Voltar" 
        onPress={() => onChangeScreen('SIGNIN')} 
      />
    </View>
  );

  // ========== RENDER: CODE STAGE ==========
  const renderCodeStage = () => (
    <View style={styles.container}>
      <Logo />
      
      <WelcomeText 
        title="Verificação" 
        subtitle="Digite o código de 4 dígitos enviado para seu e-mail." 
      />
      
      <GlassBox>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.codeInput, 
                digit !== '' && styles.codeInputFilled
              ]}
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
            <Text style={styles.loadingText}>Verificando código...</Text>
          </View>
        ) : (
          <ButtonPrimary 
            title="Verificar" 
            onPress={handleVerifyCode} 
            disabled={code.some((d) => d === '')} 
            width={220} 
          />
        )}
      </GlassBox>
      
      <ButtonSecundary 
        title="Voltar" 
        onPress={() => {
          setScreenStage('EMAIL');
          setCode(['', '', '', '']);
          setErrorMessage('');
        }} 
      />
    </View>
  );

  // ========== RENDER: NEW PASSWORD STAGE ==========
  const renderNewPasswordStage = () => (
    <View style={styles.container}>
      <Logo />
      <View style={styles.TextView}>
        <WelcomeText 
          
          title="Nova Senha" 
          subtitle="Sua senha deve ter entre 8 e 32 caracteres, letras maiúsculas e minúsculas, números, sem espaços." 
        />
      </View>
 
      
      <GlassBox>
        <TextInput
          placeholder="Nova Senha"
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            if (!touched && text.length > 0) {
              setTouched(true);
            }
            setErrorMessage('');
          }}
          secureTextEntry
          showPasswordToggle
          disabled={loading}
          isValid={validatePassword(newPassword)}
          showValidation={touched}
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
            <Text style={styles.loadingText}>Alterando senha...</Text>
          </View>
        ) : (
          <ButtonPrimary 
            title="Alterar Senha" 
            onPress={handleChangePassword} 
            disabled={!validatePassword(newPassword)} 
            width={220} 
          />
        )}
      </GlassBox>
      
      <ButtonSecundary 
        title="Voltar" 
        onPress={() => {
          setScreenStage('CODE');
          setNewPassword('');
          setTouched(false);
          setErrorMessage('');
        }} 
      />
    </View>
  );

  // ========== RENDER PRINCIPAL ==========
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ 
        flexGrow: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 20 
      }}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={Platform.OS === 'ios' ? spacing.xs : spacing.lg}
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