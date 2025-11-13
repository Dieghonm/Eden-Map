import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeProvider';
import { createStyles } from '../../styles/Starting/Starting';
import { spacing } from '../../theme/texts';

import Logo from '../../components/Logo';
import WelcomeText from '../../components/WelcomeText';

import Intro from './Intro';
import Desire from './Desire';
import Feeling from './Feeling';
import Track from './Track';
import Questions from './Questions';


export default function Starting({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [currentStep, setCurrentStep] = useState('INTRO');

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
        title: 'Trilhas',
        subtitle: {
          1: 'Em ',
          2: '3 meses',
          3: ' você vai percorrer um dos        ',
          4: '5 caminhos',
          5: ' para desbloquear limitações e manifestar seu desejo profundo.'
        }
      },
      QUESTIONS: {
        title: 'Questionário',
        subtitle: {
          1: '',
          2: 'Descubra qual tema',
          3: ' impede a realização do seu desejo. Em',
          4: '20 perguntas',
          5: ' traga à luz os bloqueios que te afastam do que quer viver.'
        }
      },
    };

    const steps = ['TRACK', 'DESIRE', 'FEELING', 'QUESTIONS'];
    const currentIndex = steps.indexOf(currentStep);

    const config = headerConfig[currentStep] || headerConfig.INTRO;

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
            if (index === steps.length - 1) return null
            return (
              <View
                key={step}
                style={[
                  styles.progressBar,
                  index < currentIndex
                    ? styles.progressActive
                    : styles.progressInactive
                ]}
              />
            )
          })}
        </View>
      </View>
    );
  };

const BringBody = () => {
  switch (currentStep) {
    case 'INTRO':
      return <Intro onStartGuide={() => setCurrentStep('TRACK')} />;

    case 'TRACK':
      return <Track onNext={() => setCurrentStep('DESIRE')} />;

    case 'DESIRE':
      return <Desire onNext={() => setCurrentStep('FEELING')} />;

    case 'FEELING':
      return <Feeling onNext={() => setCurrentStep('QUESTIONS')} />;

    case 'QUESTIONS':
      return <Questions onFinish={() => console.log('guia finalizado')} />;

    default:
      return <Intro onStartGuide={() => setCurrentStep('TRACK')} />;
  }
};

  return (
    <View style={styles.container}>
      <BringHeader />
      <BringBody />
    </View>
  );
}