import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { AppContext } from '../../context/AppProvider';
import { createStyles } from '../../styles/Starting/Track';
import { CAMINHOS } from '../../../assets/json/Sentimentos';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function Questions({ onComplete }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  


  return (
    <View style={styles.container}>
      teste
    </View>
  );
}