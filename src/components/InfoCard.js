import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/InfoCard';

export default function InfoCard({ 
  title, 
  items = [], 
  onClose 
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Image source={require('../../assets/icons/Exclamation.png')} />
      </View>
      
      <View style={styles.content}>
        {items.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}