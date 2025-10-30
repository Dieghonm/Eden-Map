import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
import { createStyles } from '../styles/components/WelcomeText';

export default function WelcomeText({ 
  title, 
  subtitle,
  linkText,
  onLinkPress 
}) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderSubtitle = () => {
    if (!subtitle) return null;
    
    if (linkText && subtitle.includes(linkText)) {
      const parts = subtitle.split(linkText);
      
      return (
        <Text style={styles.subtitle}>
          {parts[0]}
          <Text onPress={onLinkPress} style={styles.link}>{linkText}</Text>
          {parts[1]}
        </Text>
      );
    }
    
    return <Text style={styles.subtitle}>{subtitle}</Text>;
  };

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text>: null}
      {subtitle ? renderSubtitle(): null}
    </View>
  );
}