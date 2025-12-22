// src/screens/Days/MeditacaoScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';

import { useApp } from '../../context/AppProvider';
import IntroMeditacao from './Meditacao/IntroMeditacao';
import RelembrarCena from './Meditacao/RelembrarCena';
import RespiracaoConfig from './Meditacao/RespiracaoConfig';
import PlayerMeditacao from './Meditacao/PlayerMeditacao';

export default function MeditacaoScreen({ onComplete }) {
  const { selectedPath, semanaAtual } = useApp();
  const [currentStep, setCurrentStep] = useState('INTRO');

  const renderStep = () => {
    switch (currentStep) {
      case 'INTRO':
        return (
          <IntroMeditacao
            selectedPath={selectedPath}
            semanaAtual={semanaAtual}
            onRelembrar={() => setCurrentStep('RELEMBRAR')}
            onRespiracao={() => setCurrentStep('RESPIRACAO')}
          />
        );
      
      case 'RELEMBRAR':
        return (
          <RelembrarCena
            selectedPath={selectedPath}
            semanaAtual={semanaAtual}
            onVoltar={() => setCurrentStep('INTRO')}
            onContinuar={() => setCurrentStep('RESPIRACAO')}
          />
        );
      
      case 'RESPIRACAO':
        return (
          <RespiracaoConfig
            onVoltar={() => setCurrentStep('INTRO')}
            onContinuar={() => setCurrentStep('PLAYER')}
          />
        );
      
      case 'PLAYER':
        return (
          <PlayerMeditacao
            selectedPath={selectedPath}
            semanaAtual={semanaAtual}
            onComplete={onComplete}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <View style={{ flex: 1 }}>
        {renderStep()}
      </View>
    </View>
  );
}