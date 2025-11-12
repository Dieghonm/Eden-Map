import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Feeling';
import { SENTIMENTOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';
import GlassBox from '../../components/GlassBox';

export default function Feeling({ onNext }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const { 
    selectedFeelings: savedFeelings,
    setSelectedFeelings 
  } = useContext(AppContext);

  const [localFeelings, setLocalFeelings] = useState(savedFeelings || []);

  useEffect(() => {
    if (savedFeelings && savedFeelings.length > 0) {
      setLocalFeelings(savedFeelings);
    }
  }, []);

  const toggleFeeling = (id) => {
    if (localFeelings.includes(id)) {
      setLocalFeelings(localFeelings.filter(f => f !== id));
    } else if (localFeelings.length < 3) {
      setLocalFeelings([...localFeelings, id]);
    }
  };

  const handleNext = async () => {
    if (localFeelings.length !== 3) return;
    await setSelectedFeelings(localFeelings);
    
    onNext();
  };

  const isFormValid = localFeelings.length === 3;

  return (
    <View style={styles.container}>
      <GlassBox>
        {SENTIMENTOS.map((feeling) => {
          const isSelected = localFeelings.includes(feeling.id);
          const isDisabled = !isSelected && localFeelings.length >= 3;
          
          return (
            <TouchableOpacity
              key={feeling.id}
              style={styles.feelingButton}
              onPress={() => toggleFeeling(feeling.id)}
              activeOpacity={0.8}
              disabled={isDisabled}
            >
              <View style={styles.feelingRow}>
                <Text style={styles.feelingText}>{feeling.nome}</Text>
                <View
                  style={[
                    styles.checkCircle,
                    { backgroundColor: feeling.color }
                  ]}
                />
              </View>
              <Image
                source={
                  isSelected
                    ? require('../../../assets/icons/Checked.png')
                    : require('../../../assets/icons/Unchecked.png')
                }
                style={styles.playIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
        <View style={styles.spacer} />
      </GlassBox>
      
      <ButtonPrimary
        title="Próximo passo"
        onPress={handleNext}
        disabled={!isFormValid}
      />
    </View>
  );
}