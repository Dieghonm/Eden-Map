import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import ButtonPrimary from '../../components/ButtonPrimary';
import { createStyles } from '../../styles/Starting/Questions';
import { useState } from 'react';
import { PERGUNTAS } from '../../../assets/json/Sentimentos';

export default function Questions({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const totalQuestions = Object.keys(PERGUNTAS).length;

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    const sentimento = PERGUNTAS[currentQuestion].sentimento;

    setAnswers(prev => ({
      ...prev,
      [sentimento]: (prev[sentimento] || 0) + selectedOption,
    }));

    if (currentQuestion === totalQuestions) {
      // Finaliza e chama o callback com os resultados normalizados
      const finalAnswers = {
        ...answers,
        [sentimento]: (answers[sentimento] || 0) + selectedOption,
      };
      const porcentagem = normalizarParaPorcentagem(finalAnswers);
      onComplete(porcentagem);
      return;
    }

    setCurrentQuestion(prev => prev + 1);
    setSelectedOption(null);
  };

  const normalizarParaPorcentagem = (resultados) => {
    const valores = Object.values(resultados);
    const min = Math.min(...valores);
    const valoresPositivos = valores.map(v => v - min);
    const soma = valoresPositivos.reduce((a, b) => a + b, 0);
    
    if (soma === 0) {
      const igual = 100 / valores.length;
      return Object.fromEntries(
        Object.keys(resultados).map(k => [k, Number(igual.toFixed(2))])
      );
    }
    
    return Object.fromEntries(
      Object.keys(resultados).map((k, i) => [
        k,
        Number(((valoresPositivos[i] / soma) * 100).toFixed(2)),
      ])
    );
  };

  const OPTIONS = [
    { label: 'Concordo totalmente', value: 2, icon: require('../../../assets/icons/DobCheck.png') },
    { label: 'Concordo', value: 1, icon: require('../../../assets/icons/Check.png') },
    { label: 'Neutro', value: 0, icon: require('../../../assets/icons/Neutral.png') },
    { label: 'Discordo', value: -1, icon: require('../../../assets/icons/UnCheck.png') },
    { label: 'Discordo totalmente', value: -2, icon: require('../../../assets/icons/DobUnCheck.png') },
  ];

  const currentQuestionData = PERGUNTAS[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions;
  const buttonLabel = isLastQuestion ? 'Finalizar teste' : 'Próxima pergunta';

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.questionTitle}>Pergunta</Text>
        <Text style={styles.questionNumber}>
          <Text style={styles.highlight}>{currentQuestion}</Text> / {totalQuestions}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              index < currentQuestion ? styles.progressActive : styles.progressInactive
            ]}
          />
        ))}
      </View>

      <Text style={styles.questionText}>{currentQuestionData.question}</Text>

      <View style={styles.viewOptions}>
        {OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selectedOption === option.value && { borderWidth: 2, borderColor: theme.success }
            ]}
            onPress={() => handleSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{option.label}</Text>
            <View style={styles.optionIconContainer}>
              <Image source={option.icon} style={styles.optionIcon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ButtonPrimary
        title={buttonLabel}
        onPress={handleNext}
        disabled={selectedOption === null}
      />
    </View>
  );
}
