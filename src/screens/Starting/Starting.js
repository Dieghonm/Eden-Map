import React, { useState, useContext, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Starting';
import { spacing } from '../../theme/texts';
import { api } from '../../services/api';

import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';

import Intro from './Intro';
import Desire from './Desire';
import Feeling from './Feeling';
import Track from './Track';
import Questions from './Questions';
import Result from './Result';
import PathDetail from './PathDetail';
import Confirmation from './Confirmation';

export default function Starting({ onComplete }) {
  const { theme } = useTheme();
  const { 
    user,
    desireName,
    desireDescription,
    selectedFeelings,
    setSelectedPath,
    resetKey
  } = useContext(AppContext);
  const styles = createStyles(theme);
  
  const [currentStep, setCurrentStep] = useState('INTRO');
  const [questionResults, setQuestionResults] = useState(null);
  const [selectedPathName, setSelectedPathName] = useState(null);
  const [enviandoDados, setEnviandoDados] = useState(false);

  useEffect(() => {
    setCurrentStep('INTRO');
    setQuestionResults(null);
    setSelectedPathName(null);
    setEnviandoDados(false);
  }, [resetKey]);

  const handleQuestionComplete = (results) => {
    setQuestionResults(results);
    setCurrentStep('RESULT');
  };

  const handleRetakeQuiz = () => {
    setQuestionResults(null);
    setCurrentStep('QUESTIONS');
  };

  const handlePathSelection = (pathName) => {
    setSelectedPathName(pathName);
    setCurrentStep('PATH_DETAIL');
  };

  const handlePathConfirmation = async () => {
    setEnviandoDados(true);
    
    try {
      await setSelectedPath(selectedPathName);
      await api.atualizarCaminho(user.email, selectedPathName);
      await api.atualizarProgresso(user.email, 1, 1);
      
      setCurrentStep('CONFIRMATION');

    } catch (error) {
      console.error('❌ Erro ao salvar dados do Starting:', error);

    } finally {
      setEnviandoDados(false);
    }
  };

  const handleGoHome = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const BringHeader = () => {
    const headerConfig = {
      INTRO: {
        title: 'Introdução',
        subtitle: 'No Eden Map, sua jornada começa com um desejo profundo.',
      },
      DESIRE: {
        title: 'Primeiro passo',
        subtitle: {
          1: 'O Eden Map te ajuda a ',
          2: 'manifestar um desejo',
          3: ' real, a partir de uma',
          4: ' intenção clara.',
          5: ''
        }
      },
      FEELING: {
        title: 'Segundo passo',
        subtitle: {
          1: 'Escolha os ',
          2: '3 sentimentos',
          3: ' que conectam você à ',
          4: 'parte subjetiva',
          5: ' do desejo.'
        }
      },
      TRACK: {
        title: 'Terceiro Passo',
        subtitle: {
          1: 'Em ',
          2: '3 meses',
          3: ' você vai percorrer um dos        ',
          4: '5 caminhos',
          5: ' para desbloquear limitações e manifestar seu desejo profundo.'
        }
      },
    };

    const steps = ['DESIRE', 'FEELING', 'TRACK'];
    const currentIndex = steps.indexOf(currentStep);

    const config = headerConfig[currentStep] || headerConfig.INTRO;

    if (['QUESTIONS', 'RESULT', 'PATH_DETAIL', 'CONFIRMATION'].includes(currentStep)) {
      return null;
    }

    if (currentStep === 'INTRO') {
      return (
        <View style={styles.headerContainer}>
          <Logo width={spacing.lg} height={spacing.md} />
          <View style={styles.introText}>
            <WelcomeText
              title={config.title}
              subtitle={config.subtitle}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.stepsHeaderContainer}>
        <Text style={styles.title}>{config.title}</Text>
        <Text style={styles.text}>
          {config.subtitle[1]}
          <Text style={styles.highlight}>{config.subtitle[2]}</Text>
          {config.subtitle[3]}
          <Text style={styles.highlight}>{config.subtitle[4]}</Text>
          {config.subtitle[5]}
        </Text>

        <View style={styles.progressContainer}>
          {steps.map((step, index) => {
            if (index === steps.length) return null;
            return (
              <View
                key={step}
                style={[
                  styles.progressBar,
                  index <= currentIndex
                    ? styles.progressActive
                    : styles.progressInactive
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const BringBody = () => {
    if (enviandoDados) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.button} />
          <Text style={styles.text}>Salvando seus dados...</Text>
        </View>
      );
    }

    switch (currentStep) {
      case 'INTRO':
        return <Intro onStartGuide={() => {
          setCurrentStep('DESIRE');
        }} />;

      case 'DESIRE':
        return <Desire onNext={() => {
          setCurrentStep('FEELING');
        }} />;

      case 'FEELING':
        return <Feeling onNext={() => {
          setCurrentStep('TRACK');
        }} />;
      
      case 'TRACK':
        return <Track onNext={() => {
          setCurrentStep('QUESTIONS');
        }} />;

      case 'QUESTIONS':
        return <Questions onComplete={handleQuestionComplete} />;

      case 'RESULT':
        return (
          <Result 
            results={questionResults} 
            onNext={handlePathSelection}
            onRetake={handleRetakeQuiz}
          />
        );

      case 'PATH_DETAIL':
        return (
          <PathDetail 
            selectedPathName={selectedPathName}
            onConfirm={handlePathConfirmation}
            onBack={() => {
              setCurrentStep('RESULT');
            }}
          />
        );

      case 'CONFIRMATION':
        return <Confirmation onGoHome={handleGoHome} />;

      default:
        return <Intro onStartGuide={() => setCurrentStep('DESIRE')} />;
    }
  };

  return (
    <View style={styles.container}>
      <BringHeader />
      <BringBody />
    </View>
  );
}